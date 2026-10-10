const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const c=await b.newContext({viewport:{width:360,height:560}});const p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());
 await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=13');
 const ans=async(ok)=>{const t=await p.evaluate(()=>String(f(cur.a,cur.d)));for(const x of await p.$$('#opts .opt')){if(((await x.textContent())===t)===ok){await x.click();return}}};
 console.log('chips:',await p.evaluate(()=>[...document.querySelectorAll('#grades button')].map(x=>x.textContent||'icon').join('|')));
 await p.evaluate(()=>{P.xp=149;render(false)});
 await ans(true);await p.waitForTimeout(2300);
 console.log('xp',await p.evaluate(()=>P.xp),'| nx:',(await p.textContent('#nx')).trim());
 await p.click('#nx');
 console.log('popup:',await p.textContent('#ptx'),'| phase',await p.evaluate(()=>P.ph));
 await p.click('#py');
 console.log('map visible',await p.isVisible('#adv'),'| title',await p.textContent('#atitle'),'| world',await p.evaluate(()=>P.adv.w),'| nodes open',await p.evaluate(()=>document.querySelectorAll('#amap .nd').length),'| prev/next hidden',await p.evaluate(()=>$('aprev').style.visibility+'/'+$('anext').style.visibility));
 await p.screenshot({path:'/tmp/map_phase.png'});
 // reload during map phase returns to the map
 await p.reload();await p.click('.kidrow >> nth=0 >> .kid');console.log('after reload: map visible',await p.isVisible('#adv'));
 await p.click('#amap .nd');console.log('node started: mode',await p.evaluate(()=>P.mode),'| care overlay empty',await p.evaluate(()=>!$('act')||$('act').innerHTML===''));
 await p.click('#grades .chip >> nth=1');console.log('grade chip in map phase -> map',await p.isVisible('#adv'));
 await p.click('#amap .nd');
 for(let i=0;i<4;i++){await ans(true);if(i<3)await p.click('#nx')}
 console.log('node done btn:',(await p.textContent('#nx')).trim());await p.click('#nx');console.log('node popup:',(await p.textContent('#ptx')).slice(0,50),'| st',await p.evaluate(()=>JSON.stringify(P.adv.st)));
 await p.click('#pn');console.log('next node mode',await p.evaluate(()=>P.mode+':'+P.an.n));
 // boss
 await p.evaluate(()=>{P.adv.n=6;advW=P.adv.w;advStart(6)});
 for(let i=0;i<7;i++){await ans(true);await p.click('#nx')}
 await p.waitForTimeout(300);
 console.log('finished: done screen',await p.isVisible('#done'),'| gallery',await p.evaluate(()=>JSON.stringify(P.gal)),'| pending',await p.evaluate(()=>P.pending),'| text',(await p.textContent('#dtxt')).slice(0,70));
 await p.click('#done .btn-primary');await p.click('#pgrid .tile >> nth=2');
 console.log('new friend: phase',await p.evaluate(()=>P.ph),'xp',await p.evaluate(()=>P.xp),'kind',await p.evaluate(()=>P.kind),'| need',await p.evaluate(()=>P.nd&&P.nd.t));
 console.log('errors',JSON.stringify(errs));await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
