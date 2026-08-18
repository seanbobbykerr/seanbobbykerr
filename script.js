(function () {
  "use strict";

  var CONFIG = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------------------
     Config-driven links & buttons
     Any element with [data-config-key] reads its URL from SITE_CONFIG.
     Empty value -> element stays visible, becomes inert (no href, aria-disabled,
     "is-pending" styling, small pending-note/tooltip). Non-empty value ->
     element becomes a real link, no other markup or CSS changes required.
     ------------------------------------------------------------------- */
  function applyConfigLinks() {
    var nodes = document.querySelectorAll("[data-config-key]");
    nodes.forEach(function (el) {
      var key = el.dataset.configKey;
      var url = CONFIG[key];
      var label = el.dataset.label || el.textContent.trim();
      var isNavOrIcon = el.classList.contains("nav-pending") || el.classList.contains("social-icon");

      if (url) {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
        el.removeAttribute("aria-disabled");
        el.removeAttribute("data-tooltip");
        el.classList.remove("is-pending");
        el.setAttribute("aria-label", label);
        if (isNavOrIcon) {
          el.classList.remove("nav-pending");
        }
        var sibling = el.parentElement && el.parentElement.querySelector(".pending-note");
        if (sibling) sibling.hidden = true;
      } else {
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        el.classList.add("is-pending");
        el.tabIndex = 0;
        if (isNavOrIcon) {
          el.setAttribute("data-tooltip", "Link coming soon");
          el.setAttribute("aria-label", label + " (link coming soon)");
        }
        el.addEventListener("click", function (e) { e.preventDefault(); });
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") e.preventDefault();
        });
      }
    });
  }

  /* -----------------------------------------------------------------------
     Header: scroll shadow + mobile nav
     ------------------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("menu-toggle");
    var nav = document.getElementById("primary-nav");

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu(); else openMenu();
    });

    nav.querySelectorAll("a[data-nav-link]").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* -----------------------------------------------------------------------
     Smooth in-page navigation (Home/Books/About/Subscribe + emblem/footer)
     ------------------------------------------------------------------- */
  function initAnchorNav() {
    document.querySelectorAll("a[data-nav-link]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId.charAt(0) !== "#") return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", targetId);
      });
    });
  }

  /* -----------------------------------------------------------------------
     Scroll reveals
     ------------------------------------------------------------------- */
  function initReveals() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------------------------------
     Mailing-list form delivery (Web3Forms)
     Both the free chapter form and the /subscribe form send their
     submissions to SITE_CONFIG.web3formsAccessKey's registered inbox via
     Web3Forms' JSON API — no backend of our own, no secret key (the access
     key is meant to be public/embeddable; see the comment in site-config.js).
     While the key is blank, both forms validate but never pretend to have
     submitted anything.
     ------------------------------------------------------------------- */
  function submitToMailingList(fields) {
    var payload = { access_key: CONFIG.web3formsAccessKey };
    for (var key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) payload[key] = fields[key];
    }
    return fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || !data.success) throw new Error((data && data.message) || "submission-failed");
        return data;
      });
    });
  }

  function initFreeChapterForm() {
    var form = document.getElementById("free-chapter-form");
    if (!form) return;
    var status = document.getElementById("fc-status");
    var emailField = document.getElementById("fc-email");
    var nameField = document.getElementById("fc-name");
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitting = false;

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle("is-error", !!isError);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitting) return;

      if (!emailField.value || !emailField.checkValidity()) {
        setStatus("Please enter a valid email address.", true);
        emailField.focus();
        return;
      }

      if (!CONFIG.web3formsAccessKey) {
        setStatus("Email delivery will be connected before launch.", false);
        return;
      }

      var name = nameField.value.trim();
      var email = emailField.value.trim();

      submitting = true;
      submitBtn.disabled = true;
      setStatus("Sending…", false);

      submitToMailingList({
        subject: (name || email) + " wants to join the mailing list!",
        from_name: "Sean Bobby Kerr Website",
        name: name,
        email: email,
        message: "Name: " + (name || "(not provided)") + "\nEmail: " + email + "\nSource: Homepage Free Chapter Form"
      })
        .then(function () {
          setStatus("Chapter on its way — check your inbox.", false);
          form.reset();
        })
        .catch(function () {
          setStatus("Something went wrong. Please try again shortly.", true);
        })
        .then(function () {
          submitting = false;
          submitBtn.disabled = false;
        });
    });
  }

  /* -----------------------------------------------------------------------
     /subscribe page: newsletter form
     ------------------------------------------------------------------- */
  function initNewsletterForm() {
    var form = document.getElementById("newsletter-form");
    if (!form) return;
    var status = document.getElementById("nl-status");
    var emailField = document.getElementById("nl-email");
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitting = false;

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle("is-error", !!isError);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitting) return;

      if (!emailField.value || !emailField.checkValidity()) {
        setStatus("Please enter a valid email address.", true);
        emailField.focus();
        return;
      }

      if (!CONFIG.web3formsAccessKey) {
        setStatus("Mailing-list delivery will be connected before launch.", false);
        return;
      }

      var email = emailField.value.trim();

      submitting = true;
      submitBtn.disabled = true;
      setStatus("Sending…", false);

      submitToMailingList({
        subject: email + " wants to join the mailing list!",
        from_name: "Sean Bobby Kerr Website",
        email: email,
        message: "Name: (not provided)\nEmail: " + email + "\nSource: Subscribe Page"
      })
        .then(function () {
          setStatus("You're on the list — welcome to Gyra.", false);
          form.reset();
        })
        .catch(function () {
          setStatus("Something went wrong. Please try again shortly.", true);
        })
        .then(function () {
          submitting = false;
          submitBtn.disabled = false;
        });
    });
  }

  /* -----------------------------------------------------------------------
     /read page: thin reading-progress bar across the top of the screen
     ------------------------------------------------------------------- */
  function initReadProgress() {
    var bar = document.getElementById("read-progress-bar");
    if (!bar) return;
    var ticking = false;
    function update() {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* -----------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------- */
  function initFooterYear() {
    var el = document.getElementById("footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* -----------------------------------------------------------------------
     /support page: platform name + logo
     The support platform (Patreon today) is named and logo'd in exactly two
     places in SITE_CONFIG — supportPlatformName and supportPlatformLogo.
     Every on-page mention of the platform name lives in a
     [data-support-platform] element and every logo <img> is
     [data-support-logo], so switching platforms later only means editing
     those two config values, not the HTML.
     ------------------------------------------------------------------- */
  function initSupportPage() {
    var nameEls = document.querySelectorAll("[data-support-platform]");
    if (!nameEls.length) return;
    var name = CONFIG.supportPlatformName || "Patreon";
    nameEls.forEach(function (el) { el.textContent = name; });
    document.querySelectorAll("[data-support-logo]").forEach(function (el) {
      if (CONFIG.supportPlatformLogo) el.src = CONFIG.supportPlatformLogo;
      el.alt = name;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfigLinks();
    initHeader();
    initAnchorNav();
    initReveals();
    initFreeChapterForm();
    initNewsletterForm();
    initReadProgress();
    initFooterYear();
    initSupportPage();
  });
})();
