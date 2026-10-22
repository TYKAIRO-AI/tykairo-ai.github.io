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