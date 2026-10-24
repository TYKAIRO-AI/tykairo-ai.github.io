/* Contact-specific localization; native HTML form submission needs no JavaScript. */
(()=>{
 const message=document.getElementById('contact-message');
 const count=document.getElementById('contact-char-count');
 if(message&&count){const update=()=>count.textContent=message.value.length+' / 3000';message.addEventListener('input',update,{passive:true});update();}
 const translate=()=>{const lang=document.documentElement.lang==='ar'?'ar':'en';document.querySelectorAll('[data-ph-en][data-ph-ar]').forEach(el=>el.placeholder=el.dataset[lang==='ar'?'phAr':'phEn']);};
 translate();
 const rootObserver=new MutationObserver(translate);
 rootObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();