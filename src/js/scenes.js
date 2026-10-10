SCN.water=function(s){var ty=topY(s)-8;return{h:pour(CAN,[-27.5,6.4],50,ty,84,"water")+'<ellipse class="a-wet" style="animation-delay:1.3s" cx="50" cy="86" rx="24" ry="5" fill="#3b2a18"/>'+sparks(50,topY(s)+6,2.7),d:3500,re:"perk",rt:2100}};
SCN.fert=function(s){var h=pour(SACK,[-14.7,-6.6],50,topY(s)-6,84,"fert")+'<ellipse class="a-wet" style="animation-delay:1.4s" cx="50" cy="86" rx="24" ry="5" fill="#4a3a1a"/>',i;
 for(i=0;i<6;i++)h+='<g class="a-rise" style="--x:'+R2(-6,6).toFixed(1)+'px;--t:1.6s;animation-delay:'+(1.9+i*.12).toFixed(2)+'s"><path transform="translate('+(44+i*2.4)+' 82)" d="M-2 0H2M0 -2V2" stroke="#4aa24f" stroke-width="1.6" stroke-linecap="round"/></g>';
 return{h:h+sparks(50,topY(s)+6,2.8),d:3600,re:"perk",rt:2200}};
SCN.bug=function(s){var bp=BP[s],bx=bp[0],by=bp[1],cx=bx-34,cy=by+4,i,y,h='<g class="a-bin" style="transform-origin:'+cx+'px '+cy+'px"><g class="a-pump" style="transform-origin:'+cx+'px '+cy+'px;animation-delay:.5s"><g transform="translate('+cx+' '+cy+')">'+BOTTLE+'</g></g></g>';
 for(i=0;i<10;i++){y=by-4.5+R2(-2,2);h+='<circle class="a-mist" style="transform-origin:'+(bx-23+i*2.2).toFixed(1)+'px '+y.toFixed(1)+'px;animation-delay:'+(.6+i*.06).toFixed(2)+'s" cx="'+(bx-23+i*2.2).toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(2+i*.3).toFixed(1)+'" fill="#d6f0ff" stroke="#9fd3f2" stroke-width=".4"/>'}
 return{h:h+sparks(bx,by,1.9),d:2900,re:"perk",rt:1700,js:function(){setTimeout(function(){var b=$("bgg");if(b)b.classList.add("a-bfall")},900)}}};
