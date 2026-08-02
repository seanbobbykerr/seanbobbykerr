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
        if (isNavOrIcon) {
          el.classList.remove("nav-pending");
          el.setAttribute("aria-label", label);
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
     Map lightbox
     ------------------------------------------------------------------- */
  function initMapLightbox() {
    var openBtn = document.getElementById("map-open-btn");
    var exploreBtn = document.getElementById("explore-gyra-btn");
    var lightbox = document.getElementById("map-lightbox");
    var closeBtn = document.getElementById("map-close-btn");
    if (!lightbox) return;

    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      lightbox.hidden = false;
      requestAnimationFrame(function () { lightbox.classList.add("is-open"); });
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      var finish = function () { lightbox.hidden = true; };
      if (reduceMotion) finish();
      else setTimeout(finish, 250);
      if (lastFocused) lastFocused.focus();
    }

    openBtn.addEventListener("click", open);
    if (exploreBtn) exploreBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    lightbox.querySelectorAll("[data-map-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) close();
    });
  }

  /* -----------------------------------------------------------------------
     "More About Sean" reveal
     ------------------------------------------------------------------- */
  function initAuthorMore() {
    var btn = document.getElementById("author-more-btn");
    var panel = document.getElementById("author-more");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
      btn.textContent = expanded ? "More About Sean" : "Show Less";
    });
  }

  /* -----------------------------------------------------------------------
     Free chapter form
     There is no mailing-list endpoint yet. While SITE_CONFIG.freeChapterEndpoint
     is blank, the form validates but never pretends to submit successfully.
     ------------------------------------------------------------------- */
  function initFreeChapterForm() {
    var form = document.getElementById("free-chapter-form");
    if (!form) return;
    var status = document.getElementById("fc-status");
    var emailField = document.getElementById("fc-email");

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle("is-error", !!isError);
    }

    // TODO: once SITE_CONFIG.freeChapterEndpoint is set to a real mailing-list
    // endpoint, this is the only function that needs to change — it should
    // POST { name, email } to that endpoint and resolve/reject accordingly.
    function submitFreeChapter(payload) {
      return fetch(CONFIG.freeChapterEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!emailField.value || !emailField.checkValidity()) {
        setStatus("Please enter a valid email address.", true);
        emailField.focus();
        return;
      }

      if (!CONFIG.freeChapterEndpoint) {
        setStatus("Email delivery will be connected before launch.", false);
        return;
      }

      var payload = { name: document.getElementById("fc-name").value, email: emailField.value };
      setStatus("Sending…", false);
      submitFreeChapter(payload)
        .then(function (res) {
          if (!res.ok) throw new Error("bad-response");
          setStatus("Chapter on its way — check your inbox.", false);
          form.reset();
        })
        .catch(function () {
          setStatus("Something went wrong. Please try again shortly.", true);
        });
    });
  }

  /* -----------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------- */
  function initFooterYear() {
    var el = document.getElementById("footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfigLinks();
    initHeader();
    initAnchorNav();
    initReveals();
    initMapLightbox();
    initAuthorMore();
    initFreeChapterForm();
    initFooterYear();
  });
})();
