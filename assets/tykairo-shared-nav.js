/* TYKAIRO AI — safe shared navigation enhancer.
   Preserves each page's own DOM, language controls, and mobile menu behavior. */
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
  const normalize = value => {
    let path = value || "/";
    if (path.endsWith("index.html")) path = path.slice(0, -10);
    if (!path.startsWith("/")) path = "/" + path;
    if (!path.endsWith("/")) path += "/";
    return path.replace(/\\/+/g, "/");
  };
  const path = normalize(location.pathname);
  const nav = document.querySelector("header nav");
  if (!nav) return;
  nav.setAttribute("aria-label", nav.getAttribute("aria-label") || "Main navigation");
  nav.querySelectorAll("a[href]").forEach(anchor => {
    const url = new URL(anchor.getAttribute("href"), location.origin);
    const href = normalize(url.pathname);
    const item = labels[href];
    if (item) {
      anchor.dataset.en = item[0];
      anchor.dataset.ar = item[1];
      anchor.textContent = item[document.documentElement.lang === "ar" ? 1 : 0];
    }
    const active = href === "/" ? path === "/" : path.startsWith(href);
    if (active) anchor.setAttribute("aria-current", "page");
    else if (anchor.getAttribute("aria-current") === "page") anchor.removeAttribute("aria-current");
  });
  // No innerHTML replacement, brand rebuild, global CSS injection, or CTA mutation.
  const observer = new MutationObserver(() => {
    const lang = document.documentElement.lang === "ar" ? "ar" : "en";
    nav.querySelectorAll("a[data-en][data-ar]").forEach(anchor => {
      const label = anchor.dataset[lang];
      if (label && anchor.textContent.trim() !== label) anchor.textContent = label;
    });
  });
  observer.observe(document.documentElement, {attributes:true, attributeFilter:["lang"]});
})();