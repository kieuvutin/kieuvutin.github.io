const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
 for(const [w,hh] of [[360,560],[375,600],[390,700]]){
 const p=await (await b.newContext({viewport:{width:w,height:hh}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=13');
 let worst=1e9;
 for(const g of [2,3,5])for(let i=0;i<300;i++){await p.evaluate(g=>{P.grade=g;since=0;P.seen=[];nextQ()},g);
   if(await p.evaluate(()=>!!cur.img&&cur.t.indexOf('tiền')>0||cur.t==='Đồng hồ chỉ mấy giờ?')){
     const m=await p.evaluate(()=>{const e=s=>document.querySelector('#game '+s).getBoundingClientRect();return[Math.round(e('.card.fit').height),document.documentElement.scrollHeight>innerHeight,Math.round(e('.tabbar').bottom)]});
     worst=Math.min(worst,m[0]);if(m[1])console.log('OVERFLOW',w,hh);break}}
 // after answering (nx visible, msg 3 lines)
 await p.evaluate(()=>{const o=document.querySelector('#opts .opt');o.click()});
 const m2=await p.evaluate(()=>{const e=s=>document.querySelector('#game '+s).getBoundingClientRect();return[Math.round(e('.card.fit').height),Math.round(e('#nx').bottom),Math.round(e('.tabbar').top)]});
 console.log(w+'x'+hh,'min pet card height before answer',worst,'| after answer [petH,nxBottom,tabTop]',JSON.stringify(m2),JSON.stringify(errs));
 if(w===360)await p.screenshot({path:'/tmp/small.png'});
 }await b.close()})();
