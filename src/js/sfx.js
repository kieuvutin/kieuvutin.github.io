// ===== Âm thanh tổng hợp bằng WebAudio (không cần tải file) =====
var AC=null,MG=null,NB=null,BG={on:0,t:0};
function ac(){try{if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=1;MG.connect(AC.destination)}if(AC.state==="suspended")AC.resume();return AC}catch(e){return null}}
function tone(f,d,o){o=o||{};var a=ac();if(!a||DB.mute)return;try{var t=a.currentTime+(o.at||0),os=a.createOscillator(),g=a.createGain(),n=os,fl;os.type=o.type||"sine";os.frequency.setValueAtTime(f,t);if(o.to)os.frequency.exponentialRampToValueAtTime(o.to,t+d);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(o.v||.12,t+(o.a||.015));g.gain.exponentialRampToValueAtTime(.0001,t+d);
 if(o.lp){fl=a.createBiquadFilter();fl.type="lowpass";fl.frequency.value=o.lp;n.connect(fl);n=fl}n.connect(g);g.connect(MG);os.start(t);os.stop(t+d+.05)}catch(e){}}
function nbuf(){var a=ac(),n,b,d,i;if(!NB&&a){n=a.sampleRate*1.5;b=a.createBuffer(1,n,a.sampleRate);d=b.getChannelData(0);for(i=0;i<n;i++)d[i]=Math.random()*2-1;NB=b}return NB}
function noise(d,o){o=o||{};var a=ac(),b=nbuf();if(!a||!b||DB.mute)return;try{var t=a.currentTime+(o.at||0),s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain(),v=o.v||.08;s.buffer=b;s.loop=true;f.type=o.type||"bandpass";f.frequency.setValueAtTime(o.f||1200,t);if(o.to)f.frequency.linearRampToValueAtTime(o.to,t+d);f.Q.value=o.q||.8;
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+(o.a||.05));g.gain.setValueAtTime(v,t+Math.max(.06,d-(o.r||.15)));g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(MG);s.start(t,Math.random());s.stop(t+d+.05)}catch(e){}}
function rpt(n,fn){for(var i=0;i<n;i++)fn(i)}
function bub1(at){tone(R2(500,900),.07,{to:R2(900,1500),v:.07,at:at})}
function tweet(at){tone(2300,.07,{to:3100,v:.05,at:at,lp:5000});tone(2600,.06,{to:3300,v:.05,at:at+.1,lp:5000})}
function snd(t){var seq={ok:[[660,.1],[880,.16]],no:[[240,.22]],up:[[523,.1],[659,.1],[784,.1],[1047,.25]],goal:[[784,.12],[988,.12],[1175,.3]]}[t],at=0;if(!seq||DB.mute)return;
 seq.forEach(function(n){tone(n[0],n[1],{type:t==="no"?"triangle":"sine",v:.16,at:at});at+=n[1]*.9});bgmStart()}
// --- âm thanh của hoạt cảnh chăm sóc ---
var SFX={
 water:function(){noise(2.2,{at:.9,f:1800,to:900,q:.6,v:.06});rpt(6,function(i){tone(R2(200,320),.12,{to:R2(120,200),v:.05,at:1+i*.3})})},
 fert:function(){rpt(14,function(i){noise(.06,{at:1+i*.1,f:R2(2500,5000),q:1.5,v:.05})})},
 bug:function(){rpt(3,function(i){noise(.35,{at:.5+i*.38,type:"highpass",f:3500,v:.05})});tone(900,.3,{to:300,v:.07,at:1.5,type:"square",lp:2000})},
 bath:function(){noise(.9,{at:.2,f:2200,q:.5,v:.05});rpt(10,function(i){bub1(.8+i*.15)});noise(.9,{at:1.9,f:2200,q:.5,v:.05})},
 feed:function(){rpt(8,function(i){noise(.07,{at:.9+i*.17,type:"lowpass",f:900,v:.1})})},
 drink:function(){noise(.8,{at:.4,f:1500,v:.04});rpt(5,function(i){tone(R2(180,260),.12,{to:90,v:.07,at:1.5+i*.22})})},
 change:function(){SFX.water()},
 air:function(){rpt(18,function(i){bub1(.4+i*.14)})},
 warm:function(){[523,659,784].forEach(function(f,i){tone(f,.9,{type:"triangle",v:.06,at:.5+i*.25,lp:2500})})}};
