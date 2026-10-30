/* SuperStore web trial bridge — no export functionality or remote data transfer. */
(()=>{'use strict';
const ROOT='/superstore/builder/assets/';
const PREFIX='tykairo-superstore-web-v1:';
const LIST=PREFIX+'ids';
const maxProjects=8;
let defaultProject, template;
function clone(x){return JSON.parse(JSON.stringify(x));}
function get(k,otherwise){try{const v=localStorage.getItem(k);return v===null?otherwise:JSON.parse(v);}catch{return otherwise;}}
function put(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{throw Error('مساحة التخزين المحلي امتلأت. قلل حجم صور المنتجات؛ الحفظ على خادم مؤجل حتى تفعيل الخدمة.');}}
function ids(){return get(LIST,[]).filter(x=>typeof x==='string');}
function defaults(){let x=clone(defaultProject);x.id=crypto.randomUUID().replaceAll('-','').slice(0,16);return x;}
function validate(p){
 if(!p||typeof p!=='object'||Array.isArray(p))throw Error('ملف مشروع غير صالح');
 if(typeof p.name!=='string'||!p.name.trim())throw Error('اسم المتجر مطلوب');
 if(!Array.isArray(p.products)||p.products.length>3000)throw Error('المنتجات غير صالحة');
 if(!p.pro||typeof p.pro!=='object')throw Error('إعدادات المتجر غير صالحة');
 if(!/^[A-Za-z0-9_-]{1,64}$/.test(String(p.id||'')))throw Error('معرّف المشروع غير صالح');
 return clone(p);
}
async function ready(){
 if(!defaultProject){const r=await fetch(ROOT+'default-project.json');if(!r.ok)throw Error('تعذر تحميل القالب');defaultProject=await r.json();}
 if(!template){const r=await fetch(ROOT+'store-template.html');if(!r.ok)throw Error('تعذر تحميل محرك المعاينة');template=await r.text();}
}
function render(p){
 const data=JSON.stringify(p).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
 return template.replace('__SUPERSTORE_USER_DATA__',data);
}
function getProject(id){return get(PREFIX+'project:'+id,null);}
const pathToID=x=>x.substring(x.lastIndexOf('/')+1);
function allLeads(id){return get(PREFIX+'leads:'+id,[]);}
async function api(path,payload){
 await ready();
 if(path==='/api/default')return defaults();
 if(path==='/api/projects')return ids().map(id=>{const x=getProject(id);return x&&{id,name:x.name,count:x.products.length,modified:get(PREFIX+'updated:'+id,Date.now()/1000)};}).filter(Boolean).sort((a,b)=>b.modified-a.modified);
 if(path.startsWith('/api/project/')){const p=getProject(pathToID(path));if(!p)throw Error('المشروع غير موجود في هذا المتصفح');return validate(p);}
 if(path==='/api/validate')return validate(payload);
 if(path==='/api/save'){
  const p=validate(payload);const list=ids();
  if(!list.includes(p.id)){if(list.length>=maxProjects)throw Error('النسخة التجريبية تدعم 8 مشاريع محفوظة في المتصفح.');list.unshift(p.id);put(LIST,list);}
  put(PREFIX+'project:'+p.id,p);put(PREFIX+'updated:'+p.id,Date.now()/1000);
  return p;
 }
 if(path==='/api/render')return render(validate(payload));
 if(path==='/api/export')throw Error('التصدير المدفوع غير مفعل بعد. اطلع على الباقات.');
 if(path==='/api/shutdown')return {ok:true};
 if(path==='/api/collect'){
  const id=payload.projectId;if(!getProject(id))throw Error('المشروع غير موجود');
  const rows=allLeads(id);const record={id:crypto.randomUUID().replace(/-/g,''),projectId:id,createdAt:new Date().toISOString(),values:payload.values||{},formId:payload.formId,page:payload.page,utm:payload.utm||{},status:'new',test:true};
  rows.unshift(record);put(PREFIX+'leads:'+id,rows.slice(0,100));return {ok:true,id:record.id};
 }
 if(path.startsWith('/api/leads/'))return allLeads(pathToID(path));
 if(path==='/api/lead-status'){
  const rows=allLeads(payload.projectId);const item=rows.find(x=>x.id===payload.id);if(item)item.status=payload.status;
  put(PREFIX+'leads:'+payload.projectId,rows);return {ok:!!item};
 }
 if(path==='/api/leads-import'){
  const rows=allLeads(payload.projectId);
  for(const r of payload.rows||[])if(r.projectId===payload.projectId&&!rows.some(x=>x.id===r.id))rows.push({...r,test:true});
  put(PREFIX+'leads:'+payload.projectId,rows.slice(0,100));return {ok:true,count:rows.length};
 }
 throw Error('الوظيفة غير متاحة في النسخة التجريبية: '+path);
}
window.SuperStoreWeb={api};
})();