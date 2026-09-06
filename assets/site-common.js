/* ============================================================
   Comportamiento del sitio: cabecera, menú móvil, idioma,
   FAQ, modal legal, datos de contacto y formulario de demo.
   Depende de: assets/config.js, assets/i18n.js
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.SITE_CONFIG || {};
  var FLAGS = { es: '🇪🇸', en: '🇬🇧' };
  var currentLang = localStorage.getItem('tdc_lang') || (navigator.language || 'es').slice(0, 2);
  if (!I18N[currentLang]) currentLang = 'es';

  function t(key) {
    var dict = I18N[currentLang] || I18N.es;
    return dict[key] !== undefined ? dict[key] : (I18N.es[key] !== undefined ? I18N.es[key] : key);
  }

  /* ---------- Año en el pie ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Cabecera y botón "arriba" ---------- */
  var header = document.getElementById('site-header');
  var toTop = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Menú móvil ---------- */
  var burger = document.getElementById('burgerBtn');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- FAQ (acordeón) ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        other.classList.remove('open');
        var oq = other.querySelector('.faq-q');
        if (oq) oq.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Modal legal ---------- */
  var legalModal = document.getElementById('legalModal');
  if (legalModal) {
    var panels = {
      aviso: document.getElementById('legalPanelAviso'),
      privacidad: document.getElementById('legalPanelPrivacidad'),
      cookies: document.getElementById('legalPanelCookies'),
    };
    var openLegal = function (tab) {
      legalModal.classList.add('open');
      document.querySelectorAll('.legal-tab').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-legal-panel') === tab);
      });
      Object.keys(panels).forEach(function (key) {
        if (panels[key]) panels[key].classList.toggle('active', key === tab);
      });
    };
    document.querySelectorAll('[data-legal-tab]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openLegal(btn.getAttribute('data-legal-tab'));
      });
    });
    document.querySelectorAll('.legal-tab').forEach(function (btn) {
      btn.addEventListener('click', function () { openLegal(btn.getAttribute('data-legal-panel')); });
    });
    var closeBtn = document.getElementById('legalClose');
    if (closeBtn) closeBtn.addEventListener('click', function () { legalModal.classList.remove('open'); });
    legalModal.addEventListener('click', function (e) {
      if (e.target === legalModal) legalModal.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') legalModal.classList.remove('open');
    });
  }

  /* ---------- Datos de contacto desde config.js ---------- */
  function applyContactData() {
    document.querySelectorAll('[data-cfg-phone]').forEach(function (el) {
      el.textContent = CFG.phone || '';
      if (el.tagName === 'A') el.href = 'tel:' + (CFG.phoneHref || '');
    });
    document.querySelectorAll('[data-cfg-tel]').forEach(function (el) {
      el.href = 'tel:' + (CFG.phoneHref || '');
    });
    document.querySelectorAll('[data-cfg-wa]').forEach(function (el) {
      el.href = 'https://wa.me/' + (CFG.whatsapp || '');
    });
    document.querySelectorAll('[data-cfg-email]').forEach(function (el) {
      el.textContent = CFG.email || '';
      el.href = 'mailto:' + (CFG.email || '');
    });
    document.querySelectorAll('[data-cfg-address]').forEach(function (el) {
      el.textContent = CFG.address || '';
    });
    document.querySelectorAll('[data-cfg-social]').forEach(function (el) {
      var key = el.getAttribute('data-cfg-social');
      if (CFG[key]) { el.href = CFG[key]; } else { el.style.display = 'none'; }
    });
  }

  /* ---------- Idioma ---------- */
  function applyTranslations(lang) {
    var dict = I18N[lang] || I18N.es;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });
    document.documentElement.lang = lang;
    var flag = document.getElementById('langFlag');
    var code = document.getElementById('langCode');
    if (flag) flag.textContent = FLAGS[lang] || '';
    if (code) code.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-menu button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tdc_lang', lang);
    applyTranslations(lang);
    applyContactData();
  }

  var langSwitch = document.getElementById('langSwitch');
  var langBtn = document.getElementById('langBtn');
  if (langSwitch && langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langSwitch.classList.toggle('open');
    });
    document.querySelectorAll('.lang-menu button').forEach(function (b) {
      b.addEventListener('click', function () {
        setLanguage(b.getAttribute('data-lang'));
        langSwitch.classList.remove('open');
      });
    });
    document.addEventListener('click', function (e) {
      if (!langSwitch.contains(e.target)) langSwitch.classList.remove('open');
    });
  }

  /* ---------- Validación del formulario ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  var PHONE_RE = /^[0-9]{6,15}$/;

  function showFieldError(el, msg) {
    el.classList.add('invalid');
    var err = document.getElementById(el.id + '_err');
    if (err) { err.textContent = msg; err.classList.add('show'); }
  }
  function clearFieldError(el) {
    el.classList.remove('invalid');
    var err = document.getElementById(el.id + '_err');
    if (err) err.classList.remove('show');
  }
  function validateField(def) {
    var el = def.el;
    var value = (el.value || '').trim();
    clearFieldError(el);
    if (!value) { showFieldError(el, t('err_required')); return false; }
    if (def.type === 'email' && !EMAIL_RE.test(value)) { showFieldError(el, t('err_email')); return false; }
    if (def.type === 'phone' && !PHONE_RE.test(value.replace(/[\s.\-()]/g, ''))) { showFieldError(el, t('err_phone')); return false; }
    return true;
  }

  function setStatus(el, kind, html) {
    if (!el) return;
    el.className = 'form-status show ' + kind;
    el.innerHTML = html;
  }
  function clearStatus(el) {
    if (!el) return;
    el.className = 'form-status';
    el.innerHTML = '';
  }
  function errorStatusHTML() {
    return '<span>' + t('status_error_intro') + ' ' +
      '<a href="tel:' + (CFG.phoneHref || '') + '">' + t('status_error_call') + '</a> · ' +
      '<a href="https://wa.me/' + (CFG.whatsapp || '') + '" target="_blank" rel="noopener">' + t('status_error_wa') + '</a> · ' +
      t('status_error_email') + ' <a href="mailto:' + (CFG.email || '') + '">' + (CFG.email || '') + '</a></span>';
  }

  /* ---------- Envío del formulario ----------
     El mecanismo se elige en config.js (form.mode). Sin configurar,
     rechaza con 'form-not-configured' y la web ofrece las vías
     alternativas de contacto.                                      */
  function messageBody(data) {
    return t('email_subject') + '\n\n' +
      t('form_name') + ': ' + data.name + '\n' +
      t('form_shop') + ': ' + data.shop + '\n' +
      t('form_email') + ': ' + data.email + '\n' +
      t('form_phone') + ': ' + data.phone + '\n' +
      t('form_size') + ': ' + data.size + '\n' +
      t('form_msg') + ': ' + (data.message || '-');
  }

  function sendForm(data) {
    var f = CFG.form || {};
    var payload = {};
    Object.keys(data).forEach(function (k) { payload[k] = data[k]; });
    Object.keys(f.extraFields || {}).forEach(function (k) { payload[k] = f.extraFields[k]; });
    payload.body = messageBody(data);

    if (f.mode === 'endpoint' && f.endpoint) {
      var opts;
      if (f.payload === 'form') {
        var fd = new FormData();
        Object.keys(payload).forEach(function (k) { fd.append(k, payload[k]); });
        opts = { method: f.method || 'POST', body: fd, headers: { Accept: 'application/json' } };
      } else {
        opts = {
          method: f.method || 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        };
      }
      return fetch(f.endpoint, opts).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res;
      });
    }

    if (f.mode === 'mailto') {
      window.location.href = 'mailto:' + (CFG.email || '') +
        '?subject=' + encodeURIComponent(data.subject) +
        '&body=' + encodeURIComponent(payload.body);
      return Promise.resolve();
    }

    return Promise.reject(new Error('form-not-configured'));
  }

  var form = document.getElementById('demoForm');
  if (form) {
    var statusEl = document.getElementById('d_status');
    var captchaInput = document.getElementById('d_captcha');
    var captchaMsg = document.getElementById('d_captcha_msg');
    var consent = document.getElementById('d_consent');
    var consentErr = document.getElementById('d_consent_err');
    var submitBtn = form.querySelector('button[type="submit"]');

    var fieldDefs = [
      { id: 'd_name', type: 'text' },
      { id: 'd_shop', type: 'text' },
      { id: 'd_email', type: 'email' },
      { id: 'd_phone', type: 'phone' },
      { id: 'd_size', type: 'text' },
    ].map(function (f) { return { el: document.getElementById(f.id), type: f.type }; })
     .filter(function (f) { return f.el; });

    fieldDefs.forEach(function (def) {
      def.el.addEventListener('input', function () { clearFieldError(def.el); });
      def.el.addEventListener('change', function () { clearFieldError(def.el); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearStatus(statusEl);
      if (captchaMsg) captchaMsg.classList.remove('show');
      if (consentErr) consentErr.classList.remove('show');

      var fieldsOk = fieldDefs.map(validateField).every(Boolean);
      var answer = (captchaInput ? captchaInput.value : '').trim().toLowerCase();
      var captchaOk = (CFG.captchaAnswers || []).indexOf(answer) !== -1;
      var consentOk = consent ? consent.checked : true;

      if (!captchaOk && captchaMsg) captchaMsg.classList.add('show');
      if (!consentOk && consentErr) { consentErr.textContent = t('err_consent'); consentErr.classList.add('show'); }
      if (!fieldsOk || !captchaOk || !consentOk) return;

      var get = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
      var data = {
        name:    get('d_name'),
        shop:    get('d_shop'),
        email:   get('d_email'),
        phone:   get('d_phone'),
        size:    get('d_size'),
        message: get('d_message'),
        subject: t('email_subject') + ' - ' + get('d_shop'),
        lang:    currentLang,
      };

      setStatus(statusEl, 'sending', t('status_sending'));
      if (submitBtn) submitBtn.disabled = true;

      sendForm(data)
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
          setStatus(statusEl, 'success', t('status_success'));
          form.reset();
        })
        .catch(function (err) {
          if (submitBtn) submitBtn.disabled = false;
          setStatus(statusEl, 'error', errorStatusHTML());
          if (err && err.message === 'form-not-configured') {
            console.warn('[Taller de Chapa y Pintura] Envío del formulario sin configurar: revisa form.mode en assets/config.js');
          } else {
            console.error('[Taller de Chapa y Pintura] Error al enviar el formulario:', err);
          }
        });
    });
  }

  /* ---------- Arranque ---------- */
  setLanguage(currentLang);
})();
