/* ==========================================================================
   LALGOLA DEVELOPMENT BLOCK — SITE SCRIPT 
   Reads content from data.js (SITE_DATA) and renders it into the page.
   Handles: language switch, mobile menu, notice search/filter.
   ========================================================================== */

(function () {
  "use strict";

  var LANG_KEY = "lalgola_lang";

  /* ---------------- language helpers ---------------- */
  function getLang() {
    return localStorage.getItem(LANG_KEY) || "en";
  }

  function t(field) {
    // field is an object like {en: "...", bn: "..."} — returns both spans
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field;
  }

  // Build a span pair so CSS can show/hide by data-lang on <body>
  function bilingual(field) {
    if (field == null) return "";
    if (typeof field === "string") return escapeHtml(field);
    var en = field.en != null ? escapeHtml(field.en) : "";
    var bn = field.bn != null ? escapeHtml(field.bn) : "";
    return '<span class="lang-en">' + en + '</span><span class="lang-bn">' + bn + '</span>';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setLang(lang) {
    document.body.setAttribute("data-lang", lang);
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute("lang", lang === "bn" ? "bn" : "en");
    var buttons = document.querySelectorAll(".lang-switch button");
    buttons.forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang-btn") === lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang-btn") === lang ? "true" : "false");
    });
  }

  /* ---------------- render: header / hero ---------------- */
  function renderStaticText() {
    var d = SITE_DATA;
    setText(".js-govt-line", bilingual(d.office.govt));
    setText(".js-block-name", bilingual(d.office.blockName));
    setText(".js-office-title", bilingual(d.office.officeTitle));
    setText(".js-district", bilingual(d.office.district));
    setText(".js-hero-title", bilingual(d.hero.title));
    setText(".js-hero-subtitle", bilingual(d.hero.subtitle));
    setText(".js-about-heading", bilingual(d.about.heading));
    setText(".js-last-updated", d.office.lastUpdated);
    setText(".js-helpline", escapeHtml(d.office.helpline || ""));
    setText(".js-year", new Date().getFullYear());
  }

  /* ---------------- render: leadership strip ---------------- */
  function renderLeadership() {
    var wrap = document.querySelector(".js-leadership-inner");
    if (!wrap || !SITE_DATA.leadership) return;
    wrap.innerHTML = SITE_DATA.leadership.map(function (p) {
      return (
        '<div class="leader-card">' +
        '<div class="leader-photo" aria-hidden="true">' + p.icon + "</div>" +
        "<div>" +
        '<p class="leader-name">' + escapeHtml(p.name) + "</p>" +
        '<p class="leader-title">' + bilingual(p.title) + "</p>" +
        "</div>" +
        "</div>"
      );
    }).join("");
  }

  function setText(selector, html) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.innerHTML = html;
    });
  }

  /* ---------------- render: stats ---------------- */
  function renderStats() {
    var wrap = document.querySelector(".js-stats-grid");
    if (!wrap) return;
    wrap.innerHTML = SITE_DATA.stats.map(function (s) {
      return (
        '<div class="stat-card">' +
        '<div class="icon" aria-hidden="true">' + s.icon + "</div>" +
        '<div class="value">' + escapeHtml(s.value) + "</div>" +
        '<div class="label">' + bilingual(s.label) + "</div>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------------- render: about ---------------- */
  function renderAbout() {
    var wrap = document.querySelector(".js-about-body");
    if (!wrap) return;
    var enParas = SITE_DATA.about.body.en.map(function (p) { return "<p>" + escapeHtml(p) + "</p>"; }).join("");
    var bnParas = SITE_DATA.about.body.bn.map(function (p) { return "<p>" + escapeHtml(p) + "</p>"; }).join("");
    wrap.innerHTML = '<div class="lang-en">' + enParas + '</div><div class="lang-bn">' + bnParas + "</div>";
  }

  /* ---------------- render: administration ---------------- */
  function renderAdministration() {
    var wrap = document.querySelector(".js-admin-grid");
    if (!wrap) return;
    wrap.innerHTML = SITE_DATA.administration.map(function (a) {
      var hasDesc = a.desc && ((a.desc.en && a.desc.en.trim()) || (a.desc.bn && a.desc.bn.trim()));
      return (
        '<div class="card admin-card">' +
        '<p class="role">' + bilingual(a.role) + "</p>" +
        '<p class="name">' + bilingual(a.name) + "</p>" +
        (hasDesc ? '<p>' + bilingual(a.desc) + "</p>" : "") +
        "</div>"
      );
    }).join("");
  }

  /* ---------------- render: schemes ---------------- */
  function renderSchemes() {
    var wrap = document.querySelector(".js-schemes-grid");
    if (!wrap) return;
    wrap.innerHTML = SITE_DATA.schemes.map(function (s) {
      return (
        '<div class="card">' +
        '<span class="tag">' + escapeHtml(s.name) + "</span>" +
        "<h3>" + bilingual(s.fullName) + "</h3>" +
        "<p>" + bilingual(s.desc) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------------- render: services ---------------- */
  function renderServices() {
    var wrap = document.querySelector(".js-services-grid");
    if (!wrap) return;
    wrap.innerHTML = SITE_DATA.services.map(function (s) {
      return (
        '<div class="card">' +
        '<span class="card-icon" aria-hidden="true">' + s.icon + "</span>" +
        "<h3>" + bilingual(s.name) + "</h3>" +
        "<p>" + bilingual(s.desc) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------------- render: documents table ---------------- */
  function renderDocuments() {
    var tbody = document.querySelector(".js-doc-tbody");
    if (!tbody) return;
    tbody.innerHTML = SITE_DATA.documents.map(function (doc) {
      var link = doc.file
        ? '<a class="btn btn-primary" href="documents/' + encodeURIComponent(doc.file) + '" download><span class="lang-en">Download</span><span class="lang-bn">ডাউনলোড</span></a>'
        : '<button class="btn btn-outline" disabled><span class="lang-en">Not yet available</span><span class="lang-bn">এখনও উপলব্ধ নয়</span></button>';
      return (
        "<tr>" +
        "<td>" + bilingual(doc.name) + "</td>" +
        "<td>" + bilingual(doc.category) + "</td>" +
        "<td>" + link + "</td>" +
        "</tr>"
      );
    }).join("");
  }

  /* ---------------- render: important links ---------------- */
  function renderLinks() {
    var wrap = document.querySelector(".js-links-grid");
    if (!wrap) return;
    wrap.innerHTML = SITE_DATA.importantLinks.map(function (l) {
      var external = l.url && l.url !== "#";
      return (
        '<a class="link-card" href="' + escapeHtml(l.url || "#") + '"' +
        (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
        ">" + bilingual(l.name) + '<span class="arrow" aria-hidden="true">&rarr;</span></a>'
      );
    }).join("");
  }

  /* ---------------- render: contact ---------------- */
  function renderContact() {
    var c = SITE_DATA.contact;
    setText(".js-contact-address", bilingual(c.address));
    setText(".js-contact-phone", escapeHtml(c.phone));
    setText(".js-contact-email", escapeHtml(c.email));
    setText(".js-contact-hours", bilingual(c.officeHours));

    var mapWrap = document.querySelector(".js-map-embed");
    if (mapWrap) {
      if (c.mapEmbedUrl) {
        mapWrap.innerHTML = '<iframe src="' + escapeHtml(c.mapEmbedUrl) + '" style="width:100%;height:100%;border:0;" loading="lazy" title="Office location map"></iframe>';
      } else {
        mapWrap.innerHTML =
          '<div><span class="lang-en">Map will be added once the exact office location is confirmed.</span>' +
          '<span class="lang-bn">সঠিক কার্যালয়ের অবস্থান নিশ্চিত হলে মানচিত্র যুক্ত করা হবে।</span></div>';
      }
    }
  }

  /* ---------------- render: photo gallery ---------------- */
  function renderGallery() {
    var wrap = document.querySelector(".js-gallery-grid");
    if (!wrap) return;
    var withPhotos = SITE_DATA.gallery.filter(function (g) { return g.image; });

    if (withPhotos.length === 0) {
      wrap.innerHTML =
        '<div class="empty-state">' +
        '<span class="lang-en">No photos have been added yet. Add image files to assets/gallery/ and list them in data.js to display them here.</span>' +
        '<span class="lang-bn">এখনও কোনো ছবি যোগ করা হয়নি। assets/gallery/ ফোল্ডারে ছবি যুক্ত করে data.js-এ তালিকাভুক্ত করলে এখানে প্রদর্শিত হবে।</span>' +
        "</div>";
      return;
    }

    wrap.innerHTML = withPhotos.map(function (g) {
      return (
        '<figure class="gallery-item">' +
        '<img src="assets/gallery/' + encodeURIComponent(g.image) + '" alt="' + escapeHtml((g.caption && g.caption.en) || "") + '" loading="lazy" />' +
        '<figcaption>' + bilingual(g.caption) + "</figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  /* ---------------- render: sidebar quick service links ---------------- */
  function renderQuickServiceLinks() {
    var wrap = document.querySelector(".js-quick-service-links");
    if (!wrap) return;
    wrap.innerHTML = SITE_DATA.quickServiceLinks.map(function (l) {
      return (
        '<li><a href="' + escapeHtml(l.url) + '" target="_blank" rel="noopener noreferrer">' +
        bilingual(l.name) +
        "</a></li>"
      );
    }).join("");
  }

  /* ---------------- render: social links ---------------- */
  function renderSocialLinks() {
    var wraps = document.querySelectorAll(".js-social-links");
    if (!wraps.length) return;
    var s = SITE_DATA.socialLinks || {};
    var icons = [
      { key: "facebook", label: "Facebook", icon: "📘" },
      { key: "twitter", label: "Twitter / X", icon: "🐦" },
      { key: "youtube", label: "YouTube", icon: "▶️" }
    ];
    var active = icons.filter(function (i) { return s[i.key]; });
    var html;
    if (active.length === 0) {
      html =
        '<span class="lang-en">Social media pages will be linked here once available.</span>' +
        '<span class="lang-bn">সোশ্যাল মিডিয়া পেজ পাওয়া গেলে এখানে যুক্ত করা হবে।</span>';
    } else {
      html = active.map(function (i) {
        return '<a href="' + escapeHtml(s[i.key]) + '" target="_blank" rel="noopener noreferrer" aria-label="' + i.label + '">' + i.icon + "</a>";
      }).join("");
    }
    wraps.forEach(function (wrap) { wrap.innerHTML = html; });
  }

  /* ---------------- render: marquee ---------------- */
  function renderMarquee() {
    var track = document.querySelector(".js-marquee-content");
    if (!track) return;
    var sorted = SITE_DATA.notices.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
    track.innerHTML = sorted.map(function (n) {
      return '<span>' + bilingual(n.title) + " &mdash; " + n.date + "</span>";
    }).join("");
  }

  /* ---------------- render: notices (with search/filter) ---------------- */
  var noticeState = { query: "", dept: "all" };

  function noticeDepartments() {
    var seen = {};
    var list = [];
    SITE_DATA.notices.forEach(function (n) {
      var key = n.department.en;
      if (!seen[key]) {
        seen[key] = true;
        list.push(n.department);
      }
    });
    return list;
  }

  function populateDeptFilter() {
    var select = document.querySelector(".js-notice-dept");
    if (!select) return;
    var opts = ['<option value="all" data-en="All Departments" data-bn="সমস্ত বিভাগ">All Departments</option>'];
    noticeDepartments().forEach(function (dep) {
      opts.push('<option value="' + escapeHtml(dep.en) + '">' + escapeHtml(dep.en) + "</option>");
    });
    select.innerHTML = opts.join("");
  }

  function renderNotices() {
    var list = document.querySelector(".js-notice-list");
    if (!list) return;

    var filtered = SITE_DATA.notices.filter(function (n) {
      var matchesDept = noticeState.dept === "all" || n.department.en === noticeState.dept;
      var haystack = (n.title.en + " " + n.title.bn + " " + n.description.en + " " + n.description.bn).toLowerCase();
      var matchesQuery = noticeState.query === "" || haystack.indexOf(noticeState.query.toLowerCase()) !== -1;
      return matchesDept && matchesQuery;
    }).sort(function (a, b) { return b.date.localeCompare(a.date); });

    if (filtered.length === 0) {
      list.innerHTML =
        '<div class="empty-state">' +
        '<span class="lang-en">No notices match your search.</span>' +
        '<span class="lang-bn">আপনার অনুসন্ধানের সাথে কোনো বিজ্ঞপ্তি মেলেনি।</span>' +
        "</div>";
      return;
    }

    list.innerHTML = filtered.map(function (n) {
      var pdfBtn = n.pdf
        ? '<a class="btn btn-primary" href="documents/' + encodeURIComponent(n.pdf) + '" download><span class="lang-en">Download PDF</span><span class="lang-bn">পিডিএফ ডাউনলোড</span></a>'
        : '<button class="btn btn-primary" disabled><span class="lang-en">PDF Not Available</span><span class="lang-bn">পিডিএফ উপলব্ধ নেই</span></button>';
      var thumb = n.image
        ? '<img class="notice-thumb" src="assets/gallery/' + encodeURIComponent(n.image) + '" alt="" loading="lazy" />'
        : "";
      return (
        '<article class="notice-item">' +
        thumb +
        '<div class="notice-main">' +
        "<h3>" + bilingual(n.title) + "</h3>" +
        '<div class="notice-meta">' +
        '<span>📅 ' + escapeHtml(n.date) + "</span>" +
        '<span>🏢 ' + bilingual(n.department) + "</span>" +
        "</div>" +
        '<p class="notice-desc">' + bilingual(n.description) + "</p>" +
        "</div>" +
        '<div class="notice-actions">' +
        pdfBtn +
        '<button class="btn btn-outline js-view-notice" data-id="' + n.id + '"><span class="lang-en">View</span><span class="lang-bn">দেখুন</span></button>' +
        "</div>" +
        "</article>"
      );
    }).join("");
  }

  function bindNoticeControls() {
    var search = document.querySelector(".js-notice-search");
    var dept = document.querySelector(".js-notice-dept");
    if (search) {
      search.addEventListener("input", function () {
        noticeState.query = search.value.trim();
        renderNotices();
      });
    }
    if (dept) {
      dept.addEventListener("change", function () {
        noticeState.dept = dept.value;
        renderNotices();
      });
    }
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".js-view-notice");
      if (!btn) return;
      var n = SITE_DATA.notices.find(function (item) { return item.id === btn.getAttribute("data-id"); });
      if (!n) return;
      var lang = getLang();
      var title = lang === "bn" ? n.title.bn : n.title.en;
      var desc = lang === "bn" ? n.description.bn : n.description.en;
      window.alert(title + "\n\n" + desc + "\n\n" + n.date);
    });
  }

  /* ---------------- mobile menu ---------------- */
  function bindMobileMenu() {
    var toggle = document.querySelector(".js-menu-toggle");
    var nav = document.querySelector(".js-nav-list");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- active nav link on scroll ---------------- */
  function bindActiveNav() {
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    var navLinks = document.querySelectorAll(".js-nav-list a");
    if (!sections.length || !navLinks.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------------- language buttons ---------------- */
  function bindLangButtons() {
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-btn"));
      });
    });
  }

  /* ---------------- accessibility toolbar ---------------- */
  var FONT_KEY = "lalgola_font_scale";
  var CONTRAST_KEY = "lalgola_contrast";
  var MIN_SCALE = 90, MAX_SCALE = 130, STEP = 10;

  function applyFontScale(scale) {
    scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    document.documentElement.style.fontSize = scale + "%";
    localStorage.setItem(FONT_KEY, String(scale));
  }

  function applyContrast(on) {
    document.body.setAttribute("data-contrast", on ? "high" : "normal");
    localStorage.setItem(CONTRAST_KEY, on ? "1" : "0");
    var btn = document.querySelector(".js-contrast-toggle");
    if (btn) btn.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function bindAccessibilityToolbar() {
    var dec = document.querySelector(".js-font-decrease");
    var inc = document.querySelector(".js-font-increase");
    var reset = document.querySelector(".js-font-reset");
    var contrastBtn = document.querySelector(".js-contrast-toggle");

    var savedScale = parseInt(localStorage.getItem(FONT_KEY), 10) || 100;
    applyFontScale(savedScale);
    applyContrast(localStorage.getItem(CONTRAST_KEY) === "1");

    if (dec) dec.addEventListener("click", function () {
      applyFontScale((parseInt(localStorage.getItem(FONT_KEY), 10) || 100) - STEP);
    });
    if (inc) inc.addEventListener("click", function () {
      applyFontScale((parseInt(localStorage.getItem(FONT_KEY), 10) || 100) + STEP);
    });
    if (reset) reset.addEventListener("click", function () { applyFontScale(100); });
    if (contrastBtn) contrastBtn.addEventListener("click", function () {
      applyContrast(localStorage.getItem(CONTRAST_KEY) !== "1");
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    renderStaticText();
    renderLeadership();
    renderStats();
    renderAbout();
    renderAdministration();
    renderSchemes();
    renderServices();
    renderDocuments();
    renderLinks();
    renderContact();
    renderGallery();
    renderQuickServiceLinks();
    renderSocialLinks();
    renderMarquee();
    populateDeptFilter();
    renderNotices();

    bindNoticeControls();
    bindMobileMenu();
    bindActiveNav();
    bindLangButtons();
    bindAccessibilityToolbar();

    setLang(getLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
