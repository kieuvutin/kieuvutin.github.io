const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());
 await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');
 // pick apple tree (index 0)
 await p.click('#chars .tile >> nth=0');
 console.log('errors so far',JSON.stringify(errs));
 console.log('need:',await p.evaluate(()=>P.nd&&P.nd.t),'| overlay',await p.evaluate(()=>!!$('act')&&$('act').querySelectorAll('#nib *').length>0),'| bubble',await p.textContent('#bub'));
 const ans=async(ok)=>{const t=await p.evaluate(()=>String(f(cur.a,cur.d)));for(const x of await p.$$('#opts .opt')){if(((await x.textContent())===t)===ok){await x.click();return}}};
 // wrong keeps the need
 const t0=await p.evaluate(()=>P.nd.t);await ans(false);console.log('after wrong: need same',await p.evaluate(()=>P.nd.t)===t0,'done',await p.evaluate(()=>P.nd.done));
 await p.click('#nx');console.log('next question keeps need',await p.evaluate(()=>P.nd.t)===t0);
 // correct performs the action
 await ans(true);console.log('after correct: done',await p.evaluate(()=>P.nd.done),'| scene elements',await p.evaluate(()=>$('fxg').children.length),'| nx disabled',await p.evaluate(()=>$('nx').disabled));
 await p.waitForTimeout(2600);console.log('nx enabled later',await p.evaluate(()=>!$('nx').disabled));
 await p.click('#nx');console.log('new need after action:',await p.evaluate(()=>P.nd.t+'/'+P.nd.done));
 // scene screenshots: each type at 3 timestamps
 const shot=async(kind,stage,need,tag)=>{
   await p.evaluate(([k,s,n])=>{P.mode=null;P.ph='care';P.kind=k;P.xp=[0,15,40,80,150][s]+(s===4?-1:0);render(false);nextQ();P.nd={t:n,done:0};needDraw();locked=false},[kind,stage,need]);
   await p.waitForTimeout(150);
   await p.evaluate(()=>careDo(true,false));
   for(const t of [900,1000,900]){await p.waitForTimeout(t);await p.screenshot({path:`/tmp/sc_${tag}_${Math.round(Date.now()/1000)%1000}.png`,clip:await p.evaluate(()=>{const r=$('pc').getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})})}
 };
 const names=[];
 const list=[['sun',3,'water'],['rose',3,'fert'],['tomato',3,'bug'],['cat',3,'bath'],['dog',3,'feed'],['unicorn',3,'drink'],['fish',3,'change'],['fish',3,'air'],['chick',0,'warm']];
 const fs=require('fs');
 for(const [k,s,n] of list){
   await p.evaluate(([k,s,n])=>{P.mode=null;P.ph='care';P.kind=k;P.xp=[0,15,40,80,150][s];P.nd=null;render(false);nextQ();P.nd={t:n,done:0};needDraw();locked=false},[k,s,n]);
   await p.waitForTimeout(200);
   const box=await p.evaluate(()=>{const r=$('pc').getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}});
   await p.screenshot({path:`/tmp/scn_${n}_0.png`,clip:box});
   await p.evaluate(()=>careDo(true,false));
   let at=0;for(const [i,t] of [[1,1100],[2,900],[3,900]]){await p.waitForTimeout(t);await p.screenshot({path:`/tmp/scn_${n}_${i}.png`,clip:box})}
   console.log(n,k,'scene els',await p.evaluate(()=>$('fxg')?$('fxg').children.length:0));
 }
 console.log('errors',JSON.stringify(errs));await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
