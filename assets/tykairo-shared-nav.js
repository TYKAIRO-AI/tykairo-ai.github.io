/* TYKAIRO AI — canonical shared header/navigation across all first-party pages. */
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
  const path = location.pathname.replace(/index\.html$/, "").replace(/\/+/g, "/");
  const active = path === "/" ? "/" : (items.find(([href]) => href !== "/" && path.startsWith(href))?.[0] || null);

  const header = document.querySelector("header");
  const nav = header?.querySelector("nav");
  if (!header || !nav) return;

  nav.innerHTML = items.map(([href, label]) =>
    '<a href="' + href + '"' + (href === active ? ' aria-current="page"' : '') + '>' + label + '</a>'
  ).join("");
  nav.setAttribute("aria-label", "Main navigation");
  nav.setAttribute("translate", "no");
  nav.classList.add("tykairo-canonical-nav");

  const brand = header.querySelector(".brand");
  if (brand) {
    const logo = brand.querySelector("img");
    if (logo) {
      const src = logo.getAttribute("src");
      brand.innerHTML = '<img src="' + src + '" alt="TYKAIRO AI logo"><span class="tykairo-brand-copy"><strong>TYKAIRO<span>-AI</span></strong><small>ENGINEERING STUDIO</small></span>';
    }
    brand.setAttribute("aria-label", "TYKAIRO AI Home");
  }

  let cta = header.querySelector(".top-contact-cta,.header-cta,.navcta,.nav-cta,.explore");
  const actions = header.querySelector(".nav-actions,.header-actions,.navright");
  if (!cta && actions) {
    cta = document.createElement("a");
    cta.className = "tykairo-shared-cta";
    actions.prepend(cta);
  }
  if (cta) {
    cta.href = "/store/#products";
    cta.textContent = "Explore Products ↗";
    cta.classList.add("tykairo-shared-cta");
    cta.setAttribute("aria-label", "Explore Products");
    cta.setAttribute("translate", "no");
  }

  if (!document.getElementById("tykairo-canonical-nav-style")) {
    const style = document.createElement("style");
    style.id = "tykairo-canonical-nav-style";
    style.textContent = `
      /* Site-wide mobile overflow protection */
      html,body{max-width:100%;overflow-x:clip!important}
      body{min-width:0!important}
      img,video,svg,canvas,iframe{max-width:100%;height:auto}
      :where(main,section,article,aside,footer,.container,.wrap,.content,.section-inner,.hero-inner,.hero-copy,.hero-content,.page-hero,.section-header,.card-grid,.workflow-grid,.details-split,.featured,.footer-main){min-width:0;max-width:100%}
      :where(h1,h2,h3,h4,p,a,button,span,li,small,strong,label){overflow-wrap:anywhere}
      :where(input,select,textarea,button){max-width:100%;box-sizing:border-box}
      :where(.card-grid,.workflow-grid,.details-split,.featured,.footer-main,.hero-inner,.stats-grid,.process-grid){min-width:0}
      @media(max-width:760px){
        html,body{width:100%;overflow-x:clip!important}
        body{font-size:15px}
        main,section,article,footer{max-width:100%;min-width:0}
        .container,.wrap{width:calc(100% - 32px)!important;max-width:100%!important;margin-inline:auto}
        h1{font-size:clamp(32px,9vw,48px)!important;line-height:1.18!important;max-width:100%}
        h2{font-size:clamp(25px,7vw,36px)!important;line-height:1.25!important}
        h3{font-size:clamp(19px,5vw,25px)!important;line-height:1.3!important}
        p,li{line-height:1.8}
        img,video,iframe{max-width:100%!important}
        pre,code{max-width:100%;white-space:pre-wrap;overflow-wrap:anywhere}
        table{display:block;max-width:100%;overflow-x:auto}
        .hero-inner,.details-split,.featured,.footer-main,.workflow-grid,.card-grid,.card-grid.two,.stats-grid{grid-template-columns:minmax(0,1fr)!important}
        .hero-visual,.featured-media,.card-media{max-width:100%;min-width:0}
        .btnrow,.hero-actions,.product-actions{flex-wrap:wrap;max-width:100%}
        .btnrow>* ,.hero-actions>*{max-width:100%;min-width:0}
        header nav.tykairo-canonical-nav.open{display:flex!important}
      }
      @media(max-width:420px){
        .container,.wrap{width:calc(100% - 24px)!important}
        h1{font-size:clamp(29px,8.5vw,39px)!important}
        .section{padding-inline:0!important}
        .card-grid,.workflow-grid,.process-grid{grid-template-columns:minmax(0,1fr)!important}
        .hero{padding-inline:12px!important}
        button,.button,.pill-btn{white-space:normal;min-width:0}
      }

      header.topbar,header.site-header,header.top,header.site-head{
        position:fixed!important;top:14px!important;left:50%!important;right:auto!important;
        transform:translateX(-50%)!important;width:min(1560px,calc(100% - 40px))!important;
        height:82px!important;min-height:82px!important;box-sizing:border-box!important;
        z-index:1000!important;display:flex!important;align-items:center!important;
        justify-content:space-between!important;gap:22px!important;padding:0 28px!important;
        border:1px solid rgba(239,55,77,.38)!important;border-radius:17px!important;
        background:rgba(10,9,12,.96)!important;backdrop-filter:blur(22px)!important;
        box-shadow:0 12px 42px rgba(0,0,0,.42)!important;direction:ltr!important;
      }
      header.topbar>.nav,header.top>.nav,header.top>.wrap.nav{
        display:flex!important;align-items:center!important;justify-content:space-between!important;
        width:100%!important;max-width:none!important;height:100%!important;min-height:0!important;
        gap:22px!important;direction:ltr!important;
      }
      header .brand{
        display:flex!important;align-items:center!important;gap:13px!important;
        flex:0 0 225px!important;width:225px!important;min-width:225px!important;
        text-decoration:none!important;direction:ltr!important;white-space:nowrap!important;
      }
      header .brand img{width:48px!important;height:48px!important;max-width:48px!important;object-fit:contain!important;flex:0 0 48px!important}
      header .tykairo-brand-copy{display:flex!important;flex-direction:column!important;gap:3px!important;line-height:1!important}
      header .tykairo-brand-copy strong{font-size:19px!important;letter-spacing:.5px!important;color:#f5f2f4!important;font-weight:800!important}
      header .tykairo-brand-copy strong span{color:#ff334d!important}
      header .tykairo-brand-copy small{font-size:8px!important;letter-spacing:2px!important;color:#a99ca4!important;font-weight:700!important}
      header nav.tykairo-canonical-nav{
        display:flex!important;flex:1 1 auto!important;min-width:0!important;width:auto!important;
        flex-direction:row!important;justify-content:center!important;align-items:center!important;
        gap:clamp(9px,1.05vw,17px)!important;margin:0!important;padding:0!important;
        direction:ltr!important;white-space:nowrap!important;overflow:visible!important;
      }
      header nav.tykairo-canonical-nav a{
        display:inline-flex!important;align-items:center!important;justify-content:center!important;
        flex:0 0 auto!important;padding:12px 0!important;margin:0!important;
        color:#c9c1c7!important;font-size:11px!important;font-weight:650!important;
        line-height:1!important;text-decoration:none!important;white-space:nowrap!important;
        position:relative!important;direction:ltr!important;unicode-bidi:isolate!important;
      }
      header nav.tykairo-canonical-nav a:hover{color:#fff!important}
      header nav.tykairo-canonical-nav a[aria-current="page"]{color:#fff!important;font-weight:800!important}
      header nav.tykairo-canonical-nav a[aria-current="page"]:after{
        content:""!important;position:absolute!important;left:0!important;right:0!important;
        bottom:2px!important;height:3px!important;background:#f32948!important;border-radius:3px!important;
      }
      header .nav-actions,header .header-actions,header .navright{
        display:flex!important;align-items:center!important;justify-content:flex-end!important;
        flex:0 0 auto!important;gap:10px!important;direction:ltr!important;margin:0!important;
      }
      header .tykairo-shared-cta{
        order:1!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;
        min-height:44px!important;padding:0 19px!important;border-radius:11px!important;
        border:1px solid #ff5368!important;background:linear-gradient(110deg,#df1235,#ff334f)!important;
        color:#fff!important;font-size:12px!important;font-weight:800!important;
        text-decoration:none!important;white-space:nowrap!important;box-shadow:0 6px 22px #df123533!important;
      }
      header .lang-toggle,header .lang-btn,header .lang{
        order:2!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;
        min-width:44px!important;height:44px!important;padding:0 10px!important;
        border:1px solid #59434c!important;border-radius:10px!important;background:#171217!important;
        color:#fff!important;font-size:11px!important;font-weight:800!important;
      }
      header .menu-btn,header .menu-toggle,#thanksMenu{order:3!important;display:none!important}
      body{scroll-padding-top:112px!important}
      @media(max-width:1200px){
        header.topbar,header.site-header,header.top,header.site-head{gap:12px!important;padding:0 18px!important}
        header .brand{flex-basis:190px!important;width:190px!important;min-width:190px!important}
        header .brand img{width:42px!important;height:42px!important;flex-basis:42px!important}
        header .tykairo-brand-copy strong{font-size:16px!important}
        header nav.tykairo-canonical-nav{gap:9px!important}
        header nav.tykairo-canonical-nav a{font-size:10px!important}
        header .tykairo-shared-cta{padding:0 12px!important;font-size:11px!important}
      }
      @media(max-width:980px){
        header.topbar,header.site-header,header.top,header.site-head{top:8px!important;width:calc(100% - 20px)!important;height:68px!important;min-height:68px!important;padding:0 14px!important}
        header.topbar>.nav,header.top>.nav,header.top>.wrap.nav{gap:8px!important}
        header .brand{flex:1 1 auto!important;width:auto!important;min-width:0!important}
        header .brand img{width:40px!important;height:40px!important;flex-basis:40px!important}
        header .tykairo-brand-copy strong{font-size:15px!important}
        header .tykairo-brand-copy small{font-size:7px!important}
        header nav.tykairo-canonical-nav{display:none!important;position:absolute!important;top:calc(100% + 9px)!important;left:0!important;right:0!important;width:100%!important;max-height:70vh!important;overflow:auto!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:0!important;padding:10px!important;border:1px solid #58313d!important;border-radius:14px!important;background:#100d12!important;box-shadow:0 18px 48px #000b!important}
        header nav.tykairo-canonical-nav.open,header.topbar.nav-open nav.tykairo-canonical-nav{display:flex!important}
        header nav.tykairo-canonical-nav a{display:flex!important;width:100%!important;padding:13px 14px!important;font-size:13px!important;border-bottom:1px solid #ffffff12!important}
        header nav.tykairo-canonical-nav a[aria-current="page"]{background:#f3294818!important;border-radius:8px!important}
        header nav.tykairo-canonical-nav a[aria-current="page"]:after{left:0!important;right:auto!important;top:8px!important;bottom:8px!important;width:3px!important;height:auto!important}
        header .menu-btn,header .menu-toggle,#thanksMenu{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:42px!important;height:42px!important;border:1px solid #59434c!important;border-radius:10px!important;background:#171217!important;color:#fff!important;font-size:20px!important}
        header .tykairo-shared-cta{min-height:40px!important;padding:0 12px!important;font-size:10px!important}
        header .lang-toggle,header .lang-btn,header .lang{min-width:40px!important;height:40px!important}
      }
      @media(max-width:520px){
        header.topbar,header.site-header,header.top,header.site-head{width:calc(100% - 14px)!important;padding:0 9px!important}
        header .brand{gap:7px!important}
        header .brand img{width:34px!important;height:34px!important;flex-basis:34px!important}
        header .tykairo-brand-copy strong{font-size:13px!important}
        header .tykairo-brand-copy small{letter-spacing:1px!important;font-size:6px!important}
        header .tykairo-shared-cta{min-height:36px!important;padding:0 8px!important;font-size:9px!important}
        header .lang-toggle,header .lang-btn,header .lang{min-width:34px!important;height:36px!important;padding:0 6px!important}
        header .menu-btn,header .menu-toggle,#thanksMenu{min-width:36px!important;height:36px!important}
      }
    `;
    document.head.appendChild(style);
  }

  // Mobile menu handlers for page variants that do not have their own controller.
  const menuButton = header.querySelector(".menu-toggle,#thanksMenu");
  if (menuButton && menuButton.id !== "menuToggle" && !menuButton.dataset.tykairoMenuBound) {
    menuButton.dataset.tykairoMenuBound = "1";
    menuButton.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(opened));
      menuButton.setAttribute("aria-label", opened ? "Close navigation menu" : "Open navigation menu");
      menuButton.textContent = opened ? "×" : "☰";
    });
  }
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    header.classList.remove("nav-open");
    const button = header.querySelector(".menu-btn,.menu-toggle,#thanksMenu");
    button?.setAttribute("aria-expanded", "false");
    if (button && button.id !== "menuBtn") button.textContent = "☰";
  }));

})();