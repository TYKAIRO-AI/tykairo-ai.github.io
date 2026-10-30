window.StudioCatalog=(()=>{
  const L=(ar,en)=>({ar,en});
  const packs=[
    ['home','للمنزل','Home living', ['مزهرية سيراميك','وسادة قطنية','مصباح مكتبي','ساعة حائط','طبق تقديم','سلة تخزين'],['Ceramic vase','Cotton cushion','Desk lamp','Wall clock','Serving tray','Storage basket'],[350,280,950,420,260,190]],
    ['fashion','أزياء','Fashion',['قميص قطني','حقيبة يومية','حذاء رياضي','وشاح خفيف','قبعة صيفية','جاكيت كلاسيكي'],['Cotton shirt','Everyday bag','Everyday sneakers','Light scarf','Summer hat','Classic jacket'],[490,690,1200,220,180,1650]],
    ['tech','إلكترونيات','Technology',['سماعة لاسلكية','ساعة ذكية','لوحة مفاتيح','ماوس لاسلكي','شاحن سريع','مكبر صوت'],['Wireless headphones','Smart watch','Keyboard','Wireless mouse','Fast charger','Portable speaker'],[1500,2200,890,450,390,1250]],
    ['beauty','عناية وجمال','Beauty',['كريم مرطب','سيروم للوجه','عطر يومي','غسول لطيف','مرطب شفاه','مجموعة هدية'],['Daily moisturizer','Face serum','Everyday fragrance','Gentle cleanser','Lip balm','Gift collection'],[380,590,990,270,150,1490]],
    ['coffee','قهوة ومذاق','Coffee',['قهوة محمصة','كوب حجري','مكبس قهوة','علبة شاي','زجاجة سفر','شوكولاتة داكنة'],['Roasted coffee','Stoneware mug','Coffee press','Tea selection','Travel bottle','Dark chocolate'],[320,190,650,240,420,120]],
    ['sport','رياضة','Sport',['سجادة تمرين','حبل قفز','زجاجة رياضية','حقيبة رياضة','دمبل خفيف','رباط مقاومة'],['Exercise mat','Jump rope','Sports bottle','Gym bag','Light dumbbell','Resistance band'],[450,180,260,590,650,220]],
    ['kids','أطفال','Kids',['لعبة تركيب','حقيبة مدرسية','علبة ألوان','دبدوب صغير','كتاب مصور','مكعبات خشبية'],['Building set','School backpack','Coloring set','Small teddy','Picture book','Wooden blocks'],[390,620,170,280,160,420]],
    ['digital','منتجات رقمية','Digital',['مخطط أسبوعي','دليل تصميم','قالب سيرة ذاتية','حزمة أيقونات','دفتر ميزانية','قالب عرض تقديمي'],['Weekly planner','Design guide','Resume template','Icon collection','Budget planner','Presentation template'],[90,150,120,180,100,220]]
  ].map(([id,ar,en,names,english,prices])=>({id,name:L(ar,en),products:names.map((name,i)=>({name,english:english[i],price:prices[i],category:ar,categoryEn:en,kind:id,index:i}))}));
  const templates=[
    ['natural','بوتيك طبيعي','Natural boutique','متجر','Store','linen','split','soft','classic','#29634e','home'],
    ['editorial','أزياء تحريرية','Fashion editorial','متجر','Store','clay','editorial','square','minimal','#775f4b','fashion'],
    ['tech','تكنولوجيا جريئة','Bold technology','متجر','Store','noir','cover','pill','bordered','#5866ce','tech'],
    ['beauty','جمال هادئ','Soft beauty','متجر','Store','bloom','center','pill','classic','#b95579','beauty'],
    ['coffee','ركن القهوة','Coffee corner','متجر','Store','clay','reverse','soft','bordered','#795339','coffee'],
    ['sport','حركة وطاقة','Move & perform','متجر','Store','ocean','editorial','shadow','classic','#227894','sport'],
    ['kids','عالم صغير','Little world','متجر','Store','bloom','split','pill','bordered','#af6d24','kids'],
    ['digital','متجر رقمي','Digital studio','متجر','Store','linen','minimal','outline','horizontal','#375caa','digital'],
    ['luxury','تشكيلة فاخرة','Luxury collection','متجر','Store','noir','center','square','minimal','#a78c53','fashion'],
    ['launch','إطلاق جديد','New launch','حملة','Campaign','ocean','cover','pill','classic','#3764c1','tech'],
    ['offer','عرض الموسم','Seasonal offer','حملة','Campaign','clay','split','shadow','bordered','#b45935','home'],
    ['single','منتج واحد','One great product','حملة','Campaign','linen','reverse','outline','minimal','#386852','beauty'],
    ['service','خدمة احترافية','Professional service','خدمات','Services','ocean','minimal','soft','classic','#285f8c',null],
    ['course','دورة تدريبية','Online course','تعليم','Education','linen','editorial','pill','classic','#52705a',null],
    ['event','حجز فعالية','Event registration','تسجيل','Signup','noir','center','outline','classic','#9b72c5',null],
    ['waitlist','قائمة انتظار','Coming soon','تسجيل','Signup','bloom','minimal','pill','classic','#a14d69',null],
    ['portfolio','ملف أعمال','Creative portfolio','خدمات','Services','clay','editorial','minimal','minimal','#7e5841',null],
    ['newsletter','مجتمع ونشرة','Community newsletter','تسجيل','Signup','linen','center','soft','classic','#317664',null]
  ].map(([id,ar,en,category,categoryEn,theme,heroLayout,buttonStyle,cardStyle,accent,pack])=>({id,name:L(ar,en),category:L(category,categoryEn),theme,heroLayout,buttonStyle,cardStyle,accent,pack}));
  const block=(type,title,body,extra={})=>({type,title:L(...title),body:L(...body),...extra});
  const pages=[
    {id:'about',name:L('من نحن','About us'),description:L('عرّف الناس بحكايتك وقيمك.','Tell your story and values.'),blocks:[block('banner',['حكايتنا تبدأ بالتفاصيل','Our story starts with the details'],['نؤمن أن الاختيارات الصغيرة تصنع فرقًا كبيرًا.','We believe small choices make a big difference.']),block('features',['ما الذي يميزنا؟','What makes us different?'],['اختيارات بعناية\nتواصل واضح\nاهتمام بالتفاصيل','Thoughtful selection\nClear communication\nAttention to detail'])]},
    {id:'contact',name:L('تواصل معنا','Contact us'),description:L('مساحة لاستقبال الأسئلة والطلبات.','A place for questions and requests.'),form:'contact',blocks:[block('text',['خلينا نتكلم','Let’s talk'],['اكتب لنا وسنتواصل معك بشأن رسالتك.','Send a message and we will get back to you.']),block('form',['',''],['',''])]},
    {id:'landing',name:L('صفحة عرض','Offer landing page'),description:L('قدّم عرضك بشكل واضح ومقنع.','Present an offer clearly.'),blocks:[block('banner',['اختيارك القادم يبدأ هنا','Your next favorite starts here'],['تعرّف على تفاصيل العرض والمنتجات المشاركة.','Explore the offer and participating products.'],{button:L('استكشف','Explore'),link:'#products'}),block('products',['',''],['','']),block('features',['تفاصيل العرض','Offer details'],['منتجات مختارة\nأسعار واضحة\nتأكيد مباشر مع المتجر','Selected products\nClear prices\nDirect store confirmation'])]},
    {id:'service',name:L('صفحة خدمة','Service page'),description:L('قدّم خدمتك واجمع طلبات التواصل.','Present your service and collect inquiries.'),form:'quote',blocks:[block('banner',['خدمة مناسبة لاحتياجك','A service that fits your needs'],['احكِ لنا عن فكرتك لنناقش الحل المناسب.','Tell us about your idea so we can discuss the right solution.']),block('features',['كيف نعمل؟','How we work'],['نفهم احتياجك\nنحدد نطاق العمل\nنتفق على الخطوة القادمة','Understand your needs\nDefine the scope\nAgree on the next step']),block('form',['',''],['',''])]},
    {id:'event',name:L('تسجيل فعالية','Event signup'),description:L('صفحة للحجز وطلبات المشاركة.','A page for event registrations.'),form:'event',blocks:[block('banner',['موعدنا مع تجربة جديدة','A new experience awaits'],['سجّل اهتمامك لتصلك تفاصيل الفعالية.','Register your interest to receive event details.']),block('form',['',''],['',''])]},
    {id:'newsletter',name:L('نشرة بريدية','Newsletter'),description:L('ابنِ قائمة المهتمين بمحتواك.','Build a list of people interested in your content.'),form:'newsletter',blocks:[block('text',['جديدنا يصل إليك','Stay in the loop'],['سجّل لتصلك تحديثاتنا بموافقتك.','Sign up to receive updates with your permission.']),block('form',['',''],['',''])]},
    {id:'faq',name:L('أسئلة شائعة','FAQ'),description:L('إجابات تساعد العميل على الاختيار.','Answers that help customers choose.'),blocks:[block('faq',['كل ما تحتاج معرفته','Everything you need to know'],['كيف أطلب؟|اختر المنتجات وأرسل طلبك عبر واتساب.\nمتى يصل الطلب؟|تواصل مع المتجر لتأكيد الموعد.','How do I order?|Choose products and send your order via WhatsApp.\nWhen will it arrive?|Contact the store to confirm delivery.'])]},
    {id:'game',name:L('العب واكسب','Play & win'),description:L('لعبة مطابقة بطاقات للحصول على عرض.','A matching game to unlock an offer.'),blocks:[block('game',['',''],['',''])]},
    {id:'portfolio',name:L('ملف أعمال','Portfolio'),description:L('عرض واضح لأعمالك وخدماتك.','Show your work and services.'),blocks:[block('banner',['أعمال نعتز بها','Work we are proud of'],['أضف صور أعمالك ومعلومات كل مشروع.','Add work images and project details.']),block('image',['مشروع مختار','Featured project'],['','']),block('text',['الفكرة والتنفيذ','The idea and execution'],['اكتب وصف المشروع والنتيجة هنا.','Describe the project and its outcome here.'])]},
    {id:'blank',name:L('صفحة فارغة','Blank page'),description:L('ابدأ بمكوناتك الخاصة.','Start with your own blocks.'),blocks:[block('text',['عنوان الصفحة','Page heading'],['ابدأ الكتابة هنا.','Start writing here.'])]}
  ];
  const field=(id,ar,en,type='text',required=true)=>({id,label:L(ar,en),type,required,options:L('','')});
  const forms={
    contact:{title:L('اكتب لنا','Send a message'),description:L('يسعدنا الرد على استفسارك.','We would love to answer your questions.'),fields:[field('name','الاسم','Name'),field('email','البريد الإلكتروني','Email','email'),field('message','رسالتك','Message','textarea')]},
    newsletter:{title:L('اشترك في النشرة','Join the newsletter'),description:L('تحديثات وعروض باختيارك.','Updates and offers, on your terms.'),fields:[field('name','الاسم','Name'),field('email','البريد الإلكتروني','Email','email')]},
    quote:{title:L('اطلب عرض سعر','Request a quote'),description:L('أخبرنا باحتياجك.','Tell us what you need.'),fields:[field('name','الاسم','Name'),field('phone','رقم الهاتف','Phone','tel'),field('details','تفاصيل الطلب','Request details','textarea')]},
    event:{title:L('سجّل اهتمامك','Register your interest'),description:L('سنرسل لك التفاصيل.','We will send you the details.'),fields:[field('name','الاسم','Name'),field('email','البريد الإلكتروني','Email','email'),field('phone','الهاتف','Phone','tel',false)]},
    booking:{title:L('احجز موعدًا','Request an appointment'),description:L('الموعد يُؤكد بعد التواصل.','Your appointment is confirmed after we contact you.'),fields:[field('name','الاسم','Name'),field('phone','الهاتف','Phone','tel'),field('preferred','الموعد المناسب','Preferred time')]}
  };
  return {packs,templates,pages,forms,L};
})();