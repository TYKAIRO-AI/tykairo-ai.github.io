/* TYKAIRO AI — one canonical company navigation for every first-party page. */
(()=> {
  const items = [
    ["/", "Home"],
    ["/projects/", "Software"],
    ["/work-flow-n8n/", "n8n Workflows"],
    ["/skills/", "Capafy Skills"],
    ["/technology/", "Technology"],
    ["/about/", "Company"],
    ["/founder/mahmoud-hisham/", "Founder"],
    ["/store/", "Digital Store"],
    ["/contact/", "Contact"]
  ];
  const path = location.pathname.replace(/index\.html$/, "");
  const active = items.find(([href]) => href !== "/" && (path === href || path.startsWith(href)))?.[0]
    || (path === "/" ? "/" : null);
  const nav = document.querySelector(
    ".navlinks, .desktop-nav, .links, #thanksNav"
  );
  if (!nav) return;
  nav.innerHTML = items.map(([href, label]) => {
    const current = href === active;
    return '<a href="' + href + '"' + (current ? ' aria-current="page"' : '') + '>' + label + '</a>';
  }).join("");
  nav.setAttribute("aria-label", "Main navigation");
  nav.setAttribute("translate", "no");
  nav.classList.add("tykairo-canonical-nav");

  if (!document.getElementById("tykairo-canonical-nav-style")) {
    const style = document.createElement("style");
    style.id = "tykairo-canonical-nav-style";
    style.textContent = `
      .tykairo-canonical-nav{direction:ltr!important;unicode-bidi:isolate;align-items:center}
      .tykairo-canonical-nav a{direction:ltr!important;unicode-bidi:isolate;white-space:nowrap;position:relative;transition:color .18s,background .18s,border-color .18s}
      .tykairo-canonical-nav a[aria-current="page"]{color:#fff!important;font-weight:800!important}
      .tykairo-canonical-nav a[aria-current="page"]:after{content:"";position:absolute;left:0;right:0;bottom:-10px;height:2px;background:#f12b43;border-radius:2px}
      .tykairo-canonical-nav a:hover{color:#fff!important}
      @media(max-width:940px){.tykairo-canonical-nav{flex-direction:column!important;align-items:stretch!important}.tykairo-canonical-nav a[aria-current="page"]{background:rgba(241,43,67,.12);border-radius:7px}.tykairo-canonical-nav a[aria-current="page"]:after{left:0;right:auto;top:8px;bottom:8px;width:3px;height:auto}}
    `;
    document.head.appendChild(style);
  }
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open", "nav-open");
    document.querySelectorAll(".menu-btn,.menu-toggle,#thanksMenu").forEach(button => {
      button.setAttribute("aria-expanded", "false");
      if (button.id === "thanksMenu" || button.classList.contains("menu-toggle")) button.textContent = "☰";
    });
  }));
})();