const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:700}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=13');
 const res={};let miss=0;
 for(let trial=0;trial<60;trial++){
  const r=await p.evaluate(()=>{P.xp=0;P.mode='t';P.tbl=[3,4,6,7,8,9][Math.floor(Math.random()*6)];P.rev=[];P.mt={};sq=0;since=0;nextQ();
   const ans=(ok)=>{const t=String(f(cur.a,cur.d));const bs=[...document.querySelectorAll('#opts .opt')];(bs.find(x=>(x.textContent===t)===ok)).click()};
   ans(false);const k=cur.k;let n=-1;
   for(let i=1;i<=10;i++){nextQ();if(cur.k===k&&cur.rev){n=i-1;break}ans(true)}
   return {n,left:P.rev.length,early:n<0&&!P.rev.some(x=>x.k===k)}});
  const key=r.n>=0?'back after '+r.n:(r.early?'asked again early & answered right (cleared)':'LOST (still in queue, never shown)');res[key]=(res[key]||0)+1;if(r.n<0)miss++;
 }
 console.log('questions between wrong and its retry (table mode):',JSON.stringify(res),'never returned:',miss,'errors',JSON.stringify(errs));
 await b.close();
})();