SCN.bath=function(s){var sc=acx(s),cy=90-(90-62)*sc,i,a,r,x,y,h='<g class="a-lamp"><g transform="translate(50 9)">'+SHOWER+'</g></g><g class="a-sh">';
 for(i=0;i<9;i++){x=50+(i-4)*5.2;h+='<line class="a-flow" x1="'+x.toFixed(1)+'" y1="16" x2="'+x.toFixed(1)+'" y2="86" stroke="#7cc4f5" stroke-width="1.5" stroke-dasharray="5 6" stroke-linecap="round"/>'}h+='</g>';
 for(i=0;i<18;i++){a=R2(0,6.28);r=Math.random();x=50+Math.cos(a)*r*24*sc;y=cy+Math.sin(a)*r*22*sc-4;h+='<circle class="a-fm" style="transform-origin:'+x.toFixed(1)+'px '+y.toFixed(1)+'px;animation-delay:'+R2(0,.4).toFixed(2)+'s" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(R2(3,6.5)*Math.max(.8,sc)).toFixed(1)+'" fill="#fff" stroke="#bfe3ff" stroke-width=".8"/>'}
 for(i=0;i<12;i++){a=i/12*6.28;h+='<circle class="a-fly" style="--x:'+(Math.cos(a)*30).toFixed(0)+'px;--y:'+(Math.sin(a)*22).toFixed(0)+'px;animation-delay:'+(2.55+R2(0,.15)).toFixed(2)+'s" cx="50" cy="'+cy.toFixed(1)+'" r="1.6" fill="#7cc4f5"/>'}
 return{h:h+sparks(40,cy-18,2.9)+sparks(60,cy-10,3.05),d:3700,re:"shk",rt:2500,js:function(){var e=$("nex");if(e)e.classList.add("a-mud")}}};
SCN.feed=function(s){var sc=acx(s),by=88,bx,hy,h="",i,x,cy;
 if(P.kind==="fish"){cy=90-(90-60)*sc;for(i=0;i<16;i++){x=50+R2(-22,22);h+='<g class="a-fall" style="--h:'+(cy-12+R2(0,10)).toFixed(0)+'px;--x:'+R2(-4,4).toFixed(1)+'px;--t:'+R2(1.2,1.9).toFixed(2)+'s;animation-delay:'+(.2+i*.1).toFixed(2)+'s"><rect x="'+x.toFixed(1)+'" y="4" width="2.6" height="1.6" rx=".8" fill="'+pick(["#ff9a3d","#ffd34d","#e5533d"])+'"/></g>'}
  return{h:h+hearts(50,cy-24,2.4),d:3100,re:"gulp",rt:900}}
 bx=Math.min(86,50+22*sc+14);hy=90-(90-48)*sc;
 h='<g class="a-bowl"><g transform="translate('+bx.toFixed(1)+' '+by+')">'+BOWL+'<g class="a-eat" style="transform-origin:0px -4px;animation-delay:.9s"><g transform="translate(0 -3)">'+food(P.kind)+'</g></g></g></g>';
 for(i=0;i<7;i++)h+='<circle class="a-crm" style="--x:'+R2(-10,10).toFixed(0)+'px;--y:'+R2(-12,-3).toFixed(0)+'px;animation-delay:'+(1.0+i*.17).toFixed(2)+'s" cx="'+(bx-12).toFixed(1)+'" cy="'+(by-9)+'" r="1" fill="#e8c14a"/>';
 return{h:h+hearts(50,hy-6,2.5),d:3300,re:"eatk",rt:800}};
SCN.drink=function(s){var sc=acx(s),bx=Math.min(86,50+22*sc+14),by=88,cx=bx+17.2,cy=by-26,hy=90-(90-48)*sc,h;
 h='<g class="a-bowl" style="animation-duration:3.4s"><g transform="translate('+bx.toFixed(1)+' '+by+')">'+BOWL+'<g class="a-lvl" style="transform-origin:0px -5px"><ellipse cx="0" cy="-5.5" rx="11" ry="2.3" fill="#5db6ff"/></g></g></g>'
  +'<g class="a-in" style="animation-duration:3.4s;transform-origin:'+cx.toFixed(1)+'px '+cy+'px"><g transform="translate('+cx.toFixed(1)+' '+cy+')">'+PITCH+'</g></g>'
  +'<line class="a-str" x1="'+bx.toFixed(1)+'" y1="'+(by-26)+'" x2="'+bx.toFixed(1)+'" y2="'+(by-7)+'" stroke="#6ec3ff" stroke-width="2.4" stroke-dasharray="4 3" stroke-linecap="round"/>'
  +[1.1,1.7,2.3].map(function(d){return '<ellipse class="a-rng" style="transform-origin:'+bx.toFixed(1)+'px '+(by-6)+'px;animation-delay:'+d+'s" cx="'+bx.toFixed(1)+'" cy="'+(by-6)+'" rx="9" ry="2" fill="none" stroke="#bfe3ff" stroke-width=".9"/>'}).join("");
 return{h:h+hearts(50,hy-6,2.8),d:3700,re:"eatk",rt:1500}};
SCN.change=function(s){var sc=acx(s),cy=90-(90-60)*sc;return{h:'<rect x="0" y="0" width="100" height="100" rx="6" fill="#bfe8ff" style="fill-opacity:.35" class="a-cone"/>'+pour(BUCKET,[-12.8,-.6],50,12,cy-6,"water")+bubbles(10,38,62,cy,1.2)+sparks(36,cy-14,2.4)+sparks(64,cy-8,2.6),d:3500,re:"swm",rt:1500}};
SCN.air=function(s){var h='<g class="a-bowl" style="animation-duration:3.6s"><g transform="translate(14 86)"><rect x="-7" y="-5" width="14" height="9" rx="2" fill="#7b8791" stroke="#505a63"/><circle cx="-2" cy="-1" r="1.4" fill="#a8d86b"/><rect x="2" y="-3" width="3" height="3" rx=".6" fill="#cfd6dc"/><path d="M0 -5Q0 -16 6 -22" fill="none" stroke="#505a63" stroke-width="1.6" stroke-linecap="round"/></g></g>';
 return{h:h+bubbles(22,16,26,68,.4)+bubbles(16,72,86,72,.8)+sparks(40,30,2.6),d:3700,re:"swm",rt:1000}};
SCN.warm=function(s){var h='<g class="a-lamp"><g transform="translate(50 12)">'+LAMP+'</g></g><polygon class="a-cone" style="fill-opacity:.38" points="40,18 60,18 78,88 22,88" fill="#ffe27a"/>',i;
 for(i=0;i<3;i++)h+='<path class="a-stm" style="animation-delay:'+(.6+i*.4)+'s" d="M'+(44+i*6)+' 58Q'+(46+i*6)+' 52 '+(44+i*6)+' 46" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>';
 return{h:h+hearts(50,44,1.8),d:3400,re:"shk",rt:1300}};
