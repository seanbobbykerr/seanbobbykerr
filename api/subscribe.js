// ---------------------------------------------------------------------------
// POST /api/subscribe
//
// Single server-side entry point for every newsletter/mailing-list signup on
// the site (homepage "free chapter" form, /subscribe page form, and any
// future form). Runs as a Vercel serverless function, so it's the only place
// that ever touches process.env.KIT_API_KEY — the browser never sees it.
//
// Flow:
//   1. Validate + normalise the submitted email.
//   2. Upsert the subscriber into Kit (API v4). This is the source of truth:
//      the visitor only sees success if Kit accepted them.
//   3. Best-effort forward the same submission to Web3Forms (the inbox
//      notification Sean already relied on) as a backup, regardless of the
//      Kit outcome, so a lead is never silently lost if Kit has an outage.
//   4. Optionally tag the new subscriber in Kit if KIT_TAG_ID is configured
//      (not required — safe to leave unset).
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_TEXT_LENGTH = 200;

const KIT_SUBSCRIBERS_URL = "https://api.kit.com/v4/subscribers";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function normalizeEmail(raw) {
  return typeof raw === "string" ? raw.trim().toLowerCase() : "";
}

function cleanText(raw, fallback) {
  if (typeof raw !== "string") return fallback || "";
  return raw.trim().slice(0, MAX_TEXT_LENGTH);
}

function isValidEmail(email) {
  return !!email && email.length <= MAX_EMAIL_LENGTH && EMAIL_RE.test(email);
}

async function upsertKitSubscriber(email, name) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "missing-api-key" };
  }

  const body = { email_address: email };
  if (name) body.first_name = name;

  let response;
  try {
    response = await fetch(KIT_SUBSCRIBERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey
      },
      body: JSON.stringify(body)
    });
  } catch (err) {
    return { ok: false, reason: "network-error" };
  }

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    // No/invalid JSON body — fall through, handled by !response.ok below.
  }

  if (!response.ok) {
    return { ok: false, reason: "kit-error", status: response.status };
  }

  const subscriberId = data && data.subscriber && data.subscriber.id;
  return { ok: true, subscriberId: subscriberId };
}

async function tagKitSubscriber(subscriberId) {
  const apiKey = process.env.KIT_API_KEY;
  const tagId = process.env.KIT_TAG_ID;
  if (!apiKey || !tagId || !subscriberId) return;

  try {
    await fetch("https://api.kit.com/v4/tags/" + encodeURIComponent(tagId) + "/subscribers/" + encodeURIComponent(subscriberId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey
      },
      body: JSON.stringify({})
    });
  } catch (err) {
    // Tagging is a nice-to-have; never let it affect the subscription result.
  }
}

async function sendBackupNotification(details) {
  var accessKey = details.web3formsAccessKey;
  if (!accessKey || typeof accessKey !== "string") return;

  try {
    await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: details.email + " wants to join the mailing list!",
        from_name: "Sean Bobby Kerr Website",
        name: details.name || "",
        email: details.email,
        message:
          "Name: " + (details.name || "(not provided)") +
          "\nEmail: " + details.email +
          "\nSource: " + details.source +
          "\nKit status: " + details.kitStatus
      })
    });
  } catch (err) {
    // Best-effort backup notification only; never affects the response sent
    // to the visitor.
  }
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.length) {
    try { return JSON.parse(req.body); } catch (err) { return {}; }
  }

  // Fallback for runtimes that don't pre-parse the body.
  return await new Promise(function (resolve) {
    var chunks = [];
    req.on("data", function (chunk) { chunks.push(chunk); });
    req.on("end", function () {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on("error", function () { resolve({}); });
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "method-not-allowed" });
    return;
  }

  var payload;
  try {
    payload = await readJsonBody(req);
  } catch (err) {
    payload = {};
  }
  payload = payload || {};

  var email = normalizeEmail(payload.email);
  var name = cleanText(payload.name, "");
  var source = cleanText(payload.source, "Website");
  var web3formsAccessKey = typeof payload.web3formsAccessKey === "string" ? payload.web3formsAccessKey : "";

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "invalid-email" });
    return;
  }

  var kitResult = await upsertKitSubscriber(email, name);

  if (kitResult.ok && kitResult.subscriberId) {
    await tagKitSubscriber(kitResult.subscriberId);
  }

  // Fire the backup inbox notification regardless of the Kit outcome so a
  // lead is never silently lost during a Kit-side problem.
  await sendBackupNotification({
    email: email,
    name: name,
    source: source,
    web3formsAccessKey: web3formsAccessKey,
    kitStatus: kitResult.ok ? "added" : "FAILED (" + kitResult.reason + ")"
  });

  if (!kitResult.ok) {
    if (kitResult.reason === "missing-api-key") {
      console.error("subscribe: KIT_API_KEY is not configured in this environment");
      res.status(503).json({ error: "not-configured" });
      return;
    }
    console.error("subscribe: Kit API request failed", kitResult.reason, kitResult.status || "");
    res.status(502).json({ error: "subscription-failed" });
    return;
  }

  res.status(200).json({ ok: true });
};
