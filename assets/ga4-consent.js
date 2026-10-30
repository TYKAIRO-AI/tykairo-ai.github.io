/* TYKAIRO-AI / SuperStore: optional, consent-first GA4 analytics. No GA requests before consent. */
(() => {
  'use strict';
  if (window.TYKAIROAnalytics) return;
  const measurementId = 'G-FPNE7P4Z2N';
  const storageKey = 'tykairo_analytics_consent_v1';
  const privacyUrl = 'https://tykairo-ai.github.io/privacy/';
  let enabled = false;
  let banner = null;
  const getConsent = () => { try { return localStorage.getItem(storageKey); } catch { return null; } };
  const setConsent = value => { try { localStorage.setItem(storageKey, value); } catch { /* no persistence */ } };
  const safePageUrl = () => {
    const url = new URL(location.href);
    const clean = new URLSearchParams();
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = url.searchParams.get(name);
      if (value && /^[a-zA-Z0-9._-]{1,80}$/.test(value)) clean.set(name, value);
    }
    return url.origin + url.pathname + (clean.toString() ? '?' + clean.toString() : '');
  };
  const safeReferrer = () => {
    try { return document.referrer ? new URL(document.referrer).origin + '/' : ''; } catch { return ''; }
  };
  function enableAnalytics() {
    if (enabled) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('set', { 'allow_google_signals': false, 'allow_ad_personalization_signals': false });
    window.gtag('config', measurementId, {
      'send_page_view': true,
      'page_location': safePageUrl(),
      'page_path': location.pathname,
      'page_referrer': safeReferrer(),
      'allow_google_signals': false,
      'allow_ad_personalization_signals': false
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }
  function track(eventName, details) {
    if (!enabled || !/^[a-z][a-z0-9_]{1,40}$/.test(eventName)) return;
    if (typeof window.gtag === 'function') window.gtag('event', eventName, details || {});
  }
  function closeBanner() {
    if (!banner) return;
    banner.remove(); banner = null;
  }
  function choose(value) {
    setConsent(value);
    closeBanner();
    if (value === 'accepted') enableAnalytics();
    else if (enabled) location.reload(); // Stop previously consented analytics on withdrawal.
  }
  function showBanner() {
    if (banner) return;
    const isAr = document.documentElement.lang.toLowerCase().startsWith('ar');
    const cssId = 'tykairo-analytics-consent-styles';
    if (!document.getElementById(cssId)) {
      const style = document.createElement('style');
      style.id = cssId;
      style.textContent = '#tyk-ga-consent{position:fixed!important;z-index:2147483000!important;bottom:16px!important;left:16px!important;right:16px!important;max-width:540px!important;box-sizing:border-box!important;padding:16px 18px!important;background:#141d30!important;color:#edf4ff!important;border:1px solid #627da3!important;border-radius:16px!important;box-shadow:0 16px 50px #0008!important;font:14px/1.55 system-ui,Segoe UI,Arial,sans-serif!important;text-align:left!important}#tyk-ga-consent[dir="rtl"]{text-align:right!important}#tyk-ga-consent p{margin:0 0 12px!important;color:#d8e3f4!important;font:inherit!important}#tyk-ga-consent .tyk-ga-buttons{display:flex!important;flex-wrap:wrap!important;gap:8px!important;align-items:center!important}#tyk-ga-consent button{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:42px!important;cursor:pointer!important;padding:9px 16px!important;border-radius:10px!important;border:1px solid #7990b5!important;background:#263851!important;color:#f1f5ff!important;font:600 13px system-ui,sans-serif!important}#tyk-ga-consent button[data-ga-choice="accepted"]{background:#315fd7!important;border-color:#315fd7!important;color:#fff!important}#tyk-ga-consent a{color:#afd1ff!important;text-decoration:underline!important;font:12px system-ui,sans-serif!important}#tyk-ga-consent strong{font-weight:800!important}@media(max-width:560px){#tyk-ga-consent{bottom:10px!important;left:10px!important;right:10px!important;padding:14px!important}#tyk-ga-consent .tyk-ga-buttons button{flex:1!important}}';
      document.head.appendChild(style);
    }
    banner = document.createElement('section');
    banner.id = 'tyk-ga-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', isAr ? 'خيارات إحصائيات الموقع' : 'Website analytics preferences');
    banner.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    const p = document.createElement('p');
    p.textContent = isAr ? 'هل تسمح لنا باستخدام Google Analytics لفهم عدد الزوار وتحسين الموقع؟ التتبع اختياري، ولن يتم تشغيله قبل موافقتك.' : 'Allow optional Google Analytics to measure visits and improve the site? No analytics loads before you choose Accept.';
    const actions = document.createElement('div');
    actions.className = 'tyk-ga-buttons';
    for (const [value, label] of [['accepted', isAr ? 'موافق' : 'Accept analytics'], ['declined', isAr ? 'رفض' : 'Decline']]) {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.dataset.gaChoice = value; btn.textContent = label;
      btn.addEventListener('click', () => choose(value));
      actions.appendChild(btn);
    }
    const policy = document.createElement('a');
    policy.href = privacyUrl;
    policy.textContent = isAr ? 'سياسة الخصوصية' : 'Privacy policy';
    actions.appendChild(policy);
    banner.append(p, actions);
    document.body.appendChild(banner);
  }
  window.TYKAIROAnalytics = { track, showPreferences: showBanner, hasConsent: () => getConsent() === 'accepted' };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) {
      const tab = event.target.closest('button[data-tab]');
      if (tab && location.hostname.endsWith('onrender.com')) {
        const name = tab.getAttribute('data-tab');
        if (['templates', 'design', 'products', 'pages', 'preview', 'settings'].includes(name)) track('superstore_editor_tab', { section: name });
      }
      return;
    }
    if (location.hostname === 'tykairo-ai.github.io' && link.closest('#superstore-live-demo') && link.pathname === '/superstore/') {
      track('superstore_product_open', { source_section: 'homepage_promo' });
    }
    if (location.hostname === 'tykairo-ai.github.io' && location.pathname.startsWith('/superstore/') && link.hostname === 'superstore-studio5-server.onrender.com') {
      track('superstore_demo_launch', { source_section: 'product_page' });
    }
  }, true);
  const init = () => { const pref = getConsent(); if (pref === 'accepted') enableAnalytics(); else if (pref !== 'declined') showBanner(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();