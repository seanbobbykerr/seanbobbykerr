// ---------------------------------------------------------------------------
// SITE CONFIG
//
// Every button and social icon on the page reads its URL from here at
// runtime via [data-config-key], as a fallback/sync layer. But because
// search-engine crawlers and no-JS visitors need a real crawlable href
// already present in the served HTML (not one added by JavaScript after
// load), every link listed below is ALSO hardcoded as a static href
// directly in each page's HTML. That means changing a URL here is no
// longer enough on its own — you (or Claude) also need to update the
// matching href="..." in every .html file that uses it. Search each file
// for the old URL to find every place it needs to change.
//
// Leave a value as an empty string "" to keep the control visible in its
// pending state (label shown, but not clickable, with a "coming soon"
// note) — but note this only affects the runtime behaviour; a control
// that already has a static href in the HTML will still be a real,
// clickable link regardless of what this file says, until that href is
// removed too.
//
// See LINKS.md for a plain-language walkthrough of each field.
// ---------------------------------------------------------------------------
window.SITE_CONFIG = {
  // Site design preview. Change this one value to swap the live view:
  //   "classic"   — warm map artwork with the original gold plaque
  //   "blue"      — blue-tinted map with a navy button and gold type
  //   "spotlight" — darker, higher-contrast card with an oversized CTA
  //   "modern"    — a site-wide modern editorial redesign
  homepageHeroDesign: "modern",

  // Development-only design picker. Production keeps homepageHeroDesign
  // above, while the floating preview control stays completely hidden.
  developmentMode: false,
  homepageHeroPanelStartsOpen: false,

  bookOnePurchaseUrl: "https://mybook.to/theburnedname",
  bookTwoPreorderUrl: "https://mybook.to/thescrollofrecall",

  // Both the homepage "free chapter" form and the /subscribe form post to
  // /api/subscribe (a Vercel serverless function), which adds the
  // submission to your Kit mailing list and ALSO forwards it here, to
  // Web3Forms (web3forms.com), as a backup inbox notification — a free
  // service built for exactly this: emailing a form submission somewhere
  // with no secret credentials in the page. This key is only ever used for
  // that backup email; it never talks to Kit. Leave this blank and the
  // backup email is silently skipped (Kit signups still work fine without
  // it). To turn it on:
  //   1. Go to https://web3forms.com and enter seanbobbykerr@gmail.com.
  //   2. You'll immediately get an "Access Key" by email — no account or
  //      password needed.
  //   3. Paste that key below.
  // This key is meant to be public/embedded in front-end code (Web3Forms
  // documents it as safe to expose, similar to a reCAPTCHA site key) — it
  // cannot be used to change where submissions are delivered, only to send
  // one to the inbox that was registered when the key was created. See
  // LINKS.md and api/subscribe.js for the Kit side, which needs the
  // separate, secret KIT_API_KEY environment variable — never put that one
  // here.
  web3formsAccessKey: "36576aa8-9024-4278-bdc8-a620bfa036c5",

  bookOneGoodreadsReviewUrl: "https://www.goodreads.com/book/show/256679948-the-burned-name",
  bookOneAmazonReviewUrl: "https://mybook.to/theburnedname",

  // The /support page is a permanent, printed-in-the-books URL that should
  // outlive whichever membership platform is behind it. These four values
  // are the only things /support/index.html knows about "Patreon" by name —
  // change them here (not in the HTML) if that platform ever changes, and
  // every mention of the platform name/logo/link on the page updates with
  // it. Note: the surrounding sentences ("Read Vaal's Origin on ___") are
  // still authored English, not generated from these values, so a very
  // different platform name may read slightly awkwardly until the copy
  // around it is revisited too.
  //
  // supportPlatformLogo is deliberately "../brand_assets/..." (relative to
  // /support/index.html), NOT a leading-slash "/brand_assets/..." path —
  // this site has to keep working when a page is opened directly as a file
  // (double-click / File > Open), and a leading slash resolves against the
  // filesystem root in that case, not the project folder, which breaks the
  // image. Every other image reference on the site uses the same relative
  // convention for the same reason.
  supportUrl: "https://www.patreon.com/cw/seanbobbykerr",
  supportPlatformName: "Patreon",
  supportPlatformLogo: "../brand_assets/patreon-logo-icon-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp",

  instagramUrl: "https://www.instagram.com/seanbobbykerr/",
  tiktokUrl: "https://www.tiktok.com/@seanbobbykerr",
  goodreadsUrl: "https://www.goodreads.com/author/show/51095217.Sean_Bobby_Kerr"
};

// Apply the site-wide preview choice before the page body is painted. The
// picker in script.js keeps this local preference in sync between pages.
(function () {
  var design = window.SITE_CONFIG.homepageHeroDesign || "classic";
  if (window.SITE_CONFIG.developmentMode === true) {
    try { design = window.localStorage.getItem("sbk-site-design") || design; } catch (error) {}
  }
  document.documentElement.dataset.siteDesign = design === "modern" ? "modern" : "heritage";
})();
