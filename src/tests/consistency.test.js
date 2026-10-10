// Khung nhân vật (trời + nhân vật + HUD) phải CỐ ĐỊNH qua mọi loại câu hỏi; thẻ câu hỏi tự co, không vỡ giao diện.
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();let bad=0;
 for(const [w,h,tag,scheme] of [[390,844,'iphone','light'],[360,560,'small','light'],[430,932,'max','dark'],[375,667,'se','light']]){
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,colorScheme:scheme});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
  await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html?hour=19&weather=rain');
  await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=7');await p.evaluate(()=>{P.xp=21;render(false)});
  const rects=()=>p.evaluate(()=>{const r=s=>{const e=document.querySelector(s).getBoundingClientRect();return[e.left,e.top,e.width,e.height].map(v=>Math.round(v*2)/2).join(',')};const f=document.querySelector('#face');return{pc:r('#pc'),sky:r('#sky'),face:[f.offsetLeft,f.offsetTop,f.offsetWidth,f.offsetHeight].join(','),hud:r('#hud')}});
  const base=await rects();const types=[];let worst=0,maxF=0;
  for(let i=0;i<70;i++){
    const g=1+(i%5);
    await p.evaluate(g=>{P.grade=g;since=0;P.seen=[];P.mode=null;nextQ()},g);await p.waitForTimeout(25);
    const info=await p.evaluate(()=>{const q=document.querySelector('#game .qc'),opts=[...document.querySelectorAll('#opts .opt')].map(x=>x.getBoundingClientRect()),vh=innerHeight,tab=document.querySelector('#game .tabbar').getBoundingClientRect();
      return{kind:cur.img?'img':cur.w?'word':'plain',f:+q.getAttribute('data-f')||0,over:q.scrollHeight>q.clientHeight+1,pageOver:document.documentElement.scrollHeight>innerHeight,optsOut:opts.some(r=>r.bottom>vh||r.top<0),tab:tab.bottom>vh,hudIn:(()=>{const hh=$('hud').getBoundingClientRect(),pc=$('pc').getBoundingClientRect(),f=$('face').getBoundingClientRect();return hh.top>=pc.top&&hh.bottom<=pc.bottom+.5&&f.bottom<=hh.top+.5})()}});
    const r=await rects();const same=JSON.stringify(r)===JSON.stringify(base);
    types.push(info.kind);maxF=Math.max(maxF,info.f);
    if(!same||(info.over&&info.f<6)||info.pageOver||info.optsOut||info.tab||!info.hudIn){bad++;if(bad<6)console.log(tag,'BAD',i,JSON.stringify(info),same?'':JSON.stringify(r)+' vs '+JSON.stringify(base))}
    if(i%9===0){ // trả lời sai để hiện lời giải dài, kiểm tra lại
      await p.evaluate(()=>{const t=String(f(cur.a,cur.d));const b=[...document.querySelectorAll('#opts .opt')].find(x=>x.textContent!==t);b&&b.click()});await p.waitForTimeout(40);
      const r2=await rects(),i2=await p.evaluate(()=>{const q=document.querySelector('#game .qc');return{over:q.scrollHeight>q.clientHeight+1,f:+q.getAttribute('data-f')||0,pageOver:document.documentElement.scrollHeight>innerHeight}});
      if(JSON.stringify(r2)!==JSON.stringify(base)||(i2.over&&i2.f<6)||i2.pageOver){bad++;if(bad<6)console.log(tag,'BAD after answer',JSON.stringify(i2))}}
  }
  console.log(tag,w+'x'+h,scheme,'| scene frame',JSON.stringify(base.pc),'| kinds',[...new Set(types)].join(','),'| max shrink level',maxF,'| bad so far',bad);
  await p.evaluate(()=>{P.grade=2;since=0;nextQ()});await p.evaluate(()=>{cur.img||0});await p.waitForTimeout(200);await p.screenshot({path:`/tmp/fit_${tag}.png`});
  console.log(tag,'errors',JSON.stringify(errs));if(errs.length)bad++;await c.close();
 }
 console.log('PROBLEMS',bad);await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
