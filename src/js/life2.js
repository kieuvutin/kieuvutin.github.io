// ===== Thêm hoạt động tự nhiên cho nhân vật (đi dạo, nhảy, nhìn quanh, vươn vai, tắm nắng, rũ nước mưa, ngước nhìn mưa, nhảy vũng nước, bọ rùa, sâu đất, hạt mưa trên lá, sương mai, cá nhảy…) =====
function byC(s){return 90-28*acx(s)}
function ring(x,y,d){return '<ellipse class="a-rng" style="transform-origin:'+x+'px '+y+'px;animation-delay:'+d+'s" cx="'+x+'" cy="'+y+'" rx="6" ry="1.8" fill="none" stroke="#bfe3ff" stroke-width=".9"/>'}
function spray(x,y,n,col,spreadX,up,t,d0){var h="",i;for(i=0;i<n;i++)h+='<circle class="l-fade" style="--t:'+(t||.9)+'s;--x:'+(R2(-spreadX,spreadX)).toFixed(0)+'px;--y:'+(-R2(up*.4,up)).toFixed(0)+'px;animation-delay:'+((d0||0)+R2(0,.35)).toFixed(2)+'s" cx="'+x+'" cy="'+y+'" r="'+R2(1,2).toFixed(1)+'" fill="'+col+'"/>';return h}
function foot(n,gap,v){rpt(n,function(i){tone(170,.06,{type:"triangle",lp:520,v:v||.06,at:i*gap})})}
Object.assign(LV,{
 walk:function(){return{d:6600,cls:"lwalk",h:"",sn:function(){foot(12,.5)}}},
 hop:function(){return{d:1900,cls:"lhop",h:"",sn:function(){[.1,.7,1.3].forEach(function(a){tone(300,.12,{to:620,v:.06,at:a})})}}},
 look:function(){return{d:2900,cls:"llook",h:""}},
 stretch:function(){return{d:2700,cls:"lstr",h:"",sn:function(){tone(520,.7,{to:300,type:"triangle",lp:1500,v:.05})}}},
 bask:function(s){return{d:3600,cls:"lbask",h:sparks(50,anchorY()-6,.4)+hearts(50,anchorY()-4,1.2),sn:function(){[659,784].forEach(function(f,i){tone(f,.8,{type:"triangle",v:.04,at:.4+i*.3,lp:2200})})}}},
 shakeoff:function(s){return{d:1700,cls:"shk",h:spray(50,byC(s),16,"#7cc4f5",34,20,.9,.15),sn:function(){noise(.6,{type:"highpass",f:2500,v:.06,at:.1})}}},
 lookup:function(s){var y=anchorY(),h="",i;for(i=0;i<6;i++)h+='<g class="a-drp" style="--h:'+(14+i%2*4)+'px;animation-delay:'+(.3+i*.35).toFixed(2)+'s"><path transform="translate('+(44+i*3.2)+' '+(y-16)+')" d="M0 -3Q2.2 0 0 2.6Q-2.2 0 0 -3Z" fill="#4aa8ff"/></g>';return{d:2800,cls:"lup",h:h,sn:function(){noise(2,{type:"highpass",f:4500,v:.03,at:.2})}}},
 splash:function(s){return{d:1900,cls:"lhop",h:spray(38,89,8,"#9bd6ff",10,18,.8,.15)+spray(62,89,8,"#9bd6ff",10,18,.8,.7)+ring(38,90,.1)+ring(62,90,.65),sn:function(){[.12,.7].forEach(function(a){noise(.25,{at:a,f:1800,v:.07});bub1(a+.1)})}}},
 chase:function(s){var y=anchorY();return{d:4500,cls:"llook",h:'<g class="l-bf" style="--ex:66px;--ey:'+(y+8)+'px">'+BFLY+'</g>',sn:function(){tone(1500,.08,{v:.04});tone(1900,.08,{at:.15,v:.04})}}},
 gust:function(){var h="",i;for(i=0;i<7;i++)h+='<g class="l-fade" style="--t:2s;--x:'+(60+i*8)+'px;--y:'+(R2(-14,8)).toFixed(0)+'px;animation-delay:'+(i*.2).toFixed(2)+'s"><path transform="translate(24 '+(30+i*7)+')" d="M0 0Q4 -4 8 0Q4 4 0 0Z" fill="'+(i%2?"#8fd16a":"#ffd34d")+'"/></g>';return{d:2600,cls:"lgust",h:h,sn:function(){noise(2,{f:900,to:1800,v:.05,a:.4,r:.5})}}},
 ladybug:function(s){var top=topY(s)+8,dy=top-84;return{d:4700,h:'<g class="l-lady" style="--dy:'+dy+'px"><g transform="translate(54 84)"><ellipse rx="3" ry="2.4" fill="#e5533d"/><path d="M0 -2.4V2.4" stroke="#2b2118" stroke-width=".6"/><circle cx="-1.1" cy="-.6" r=".6" fill="#2b2118"/><circle cx="1.1" cy=".7" r=".6" fill="#2b2118"/><circle cx="-3" cy="0" r="1.2" fill="#2b2118"/></g></g>',sn:function(){tone(1700,.05,{v:.03,at:3.3,type:"square",lp:3000})}}},
 worm:function(){return{d:3300,h:'<g class="l-worm" style="transform-origin:62px 86px"><path d="M62 86Q59 80 62 75Q65 70 62 65" fill="none" stroke="#f0a0a8" stroke-width="3.4" stroke-linecap="round"/><circle cx="60.6" cy="65.6" r=".6" fill="#2b2118"/><circle cx="63.4" cy="65.6" r=".6" fill="#2b2118"/></g>',sn:function(){tone(900,.1,{to:1300,v:.04,at:.4});tone(1000,.1,{to:1400,v:.04,at:1.8})}}},
 leafdrops:function(s){var top=topY(s),h="",i,x,y;for(i=0;i<7;i++){x=40+R2(0,22);y=top+8+R2(0,18);h+='<g class="a-drp" style="--h:'+(y-top+8)+'px;animation-delay:'+(.2+i*.4).toFixed(2)+'s"><path transform="translate('+x.toFixed(1)+' '+(top-8)+')" d="M0 -3Q2.2 0 0 2.6Q-2.2 0 0 -3Z" fill="#4aa8ff"/></g>'+ring(+x.toFixed(1),+y.toFixed(1),.2+i*.4+.55)}return{d:3400,h:h,sn:function(){noise(3,{type:"highpass",f:4500,v:.035,at:.1})}}},
 dew:function(s){var top=topY(s);return{d:3200,h:sparks(44,top+14,.1)+sparks(58,top+22,.8)+sparks(50,top+6,1.5),sn:function(){[1568,1976,2349].forEach(function(f,i){tone(f,.25,{v:.03,at:.2+i*.7,lp:5000})})}}},
 jump:function(s){var y=90-30*acx(s);return{d:1800,cls:"ljump",h:ring(50,y+14,.95)+spray(50,y+10,12,"#9bd6ff",18,22,.9,.85),sn:function(){noise(.3,{at:.9,f:1500,v:.08});bub1(1)}}},
 school:function(){var h="",i,y;for(i=0;i<3;i++){y=24+i*18;h+='<g class="l-swimx" style="animation-delay:'+(i*.5)+'s"><g transform="translate(0 '+y+') scale(.7)"><ellipse rx="6" ry="3.4" fill="'+(i%2?"#6aa6e8":"#ff9a3d")+'"/><path d="M5 0L10 -3.5V3.5Z" fill="'+(i%2?"#4f8fd0":"#ff7a2e")+'"/><circle cx="-3" cy="-.8" r=".8" fill="#2b2118"/></g></g>'}return{d:4300,h:h,sn:function(){rpt(3,function(i){tone(300+i*40,.07,{to:650,v:.06,at:.3+i*.9})})}}}});
function pickBeh(){var s=stg(P),k=P.kind,w=wx(),t=tod(),r=w==="rain",pl=isP(k),sun=sunnyDay()&&w==="sun",l;
 if(sleepy())return pick(["zz","zz","firefly","firefly"]);
 if(pl){if(r)return pick(["leafdrops","leafdrops","worm"]);if(w==="wind")return pick(["gust","gust","ladybug"]);
  l=["butterfly","bee","bird","cloud","ladybug","worm","butterfly"];if(t==="dawn")l.push("dew","dew");return pick(l)}
 if(s===0)return"eggshake";
 if(k==="fish")return pick(["swim","swim","bubble","jump","school"]);
 l=({chick:["peck","hop"],duck:["peck","hop"],bird:["peck","hop"],cat:["groom","stretch"],dog:["scratch","stretch"],dragon:["puff","stretch"],dino:["stomp","stretch"],unicorn:["sparkle","hop"]}[k]||["groom"]).concat(["walk","look","look"]);
 if(r)return pick(l.concat(["shakeoff","lookup","splash","splash"]));
 if(sun)l=l.concat(["bask","bask"]);if(w!=="wind")l=l.concat(["butterfly","bird","chase"]);return pick(l)}
