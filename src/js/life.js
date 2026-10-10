// ===== Đời sống của bạn nhỏ giữa các câu hỏi (thử nhanh: ?life=1) =====
var LF={off:!!navigator.webdriver&&!/[?&]life=1/.test(location.search),until:0,t:0,poke:0,id:0};
var BFLY='<g class="l-wing" style="transform-origin:0px 0px"><ellipse cx="-4" cy="-2" rx="4.5" ry="3.2" fill="#ff9ecf"/><ellipse cx="4" cy="-2" rx="4.5" ry="3.2" fill="#ff9ecf"/><ellipse cx="-3" cy="2" rx="3" ry="2.4" fill="#ffd1e8"/><ellipse cx="3" cy="2" rx="3" ry="2.4" fill="#ffd1e8"/></g><rect x="-.6" y="-4" width="1.2" height="8" rx=".6" fill="#5a3a28"/>',
BIRD='<ellipse cx="0" cy="0" rx="6.5" ry="4.8" fill="#6aa6e8" stroke="#3f78b8" stroke-width=".7"/><circle cx="5" cy="-3" r="3.4" fill="#7fb6f0" stroke="#3f78b8" stroke-width=".7"/><path d="M8 -3L12 -2L8 -1Z" fill="#ff9a2e"/><circle cx="6" cy="-3.6" r=".9" fill="#2b2118"/><path d="M-6 0L-12 -3L-11 1Z" fill="#3f78b8"/><path d="M-1 -1Q-3 3 2 2" fill="#4f8fd0"/><path d="M-1 4.5V8M2 4.5V8" stroke="#a85f32" stroke-width="1"/>',
BEE='<ellipse cx="0" cy="0" rx="4.6" ry="3.2" fill="#ffd34d" stroke="#3a2d1c" stroke-width=".6"/><path d="M-1 -3V3M2 -3V3" stroke="#3a2d1c" stroke-width="1.3"/><circle cx="-4.6" cy="-.4" r="1.7" fill="#3a2d1c"/><g class="l-wing" style="transform-origin:0px -3px"><ellipse cx="-1" cy="-5" rx="2.4" ry="3" fill="#e8f6ff" opacity=".85"/><ellipse cx="2" cy="-5" rx="2.4" ry="3" fill="#e8f6ff" opacity=".85"/></g>';
function ovAny(){return["pop","pin"].some(function(i){var e=$(i);return e&&e.className.indexOf("hide")<0})}
function sleepy(){var h=nowH();return h>=20||h<5}
function sleepCls(){return P&&careOn()&&sleepy()?" sleepy":""}
function lifeOK(){var f=$("face");return!!P&&!LF.off&&careOn()&&!document.hidden&&$("game").className.indexOf("hide")<0&&!ovAny()&&Date.now()>LF.until&&!!$("lif")&&!/grow|happy|perk|shk|eatk|swm|sadk|gulp|lpk|lsc|lgr|lstp|lswx|lpuf|lwalk|lhop|llook|lstr|lbask|lup|ljump|lgust/.test(f.className)}
function mouthY(s){return 90-37*acx(s)}
function fd(x,y,i,r,col,vx,vy,t){return '<circle class="l-fade" style="--t:'+(t||1.4)+'s;--x:'+vx+'px;--y:'+vy+'px;animation-delay:'+(i*.08).toFixed(2)+'s" cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+col+'"/>'}
function zzg(d){var cy=anchorY(),i,h="";for(i=0;i<3;i++)h+='<text class="l-zz" style="animation-delay:'+(d+i*.55).toFixed(2)+'s" x="'+(60+i*5)+'" y="'+(cy-2-i*3)+'" font-size="'+(7+i*2)+'" font-weight="800" fill="#7a8bd0">z</text>';return h}
var LV={
 butterfly:function(){return{d:4400,h:'<g class="l-bf" style="--ex:58px;--ey:'+(anchorY()-2)+'px">'+BFLY+'</g>',sn:function(){tone(1400,.08,{v:.04});tone(1760,.08,{at:.12,v:.04})}}},
 bird:function(){return{d:4400,h:'<g class="l-bird">'+BIRD+'</g>',sn:function(){tweet(.5);tweet(1.6);tweet(2.7)}}},
 bee:function(){var cy=anchorY()+4;return{d:3300,h:'<g class="l-orbit" style="transform-origin:50px '+cy+'px"><g transform="translate(74 '+cy+')">'+BEE+'</g></g>',sn:function(){rpt(6,function(i){tone(190+Math.random()*30,.4,{type:"sawtooth",lp:700,v:.03,at:i*.5})})}}},
 cloud:function(s){var ty=topY(s),cy=Math.max(10,ty-20),h='<g class="l-cloud"><g fill="#e9eef3" stroke="#c3ced8" stroke-width=".8"><ellipse cx="50" cy="'+cy+'" rx="18" ry="7"/><ellipse cx="40" cy="'+(cy+2)+'" rx="10" ry="6"/><ellipse cx="60" cy="'+(cy+2)+'" rx="11" ry="6"/></g></g>',i;
  for(i=0;i<14;i++)h+='<g class="a-drp" style="--h:'+(84-cy-8)+'px;animation-delay:'+(.9+i*.12).toFixed(2)+'s"><path transform="translate('+(50+R2(-9,9)).toFixed(1)+' '+(cy+8)+')" d="M0 -3Q2.2 0 0 2.6Q-2.2 0 0 -3Z" fill="#4aa8ff"/></g>';
  return{d:4800,h:h+'<ellipse class="a-wet" style="animation-delay:1.3s" cx="50" cy="86" rx="24" ry="5" fill="#3b2a18"/>'+sparks(50,ty+6,3.2),sn:function(){noise(2.2,{at:.8,type:"highpass",f:4500,v:.04})},js:function(){setTimeout(function(){if(careOn())anim("perk")},2200)}}},
 peck:function(){return{d:1900,cls:"lpk",h:'<g class="l-fade" style="--t:1.8s;--y:-3px;animation-delay:.1s"><ellipse cx="64" cy="89" rx="1.8" ry="1.1" fill="#e8c14a"/><ellipse cx="70" cy="90" rx="1.8" ry="1.1" fill="#e8c14a"/><ellipse cx="58" cy="90.5" rx="1.8" ry="1.1" fill="#e8c14a"/></g>',sn:function(){rpt(3,function(i){tone(900,.04,{type:"square",lp:2500,v:.06,at:.2+i*.45})})}}},
 scratch:function(s){var y=90-48*acx(s),h="",i;for(i=0;i<5;i++)h+=fd(36,y,i,1.4,"#d8c7a0",-6-i*2,-4+i*2,1);return{d:1800,cls:"lsc",h:h,sn:function(){rpt(7,function(i){noise(.05,{at:.1+i*.2,type:"highpass",f:4000,v:.04})})}}},
 groom:function(s){return{d:2500,cls:"lgr",h:sparks(40,90-30*acx(s),.5),sn:function(){tone(95,2.2,{type:"sawtooth",lp:180,v:.05})}}},
 puff:function(s){var my=mouthY(s),h="",i;for(i=0;i<8;i++)h+=fd(56,my,i,2+i*.6,i<4?"#ffb703":"#ff7a2e",8+i*4,2+i*2,1.2);return{d:1300,cls:"lpuf",h:h,sn:function(){noise(1,{f:600,to:300,type:"lowpass",v:.12,a:.1})}}},
 sparkle:function(s){var y=anchorY()+4;return{d:2800,h:'<path class="l-arc" d="M28 '+y+'Q50 '+(y-28)+' 72 '+y+'" fill="none" stroke="#ff7aa2" stroke-width="3" stroke-linecap="round"/><path class="l-arc" style="animation-delay:.15s" d="M32 '+y+'Q50 '+(y-22)+' 68 '+y+'" fill="none" stroke="#ffd34d" stroke-width="3" stroke-linecap="round"/><path class="l-arc" style="animation-delay:.3s" d="M36 '+y+'Q50 '+(y-16)+' 64 '+y+'" fill="none" stroke="#6ec6ff" stroke-width="3" stroke-linecap="round"/>'+sparks(50,y-14,1.2),sn:function(){CRY.unicorn()}}},
 stomp:function(){var h="",i;for(i=0;i<6;i++)h+=fd(i<3?36:64,89,i%3+(i<3?0:2),3+i%3,"#efe6d2",(i<3?-1:1)*(8+i*2),-4,.9);return{d:1600,cls:"lstp",h:h,sn:function(){rpt(3,function(i){tone(70,.18,{to:40,v:.2,at:.2+i*.5})})}}},
 swim:function(s){var cy=90-30*acx(s);return{d:3300,cls:"lswx",h:bubbles(8,38,62,cy,.3),sn:function(){rpt(3,function(i){tone(320+i*30,.08,{to:720,v:.08,at:.3+i*.8})})}}},
 bubble:function(s){return{d:2500,h:bubbles(10,36,64,90-30*acx(s),.1),sn:function(){rpt(8,function(i){bub1(.1+i*.25)})}}},
 eggshake:function(){return{d:1200,cls:"shk",h:"",sn:function(){tone(1200,.03,{type:"square",v:.05,at:.1});tone(1100,.03,{type:"square",v:.05,at:.5})}}},
 zz:function(){return{d:3200,h:zzg(0),sn:function(){tone(130,.9,{to:100,v:.03,lp:300})}}},
 firefly:function(){var h="",i,x,y;for(i=0;i<5;i++){x=R2(20,80);y=R2(30,80);h+='<g class="l-ff" style="--x:'+R2(-12,12).toFixed(0)+'px;--y:'+R2(-12,6).toFixed(0)+'px;animation-delay:'+(i*.35).toFixed(2)+'s"><circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="3.6" fill="#fff59a" opacity=".3"/><circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="1.4" fill="#fff59a"/></g>'}return{d:4200,h:h}}};
function lifeDo(name){var b=LV[name](stg(P)),l=$("lif"),id;if(!l)return;l.innerHTML=b.h||"";if(b.cls)anim(b.cls,b.d);try{if(b.sn)b.sn();if(b.js)b.js()}catch(e){}
 LF.until=Date.now()+b.d+400;id=++LF.id;setTimeout(function(){var e=$("lif");if(LF.id===id&&e)e.innerHTML=""},b.d)}
function lifeTick(){clearTimeout(LF.t);LF.t=setTimeout(function(){try{if(lifeOK())lifeDo(pickBeh())}catch(e){}lifeTick()},sleepy()?R2(3000,5000):R2(5000,9000))}
function lifeStart(){if(!LF.off)lifeTick()}
var POKE=["Hi hi, nhột quá!","Mình thích bé lắm!","Bé ơi, mình khỏe re!","Cảm ơn bé đã chăm mình!","Chơi tiếp nào bé ơi!"];
function poke(){var l=$("lif");if(!P||!careOn()||!l||Date.now()-LF.poke<700)return;LF.poke=Date.now();
 if(sleepy()){bub("Zzz… ưm, mình đang ngủ mà! Chơi lúc trời sáng nhé!");tone(120,.5,{to:90,v:.04});l.innerHTML=zzg(0);LF.until=Date.now()+1800;return}
 cry();l.innerHTML=hearts(50,anchorY(),0);anim(isP(P.kind)?"perk":"shk",1500);bub(pick(POKE));LF.until=Date.now()+1900;
 LF.id++;setTimeout(function(){var e=$("lif");if(e)e.innerHTML=""},1900)}
