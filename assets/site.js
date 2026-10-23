(()=>{const p=location.pathname;document.querySelectorAll('.menu a').forEach(a=>{if(a.getAttribute('href')===p)a.classList.add('active')});const lang=document.querySelector('#lang');let ar=false;lang?.addEventListener('click',()=>{ar=!ar;document.body.classList.toggle('ar',ar);document.documentElement.lang=ar?'ar':'en';lang.textContent=ar?'English':'العربية';document.querySelectorAll('[data-en]').forEach(e=>{e.textContent=e.dataset[ar?'ar':'en']})});if(!matchMedia('(prefers-reduced-motion:reduce)').matches){document.addEventListener('pointermove',e=>{document.body.style.setProperty('--mx',e.clientX+'px');document.body.style.setProperty('--my',e.clientY+'px')},{passive:true});document.querySelectorAll('.card').forEach(el=>{el.addEventListener('pointermove',e=>{if(matchMedia('(pointer:coarse)').matches)return;const r=el.getBoundingClientRect();el.style.transform='perspective(1100px) rotateY('+((e.clientX-r.left-r.width/2)/r.width*5)+'deg) rotateX('+(-(e.clientY-r.top-r.height/2)/r.height*5)+'deg)'});el.addEventListener('pointerleave',()=>el.style.transform='')})}})();
/* User-owned artwork: load only after the matching uploaded asset exists, never show broken images. */
(()=>{
  document.querySelectorAll('img[data-real-src]').forEach(el=>{
    const src=el.getAttribute('data-real-src');const check=new Image();
    check.onload=()=>{el.src=src;el.alt=el.alt.replace('Illustrative photograph for ','Official TYKAIRO-AI visual for ')};
    check.src=src;
  });
  document.querySelectorAll('[data-real-hero]').forEach(el=>{
    const src=el.getAttribute('data-real-hero');const check=new Image();
    check.onload=()=>el.style.setProperty('--hero-image','url("'+src+'")');
    check.src=src;
  });
  const brand=document.querySelector('.brand');
  if(brand){const check=new Image();check.onload=()=>{check.className='brand-image';check.alt='TYKAIRO-AI logo';brand.prepend(check)};check.src='/assets/brand-logo-owned.svg'}
})();
/* Consistent original brand hero across all public site pages */
(()=>{document.querySelectorAll('.hero:not(.visual-hero)').forEach(hero=>{hero.classList.add('visual-hero');const artwork=document.createElement('div');artwork.className='hero-art';artwork.setAttribute('aria-hidden','true');artwork.innerHTML='<div class="hero-orbit"></div><div class="hero-orbit"></div><img src="/assets/brand-logo-owned.svg" alt="">';hero.prepend(artwork)})})();

/* TYKAIRO navigation: shared pages and interactive concept gallery */
(()=>{const menu=document.querySelector('.menu');if(menu){const add=(href,label,after)=>{if(menu.querySelector('a[href="'+href+'"]'))return;const a=document.createElement('a');a.href=href;a.textContent=label;const anchor=menu.querySelector('a[href="'+after+'"]');if(anchor)menu.insertBefore(a,anchor);else menu.append(a)};add('/work-flow-n8n/','n8n Workflows','/technology/');add('/design-lab/','3D Design Lab','/contact/');const path=location.pathname;menu.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===path));}
const home=document.querySelector('main .hero .wrap');if(location.pathname==='/'&&home&&!document.querySelector('.design-preview-link')){const bar=document.createElement('a');bar.className='design-preview-link';bar.href='/design-lab/';bar.innerHTML='<span>NEW: INTERACTIVE 3D DESIGN LAB</span><strong>EXPLORE 3 FULL WEBSITE CONCEPTS ↗</strong>';home.append(bar)}
const lang=document.getElementById('lang');if(lang&&!document.querySelector('[data-en]')){lang.title='Full Arabic translation coming soon';lang.setAttribute('aria-label','Language preview (translation not available yet)');lang.addEventListener('click',()=>{document.documentElement.lang='en';document.body.classList.remove('ar');lang.textContent='العربية'},true)}
})();
