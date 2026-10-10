// ===== Thế giới: ngày/đêm và thời tiết theo giờ máy (thử nhanh: ?hour=21&weather=rain) =====
function nowH(){var m=location.search.match(/[?&]hour=(\d+)/),d;if(m)return+m[1];d=new Date();return d.getHours()+d.getMinutes()/60}
function tod(){var h=nowH();return h>=5&&h<7?"dawn":h>=7&&h<16?"day":h>=16&&h<18?"aft":h>=18&&h<19.5?"dusk":"night"}
function wx(){var m=location.search.match(/[?&]weather=(\w+)/),d,s,r;if(m)return m[1];d=new Date();s=d.getFullYear()*1e4+(d.getMonth()+1)*100+d.getDate()+Math.floor(nowH()/3)*977;r=(Math.sin(s*12.9898)*43758.5453)%1;if(r<0)r+=1;return r<.45?"sun":r<.7?"cloud":r<.85?"rain":"wind"}
function sunPos(){var h=nowH(),a;if(tod()==="night"){a=Math.min(1,((h-19+24)%24)/10);return{x:30+260*a,y:96-64*Math.sin(Math.PI*a),moon:true}}a=Math.max(0,Math.min(1,(h-5)/14));return{x:26+268*a,y:100-72*Math.sin(Math.PI*a),moon:false}}
function skySvg(vh){vh=vh||160;var t=tod(),w=wx(),p=sunPos(),x=p.x.toFixed(0),y=p.y.toFixed(0),s='<svg viewBox="0 0 320 '+vh+'" preserveAspectRatio="xMidYMid slice">',i,cx,cy,nc,cc,col,day=t!=="night";
 if(t==="dawn"||t==="dusk")s+='<ellipse cx="160" cy="150" rx="210" ry="46" fill="'+(t==="dawn"?"#ffc79a":"#ff9a7a")+'" opacity=".5"/>';
 if(!day&&w!=="rain"){for(i=0;i<24;i++)s+='<circle class="w-twk" style="animation-delay:-'+(i*.37).toFixed(2)+'s" cx="'+((i*53+17)%320)+'" cy="'+((i*37+9)%90)+'" r="'+(i%3?.9:1.5)+'" fill="#fff"/>';
  s+='<line class="w-shoot" x1="0" y1="0" x2="-20" y2="-8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><circle class="w-pulse" style="transform-origin:'+x+'px '+y+'px" cx="'+x+'" cy="'+y+'" r="22" fill="#fff6c9" opacity=".18"/><circle cx="'+x+'" cy="'+y+'" r="13" fill="#fff6c9"/><circle cx="'+(+x+6)+'" cy="'+(y-3)+'" r="11" fill="#2c3a66"/>'}
 else if(day&&w!=="rain"){col=t==="day"?"#ffe27a":"#ffb36b";
  if(w==="sun"||w==="wind"){s+='<g class="w-spin" style="transform-origin:'+x+'px '+y+'px">';for(i=0;i<12;i++)s+='<path transform="rotate('+(i*30)+' '+x+' '+y+')" d="M'+x+' '+y+'L'+(+x-5)+' '+(y-40)+'L'+(+x+5)+' '+(y-40)+'Z" fill="#fff6b0" opacity=".26"/>';s+='</g>';
   for(i=0;i<3;i++)s+='<polygon class="w-beam" style="animation-delay:-'+(i*1.7).toFixed(1)+'s" points="'+(+x-4+i*3)+','+y+' '+(+x+4+i*3)+','+y+' '+(+x+30+i*46)+',160 '+(+x-30+i*46)+',160" fill="#fff3b0" opacity=".14"/>'}
  s+='<circle class="w-pulse" style="transform-origin:'+x+'px '+y+'px" cx="'+x+'" cy="'+y+'" r="23" fill="'+col+'" opacity=".3"/><circle cx="'+x+'" cy="'+y+'" r="'+(t==="day"?13:15)+'" fill="'+col+'"/>'}
 nc=w==="cloud"||w==="rain"?4:w==="wind"?3:2;cc=w==="rain"?"#7f8fa3":!day?"#6c7ba0":"#fff";
 for(i=0;i<nc;i++){cx=60+i*60;cy=20+(i%3)*20;s+='<g class="w-fly" style="animation-duration:'+(55+i*17)+'s;animation-delay:-'+(i*21+8)+'s"><g fill="'+cc+'" opacity="'+(w==="sun"?.75:.93)+'"><ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(w==="rain"?30:24)+'" ry="'+(w==="rain"?10:8)+'"/><ellipse cx="'+(cx-13)+'" cy="'+(cy+2)+'" rx="14" ry="7.5"/><ellipse cx="'+(cx+15)+'" cy="'+(cy+2)+'" rx="15" ry="7.5"/></g></g>'}
 if(day&&w!=="rain")for(i=0;i<2;i++)s+='<g class="w-fly" style="animation-duration:'+(16+i*7)+'s;animation-delay:-'+(i*9)+'s"><g transform="translate(0 '+(26+i*20)+')"><path class="w-flap" d="M-5 0Q-2.5 -4 0 0Q2.5 -4 5 0" fill="none" stroke="#4a5568" stroke-width="1.3" stroke-linecap="round"/></g></g>';
 if(w==="rain")for(i=0;i<34;i++)s+='<line class="w-rain" style="animation-delay:-'+(i*.11).toFixed(2)+'s;animation-duration:'+(.6+(i%4)*.12).toFixed(2)+'s" x1="'+((i*37)%330)+'" y1="0" x2="'+(((i*37)%330)-3)+'" y2="'+(8+i%3*3)+'" stroke="#e8f3ff" stroke-width="1.2" opacity=".75"/>';
 if(w==="wind")for(i=0;i<8;i++)s+='<g transform="translate(0 '+(20+i*16)+')"><path class="w-leaf" style="animation-delay:-'+(i*1.1).toFixed(1)+'s;animation-duration:'+(5+i%3*2)+'s" d="M0 0Q4 -4 8 0Q4 4 0 0Z" fill="'+(i%2?"#8fd16a":"#ffd34d")+'"/></g>';
 return s+'</svg>'}
function skyFit(){var s=$("sky"),pc=$("pc"),f=$("face"),pr,fr,vh,g,k;if(!s||!pc||!f)return;pr=pc.getBoundingClientRect();fr=f.getBoundingClientRect();
 if(!fr.width){s.style.display="none";return}
 s.style.display="";vh=Math.max(120,Math.round(320*pr.height/pr.width));
 k=tod()+wx()+Math.floor(nowH()*2)+"v"+Math.round(vh/12);if(s.getAttribute("data-k")!==k){s.setAttribute("data-k",k);s.className="sky tod-"+tod()+" wx-"+wx();s.innerHTML=skySvg(vh)+'<div class="skyg">'+(wx()==="rain"?wxGround():"")+'</div>'}
 g=s.querySelector(".skyg");if(g)g.style.height=Math.max(28,pr.height-(fr.top-pr.top+fr.height*.86))+"px";pc.classList.toggle("windy",wx()==="wind");wxLayers(pr.height)}
