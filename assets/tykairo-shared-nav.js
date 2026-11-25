/* TYKAIRO AI — safe shared navigation enhancer.
   Keeps each page's existing DOM and event listeners intact. */
(()=> {
  const labels = {
    "/": ["Home", "الرئيسية"],
    "/projects/": ["Software", "البرامج"],
    "/work-flow-n8n/": ["n8n Workflows", "ورك فلو n8n"],
    "/skills/": ["Capafy Skills", "مهارات Capafy"],
    "/technology/": ["Technology", "التقنيات"],
    "/about/": ["Company", "عن الشركة"],
    "/founder/mahmoud-hisham/": ["Founder", "المؤسس"],
    "/store/": ["Digital Store", "المتجر الرقمي"],
    "/contact/": ["Contact", "تواصل معنا"]
  };
  const normalize = value => (value || "/").replace(/index\\.html$/, "").replace(/\\/+$/, "") || "/";
  const currentPath = normalize(location.pathname);
  const currentLang = () => document.documentElement.lang === "ar" ? "ar" : "en";
  const header = document.querySelector("header");
  const nav = header?.querySelector("nav");
  if (!header || !nav) return;

  nav.setAttribute("aria-label", nav.getAttribute("aria-label") || "Main navigation");
  nav.querySelectorAll("a[href]").forEach(anchor => {
    const url = new URL(anchor.getAttribute("href"), location.origin);
    const path = normalize(url.pathname);
    const item = labels[path];
    if (item && !anchor.hasAttribute("data-en")) {
      anchor.dataset.en = item[0];
      anchor.dataset.ar = item[1];
      anchor.textContent = item[currentLang() === "ar" ? 1 : 0];
    }
    const isActive = path !== "/" ? currentPath === path || currentPath.startsWith(path) : currentPath === "/";
    if (isActive) anchor.setAttribute("aria-current", "page");
    else if (anchor.getAttribute("aria-current") === "page") anchor.removeAttribute("aria-current");
  });

  // Do not replace nav children, rebuild the brand, inject global CSS, or
  // rewrite CTA controls: page-specific language/menu handlers stay connected.
  const languageObserver = new MutationObserver(() => {
    const lang = currentLang();
    nav.querySelectorAll("a[data-en][data-ar]").forEach(anchor => {
      const expected = anchor.dataset[lang];
      if (expected && anchor.textContent.trim() !== expected) anchor.textContent = expected;
    });
  });
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();