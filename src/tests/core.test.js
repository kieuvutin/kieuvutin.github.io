const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const c=await b.newContext({viewport:{width:360,height:560}});const p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept('0'));
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());
 await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=13');
 console.log('game visible',await p.isVisible('#game'));
 // wrong answer
 const wrong=async()=>{const t=await p.evaluate(()=>f(cur.a,cur.d));const o=await p.$$('#opts .opt');for(const x of o){if((await x.textContent())!==t){await x.click();return}}};
 await wrong();
 console.log('msg after wrong:',(await p.textContent('#msg')).slice(0,120));
 console.log('rev queued',await p.evaluate(()=>P.rev.length),'feed none on wrong',await p.evaluate(()=>document.querySelectorAll('.fd').length));
 // force review due and since>=3
 await p.evaluate(()=>{P.rev[0].dq=0});
 for(let i=0;i<12;i++){await p.evaluate(()=>{since=5});await p.click('#nx');if(await p.evaluate(()=>!!cur.rev))break;const t=await p.evaluate(()=>f(cur.a,cur.d));const o=await p.$$('#opts .opt');for(const x of o){if((await x.textContent())===t){await x.click();break}}}
 console.log('review shown',await p.evaluate(()=>!!cur.rev),await p.textContent('#lvl'));
 const right=async()=>{const t=await p.evaluate(()=>f(cur.a,cur.d));const o=await p.$$('#opts .opt');for(const x of o){if((await x.textContent())===t){await x.click();return}}};
 await right();
 console.log('feed shown on right',await p.evaluate(()=>document.querySelectorAll('.fd').length),'rev left',await p.evaluate(()=>P.rev.length));
 // goal: fake 9 answers today then answer right
 await p.click('#nx');
 await p.evaluate(()=>{const n=Date.now();for(let i=0;i<8;i++)P.log.push({t:n-1000+i,g:1,s:1,ok:1,q:'x'+i,w:0,r:'1',a:'1'});P.log.sort((a,b)=>a.t-b.t);P.xp=0});
 const xp0=await p.evaluate(()=>P.xp);await right();
 console.log('xp gained (incl goal bonus)',await p.evaluate(()=>P.xp)-xp0,'| msg',(await p.textContent('#msg')).slice(0,80),'| gs',await p.evaluate(()=>P.gs));
 await p.screenshot({path:'/tmp/g5.png'});
 const lay=await p.evaluate(()=>{const r=document.querySelector('#game .tabbar').getBoundingClientRect();return [Math.round(r.bottom),innerHeight,document.documentElement.scrollHeight>innerHeight]});
 console.log('tabbar bottom/vh/overflow',JSON.stringify(lay));
 // PIN flow
 await p.click('#game .tabbar .btn >> nth=2'); // Đổi bé
 await p.click('#home .btn-ghost');                // data (no pin yet)
 console.log('data open',await p.isVisible('#data'));
 await p.click('#bpin');for(const k of ['1','2','3','4']){await p.click('#kp .btn:text-is("'+k+'")')}await p.waitForTimeout(300);for(const k of ['1','2','3','4']){await p.click('#kp .btn:text-is("'+k+'")')}await p.waitForTimeout(300);
 console.log('pin set',await p.evaluate(()=>!!DB.pin),'overlay hidden',!(await p.isVisible('#pin')));
 await p.click('#data .card > .btn-primary');
 await p.click('#home .btn-ghost'); // should ask pin
 console.log('pin overlay shown',await p.isVisible('#pin'));
 for(const k of ['9','9','9','9'])await p.click('#kp .btn:text-is("'+k+'")');
 await p.waitForTimeout(300);console.log('wrong pin msg:',await p.textContent('#ps'),'data still hidden',!(await p.isVisible('#data')));
 for(const k of ['1','2','3','4'])await p.click('#kp .btn:text-is("'+k+'")');
 await p.waitForTimeout(300);console.log('right pin -> data',await p.isVisible('#data'));
 await p.click('#data .card > .btn-primary');
 // backup banner
 await p.evaluate(()=>{DB.created=Date.now()-9*864e5;DB.lastBackup=0;show('home')});
 console.log('banner:',(await p.textContent('#bk')).slice(0,60));
 // adaptive: all correct -> more 3-star
 const lv=await p.evaluate(()=>{P=DB.ps[0];P.rc=[1,1,1,1,1,1,1,1];let c=[0,0,0,0];for(let i=0;i<400;i++)c[gen(P).s]++;P.rc=[0,0,0,0,0,0,0,0];let d=[0,0,0,0];for(let i=0;i<400;i++)d[gen(P).s]++;return {good:c.slice(1),bad:d.slice(1)}});
 console.log('levels good/bad',JSON.stringify(lv));
 console.log('speech text:',await p.evaluate(()=>spk('7 × 8',0)),'|',await p.evaluate(()=>spk('12 + ? = 20',0)),'|',await p.evaluate(()=>spk('3,5 + 1,2',0)));
 console.log('errors',JSON.stringify(errs));await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
