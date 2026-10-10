const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:700}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=13');
 const run=async(label,setup,n)=>{const pos=[0,0,0,0];let total=0;for(let i=0;i<n;i++){const r=await p.evaluate(setup);pos[r]++;total++}console.log(label.padEnd(26),'correct answer position counts',JSON.stringify(pos),'(n='+total+')')};
 const probe=()=>{nextQ();const bs=[...document.querySelectorAll('#opts .opt')];return bs.findIndex(x=>x.textContent===String(f(cur.a,cur.d)))};
 await run('normal grade 1',()=>{P.mode=null;P.grade=1;P.seen=[];since=0;return ('x',(function(){nextQ();const bs=[...document.querySelectorAll('#opts .opt')];return bs.findIndex(x=>x.textContent===String(f(cur.a,cur.d)))})())},800);
 await run('table 7',()=>{P.mode='t';P.tbl=7;since=0;nextQ();const bs=[...document.querySelectorAll('#opts .opt')];return bs.findIndex(x=>x.textContent===String(f(cur.a,cur.d)))},800);
 await run('table all',()=>{P.mode='t';P.tbl=0;since=0;nextQ();const bs=[...document.querySelectorAll('#opts .opt')];return bs.findIndex(x=>x.textContent===String(f(cur.a,cur.d)))},800);
 await run('grade 3 (clock/money/..)',()=>{P.mode=null;P.grade=3;P.seen=[];since=0;nextQ();const bs=[...document.querySelectorAll('#opts .opt')];return bs.findIndex(x=>x.textContent===String(f(cur.a,cur.d)))},800);
 // review path
 await run('review path (table)',()=>{P.mode='t';P.tbl=7;since=5;sq=99;P.rev=[{t:'7 × 8',w:0,a:56,d:0,s:1,ex:'x',o:[56,49,63,54],k:'T7 × 8',lq:'7 × 8',tb:'7x8',md:'t',n:1,dq:0}];nextQ();const bs=[...document.querySelectorAll('#opts .opt')];return bs.findIndex(x=>x.textContent==='56')},800);
 console.log('errors',JSON.stringify(errs));await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
