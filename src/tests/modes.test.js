const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const c=await b.newContext({viewport:{width:360,height:560}});const p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());
 await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=13');
 const nxc=async()=>{if(await p.isVisible('#pop'))await p.click('#pn');await p.evaluate(()=>{$('nx').disabled=false});await p.click('#nx')};
 const clickA=async(correct)=>{const t=await p.evaluate(()=>String(f(cur.a,cur.d)));for(const x of await p.$$('#opts .opt')){const tx=await x.textContent();if((tx===t)===correct){await x.click();return}}};
 // ---- 1. in-session retry spacing (count based)
 await p.evaluate(()=>{P.xp=0});
 const seq=[];
 await clickA(false);seq.push('WRONG:'+await p.evaluate(()=>cur.k));
 const wrongKey=await p.evaluate(()=>cur.k);
 let back=-1;
 for(let i=1;i<=9;i++){await nxc();const k=await p.evaluate(()=>[cur.k,!!cur.rev]);if(k[0]===wrongKey&&k[1]){back=i;break}await clickA(true)}
 console.log('wrong question returned after',back-1,'other questions (expect 3-4)');
 console.log('bubble text on retry:',await p.textContent('#bub'));
 await clickA(true);console.log('retry correct msg:',(await p.textContent('#msg')).replace(/\s+/g,' ').slice(0,90),'| rev left',await p.evaluate(()=>P.rev.length));
 // ---- 2. skill rises with correct answers, drops with wrong
 const sk0=await p.evaluate(()=>P.sk[1]);
 for(let i=0;i<14;i++){await nxc();await clickA(true)}
 const sk1=await p.evaluate(()=>P.sk[1]);
 const dist=await p.evaluate(()=>{const c=[0,0,0,0];for(let i=0;i<300;i++)c[gen(P).s]++;return c.slice(1)});
 console.log('skill',sk0.toFixed(2),'->',sk1.toFixed(2),'level mix after 14 correct',JSON.stringify(dist));
 await nxc();await clickA(false);await nxc();await clickA(false);
 console.log('after 2 wrong: cw',await p.evaluate(()=>P.cw),'skill',(await p.evaluate(()=>P.sk[1])).toFixed(2),'bubble:',await p.textContent('#bub'));
 await nxc();console.log('next question level (easier expected <=2):',await p.evaluate(()=>cur.s));await p.evaluate(()=>{window.__dbg=1});
 // ---- 3. promotion popup
 await p.evaluate(()=>{P.sk[1]=2.8;P.cs=5;offer={}});
 await clickA(true);await p.waitForTimeout(1200);
 console.log('promotion popup visible',await p.isVisible('#pop'),'|',await p.textContent('#ptx'));
 await p.click('#py');console.log('grade after accept',await p.evaluate(()=>P.grade));
 // ---- 4. table mode
 await p.click('#grades .tb');console.log('picker visible',await p.isVisible('#tbl'),'tiles',await p.evaluate(()=>document.querySelectorAll('#tgrid .tile').length));
 await p.click('#tgrid .tile >> nth=5');// bảng 7
 console.log('mode',await p.evaluate(()=>P.mode+'/'+P.tbl),'lvl:',(await p.textContent('#lvl')).trim());
 const forms=new Set(),tab=[];
 for(let i=0;i<40;i++){const info=await p.evaluate(()=>cur.t);tab.push(info);await clickA(true);if(i<39)await nxc()}await p.waitForTimeout(1300);
 console.log('all questions use table 7:',tab.every(t=>/\b7\b/.test(t)),'| sample:',tab.slice(0,6).join(' ; '));
 console.log('forms seen:',[...new Set(tab.map(t=>t.includes('?')?'missing':t.includes('÷')?'div':'prod'))].join(','));
 for(let i=0;i<80&&(await p.evaluate(()=>tbStat(7)[0]))<10;i++){await nxc();await clickA(true)}await p.waitForTimeout(1300);const st=await p.evaluate(()=>tbStat(7));console.log('mastered after 40 correct',st.join('/'),'| table-done popup',await p.isVisible('#pop'),await p.textContent('#ptx'));console.log('state before:',JSON.stringify(await p.evaluate(()=>({pop:!$('pop').classList.contains('hide'),nx:$('nx').style.visibility,locked:locked,xp:P.xp,fin:!$('done').classList.contains('hide')}))));try{await nxc()}catch(e){console.log('NX CLICK FAILED',JSON.stringify(await p.evaluate(()=>({pop:!$('pop').classList.contains('hide'),ptx:$('ptx').textContent,done:!$('done').classList.contains('hide'),game:!$('game').classList.contains('hide'),nx:$('nx').style.visibility,xp:P.xp,mode:P.mode,sk:P.sk}))));throw e}await clickA(true);await p.waitForTimeout(1300);console.log('popup after one more correct once table mastered:',await p.isVisible('#pop'),'|',await p.textContent('#ptx'));if(await p.isVisible('#pop'))await p.click('#pn');await nxc();
 // wrong in table mode comes back inside table mode only
  await clickA(false);const tk=await p.evaluate(()=>cur.k);let tb=-1;
 for(let i=1;i<=7;i++){await nxc();const r=await p.evaluate(()=>[cur.k,!!cur.rev]);if(r[0]===tk&&r[1]){tb=i;break}await clickA(true)}
 console.log('table wrong fact returned after',tb-1,'questions');
 // leave and re-enter: normal mode again
 await p.click('#game .tabbar .btn >> nth=2');await p.click('.kidrow >> nth=0 >> .kid');
 console.log('re-enter mode',await p.evaluate(()=>String(P.mode)));
 // layout
 const lay=await p.evaluate(()=>{const e=s=>document.querySelector('#game '+s).getBoundingClientRect();return{over:document.documentElement.scrollHeight>innerHeight,tabBottom:Math.round(e('.tabbar').bottom),chips:[...document.querySelectorAll('#grades button')].map(x=>Math.round(x.getBoundingClientRect().width)).join(',')}});
 console.log('layout',JSON.stringify(lay));await p.screenshot({path:'/tmp/tbl_game.png'});
 await p.click('#grades .tb');await p.screenshot({path:'/tmp/tbl_pick.png'});
 console.log('errors',JSON.stringify(errs));await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