function scSnd(t){try{if(SFX[t])SFX[t]()}catch(e){}}
// --- tiếng kêu từng bạn ---
var CRY={
 chick:function(){tone(1800,.07,{to:2400,v:.07,type:"square",lp:4000});tone(2200,.08,{at:.1,to:2600,v:.07,type:"square",lp:4000});tone(2000,.07,{at:.22,to:2500,v:.06,type:"square",lp:4000})},
 duck:function(){tone(420,.16,{to:300,type:"sawtooth",lp:900,v:.1});tone(400,.14,{at:.22,to:280,type:"sawtooth",lp:900,v:.1})},
 bird:function(){tone(1500,.5,{to:2800,type:"sawtooth",lp:3500,v:.07})},
 dragon:function(){tone(95,.7,{to:70,type:"sawtooth",lp:420,v:.16});noise(.6,{f:300,type:"lowpass",v:.1})},
 dino:function(){tone(140,.8,{to:60,type:"sawtooth",lp:500,v:.16});noise(.7,{f:250,type:"lowpass",v:.1})},
 unicorn:function(){[784,988,1175,1568].forEach(function(f,i){tone(f,.35,{type:"triangle",v:.07,at:i*.12,lp:3500})});tone(700,.4,{at:.5,to:1100,type:"triangle",v:.06})},
 cat:function(){tone(550,.45,{to:900,type:"triangle",lp:2500,v:.1});tone(900,.35,{at:.28,to:450,type:"triangle",lp:2500,v:.1})},
 dog:function(){tone(320,.12,{to:160,type:"sawtooth",lp:900,v:.14});tone(300,.12,{at:.22,to:150,type:"sawtooth",lp:900,v:.14})},
 fish:function(){tone(300,.08,{to:700,v:.1});tone(400,.08,{at:.12,to:800,v:.1});tone(350,.08,{at:.26,to:750,v:.08})}};
function cry(){var k=P&&P.kind;if(!k)return;if(isP(k)){noise(.5,{type:"highpass",f:3000,q:.4,v:.04});return}if(stg(P)===0){tone(1200,.03,{type:"square",v:.05});tone(1200,.03,{at:.15,type:"square",v:.05});return}try{(CRY[k]||CRY.cat)()}catch(e){}}
// --- nhạc nền dịu nhẹ (tự sinh, đổi theo ban ngày/ban đêm và mưa) ---
function bgmOn(){return!DB.mute&&!DB.nobgm&&!(navigator.webdriver&&!/[?&]bgm=1/.test(location.search))}
function bgmStart(){if(BG.on||!bgmOn())return;BG.on=1;bgmStep()}
function bgmStep(){var n,sc,f;if(!bgmOn()||document.hidden||!$("game")||$("game").className.indexOf("hide")>=0){BG.on=0;return}
 n=tod()==="night";sc=n?[196,220,262,294,330]:[262,294,330,392,440,523];f=pick(sc);
 tone(f,1.8,{type:"triangle",v:n?.02:.028,a:.3,lp:1600});if(Math.random()<.35)tone(f*1.5,1.3,{at:.55,type:"sine",v:.012,a:.3});
 if(wx()==="rain"&&Math.random()<.5)noise(2,{type:"highpass",f:6000,v:.006,a:.4});
 BG.t=setTimeout(bgmStep,n?2700:1900+Math.random()*900)}
