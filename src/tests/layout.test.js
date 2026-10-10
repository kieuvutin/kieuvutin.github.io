const {chromium}=require('playwright');
const sizes=[[390,700],[360,560],[430,900]];
(async()=>{
 const b=await chromium.launch();let bad=0;
 for(const [w,hh] of sizes){
  const p=await b.newPage({viewport:{width:w,height:hh}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route('**/fonts.googleapis.com/**',r=>r.abort());
  const now=Date.now();const log=[];
  for(let d=0;d<5;d++)for(let i=0;i<14;i++)log.push({t:now-d*864e5-i*40000,g:1+(i%5),s:1+(i%3),ok:i%4?1:0,q:'7 × 8',w:0,r:'54',a:'56'});
  log.sort((a,b)=>a.t-b.t);
  const kids=[];for(let k=0;k<6;k++)kids.push({id:k+1,name:'Bé '+k,kind:['cat','apple','fish','dog','sun','dragon'][k],xp:20+k,grade:1+k%5,done:5,right:3,seen:[],gal:{apple:2},pending:false,log:k==0?log:[]});
  await p.addInitScript(d=>localStorage.setItem('behoctoan2',JSON.stringify(d)),{ps:kids,cur:1});
  await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
  const chk=async(name,sel)=>{
    const r=await p.evaluate((sel)=>{const de=document.documentElement;const vh=innerHeight;
      const bs=[...document.querySelectorAll(sel)].filter(e=>e.offsetParent!==null).map(e=>{const r=e.getBoundingClientRect();return [e.textContent.trim().slice(0,12),Math.round(r.top),Math.round(r.bottom)]});
      const sc=[...document.querySelectorAll('.scroll')].filter(e=>e.offsetParent!==null).map(e=>[e.id||e.className,e.scrollHeight>e.clientHeight+1]);
      return {pageOverflow:de.scrollHeight>vh+1,vh,bs,sc}},sel);
    const out=r.bs.some(x=>x[2]>r.vh||x[1]<0);
    if(r.pageOverflow||out){bad++}
    console.log(w+'x'+hh,name,'pageOverflow',r.pageOverflow,'btnOut',out,JSON.stringify(r.sc),JSON.stringify(r.bs.slice(-2)));
  };
  await chk('home','#home .btn-primary');
  await p.click('#home .btn-primary');await chk('setup','#setup .btn');await p.click('#setup .btn-ghost');
  await p.click('.kidrow >> nth=0 >> .btn');await chk('hist','#hist .btn-primary');
  if(w===390&&hh===700)await p.screenshot({path:'/tmp/hist.png'});
  await p.click('#hist .btn-primary');
  await p.click('.kidrow >> nth=0 >> .kid');await chk('game','#game .btn');
  await p.screenshot({path:'/tmp/game'+w+'.png'});
  await p.click('#game .tabbar .btn >> nth=0');await chk('gal','#gal .btn-primary');await p.click('#gal .btn-primary');
  await p.evaluate(()=>{P.xp=150;finish()});await chk('done','#done .btn');await p.click('#done .btn-primary');await chk('pick','#pgrid .tile');
  console.log('errors',JSON.stringify(errs));await p.close();
 }
 console.log('PROBLEMS',bad);await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
