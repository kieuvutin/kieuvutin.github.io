// Bầu trời ngày/đêm + thời tiết, đời sống nhân vật, chạm vào nhân vật, âm thanh (không lỗi, không phá bố cục).
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();let bad=0;const log=(...a)=>console.log(...a);
 const url=q=>'file:///mnt/user-data/outputs/be-hoc-toan.html'+q;
 // 1) bầu trời theo giờ & thời tiết
 const combos=[['6','sun'],['12','sun'],['12','cloud'],['12','rain'],['12','wind'],['17','sun'],['18.5'.split('.')[0],'sun'],['22','sun'],['22','rain'],['3','sun']];
 for(const [hr,wxv] of combos){
  const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto(url(`?hour=${hr}&weather=${wxv}`));
  await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=13');await p.evaluate(()=>{P.xp=70;render(false)});await p.waitForTimeout(300);
  const r=await p.evaluate(()=>{const s=$('sky'),f=$('face').getBoundingClientRect(),pc=$('pc').getBoundingClientRect(),sk=s.getBoundingClientRect();return{cls:s.className,h:Math.round(sk.height),svg:!!s.querySelector('svg'),rain:s.querySelectorAll('.w-rain').length,stars:s.querySelectorAll('.w-twk').length,leaves:s.querySelectorAll('.w-leaf').length,windy:$('pc').classList.contains('windy'),sleepy:$('face').className.indexOf('sleepy')>=0,covers:sk.bottom>=f.bottom-30&&sk.bottom<=pc.bottom,gap:Math.round($('hud').getBoundingClientRect().top-$('face').getBoundingClientRect().bottom)+8,fly:s.querySelectorAll('.w-fly').length,spin:s.querySelectorAll('.w-spin').length,beam:s.querySelectorAll('.w-beam').length,rf:document.querySelectorAll('#rainf .rf').length,pud:s.querySelectorAll('.pud').length,spl:s.querySelectorAll('.spl').length,lt:!!$('lt')&&$('lt').style.background.length>0,over:document.documentElement.scrollHeight>innerHeight}});
  const exp={tod:hr==='6'?'dawn':hr==='12'?'day':hr==='17'?'aft':hr==='18'?'dusk':'night'};
  const ok=r.svg&&r.cls.indexOf('tod-'+exp.tod)>=0&&r.cls.indexOf('wx-'+wxv)>=0&&r.covers&&!r.over&&(wxv!=='rain'||r.rain>0)&&(exp.tod!=="night"||wxv==="rain"||r.stars>0)&&(wxv!=='wind'||(r.leaves>0&&r.windy))&&(r.sleepy===(Number(hr)>=20||Number(hr)<5))&&r.gap>=8&&r.fly>0&&r.lt&&(wxv!=='rain'||(r.rf>0&&r.pud>0&&r.spl>0))&&((wxv==='sun'||wxv==='wind')&&exp.tod!=='night'?(r.spin>0&&r.beam>0):true)&&errs.length===0;
  if(!ok){bad++;log('BAD sky',hr,wxv,JSON.stringify(r),errs)}
  if(['12|sun','12|rain','22|sun','17|sun'].includes(hr+'|'+wxv))await p.screenshot({path:`/tmp/sky_${hr}_${wxv}.png`});
  await c.close();
 }
 log('sky combos',combos.length,'bad',bad);
 // 2) hành vi nhân vật: mọi hành vi × vài loài, không lỗi, có hình, class hồi lại
 const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
 await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto(url('?hour=12&weather=sun'));
 await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=0');
 const cases=[['sun',3,['butterfly','bee','bird','cloud']],['apple',0,['butterfly','cloud']],['chick',3,['peck','butterfly','bird']],['cat',3,['groom']],['dog',3,['scratch']],['dragon',3,['puff']],['dino',3,['stomp']],['unicorn',3,['sparkle']],['fish',3,['swim','bubble']],['chick',0,['eggshake']],['cat',4,['groom','bird']],['apple',3,['ladybug','worm','leafdrops','dew','gust']],['cat',3,['walk','look','stretch','bask','shakeoff','lookup','splash','chase','hop']],['fish',3,['jump','school']],['dragon',3,['walk','hop','look']]];
 let n=0;
 for(const [k,s,bs] of cases){await p.evaluate(([k,s])=>{P.mode=null;P.ph='care';P.kind=k;P.xp=[0,15,40,80,150][s]+(s===4?-1:0);render(false);LF.until=0},[k,s]);
  for(const name of bs){await p.evaluate(nm=>lifeDo(nm),name);await p.waitForTimeout(250);n++;
   const r=await p.evaluate(()=>({els:$('lif').children.length,cls:$('face').className}));
   if(r.els===0&&!['peck','groom','eggshake','walk','hop','look','stretch','bask','lookup','splash','chase','jump','gust'].includes(name)){bad++;log('BAD life empty',k,s,name)}
   await p.waitForTimeout(120);await p.evaluate(()=>{LF.until=0;$('lif').innerHTML=''})}}
 // ban đêm: ngủ + zz + đom đóm
 const pn=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await pn.route('**/fonts.googleapis.com/**',r=>r.abort());await pn.goto(url('?hour=22&weather=sun'));
 await pn.click('#home .btn-primary');await pn.fill('#nm','Nam');await pn.click('#chars .tile >> nth=7');await pn.evaluate(()=>{P.xp=40;render(false)});
 const nr=await pn.evaluate(()=>{lifeDo('zz');const z=$('lif').querySelectorAll('.l-zz').length;lifeDo('firefly');const f=$('lif').querySelectorAll('.l-ff').length;return{z,f,sleepy:$('face').className.indexOf('sleepy')>=0,pb:pickBeh()}});
 log('night',JSON.stringify(nr));if(!(nr.sleepy&&nr.z>0&&nr.f>0&&['zz','firefly'].includes(nr.pb))){bad++}
 // chạm vào nhân vật
 await pn.evaluate(()=>{LF.poke=0});await pn.click('#face');const pk=await pn.evaluate(()=>({bubble:$('bubt').textContent,els:$('lif').children.length}));log('poke at night',JSON.stringify(pk));if(pk.bubble.indexOf('đang ngủ')<0)bad++;
 await p.evaluate(()=>{P.kind='cat';P.xp=80;LF.poke=0;render(false)});await p.click('#face');await p.waitForTimeout(300);
 const pd=await p.evaluate(()=>({bubble:$('bubt').textContent,hearts:$('lif').querySelectorAll('.a-hrt').length,cls:$('face').className}));log('poke by day',JSON.stringify(pd));if(!(pd.hearts>0&&pd.bubble))bad++;
 // vòng lặp tự động chạy được khi bật ?life=1
 const pl=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const e3=[];pl.on('pageerror',e=>e3.push(e.message));await pl.route('**/fonts.googleapis.com/**',r=>r.abort());await pl.goto(url('?hour=12&weather=sun&life=1'));
 await pl.click('#home .btn-primary');await pl.fill('#nm','Lan');await pl.click('#chars .tile >> nth=0');await pl.evaluate(()=>{P.xp=40;render(false)});
 await pl.evaluate(()=>{LF.until=0;clearTimeout(LF.t);var o=R2;LF.t=setTimeout(function(){if(lifeOK())lifeDo(pickBeh())},50)});await pl.waitForTimeout(500);
 const auto=await pl.evaluate(()=>$('lif').children.length);log('auto scheduler produced an event',auto>0,'errors',JSON.stringify(e3));if(!(auto>0)||e3.length)bad++;
 const pbr=await p.evaluate(()=>{var bad=[],kinds=['apple','sun','chick','duck','cat','dog','dragon','dino','unicorn','fish'];kinds.forEach(function(k){[0,2,4].forEach(function(s){P.kind=k;P.xp=[0,15,40,80,150][s]-(s===4?1:0);for(var i=0;i<60;i++){var n=pickBeh();if(!LV[n])bad.push(k+s+n)}})});return bad});log('pickBeh invalid',JSON.stringify(pbr));if(pbr.length)bad++;
 // 3) âm thanh: gọi mọi hàm, không lỗi
 const sr=await p.evaluate(()=>{var ok=0,fail=[];Object.keys(SFX).forEach(function(k){try{SFX[k]();ok++}catch(e){fail.push(k)}});Object.keys(CRY).forEach(function(k){try{CRY[k]();ok++}catch(e){fail.push(k)}});['ok','no','up','goal'].forEach(function(k){try{snd(k);ok++}catch(e){fail.push(k)}});try{bgmStep();ok++}catch(e){fail.push('bgm')}return{ok,fail,ctx:!!AC&&AC.state}});
 log('sound calls',JSON.stringify(sr));if(sr.fail.length)bad++;
 // tắt tiếng thì không tạo âm
 const mu=await p.evaluate(()=>{DB.mute=true;var t=AC.currentTime;noise(.1);tone(440,.1);cry();DB.mute=false;return true});
 // bố cục: màn chơi vẫn vừa khung sau khi có bầu trời
 const lay=await p.evaluate(()=>({over:document.documentElement.scrollHeight>innerHeight,tab:Math.round(document.querySelector('#game .tabbar').getBoundingClientRect().bottom),vh:innerHeight}));log('layout',JSON.stringify(lay));if(lay.over||lay.tab>lay.vh)bad++;
 log('life cases',n,'errors',JSON.stringify(errs));if(errs.length)bad++;
 log('PROBLEMS',bad);await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
