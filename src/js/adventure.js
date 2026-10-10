// ===== Hành trình (phiêu lưu) =====
var WN=[["Rừng Xanh","#bfeeb4","#6fc46a","Nấm Quậy","#e5533d"],["Sa Mạc Vàng","#ffeab8","#e8c25c","Bọ Cạp Gồng","#c9806a"],["Đại Dương","#bfe3ff","#58aef5","Mực Khổng Lồ","#c58bf2"],["Núi Tuyết","#f2f8ff","#a9cdea","Người Tuyết Cau Có","#7fb3d5"],["Lâu Đài Mây","#ffe0ef","#ff8fb5","Rồng Mây","#ffb703"]];
var OB=[[["Cây cầu bị gãy","sửa cầu"],["Bụi gai chắn đường","dọn bụi gai"],["Con suối lạnh","xếp đá qua suối"],["Rương kho báu bị khóa","mở khóa rương"],["Hang dơi tối om","thắp đuốc"],["Cổng gỗ to","mở cổng"]],
[["Cơn bão cát","tìm đường"],["Giếng nước khô","kéo nước lên"],["Kim tự tháp","mở cửa đá"],["Rương kho báu bị khóa","mở khóa rương"],["Bạn lạc đà mệt","cho lạc đà ăn"],["Cổng cổ","mở cổng"]],
[["Sóng lớn","chèo thuyền"],["Rạn san hô","tìm lối đi"],["Cá nhỏ lạc mẹ","đưa cá về nhà"],["Rương kho báu bị khóa","mở khóa rương"],["Hang tối","soi đèn"],["Cổng vỏ sò","mở cổng"]],
[["Bão tuyết","đào đường"],["Cầu băng nứt","gia cố cầu"],["Hang gấu trắng","đi thật khẽ"],["Rương kho báu bị khóa","mở khóa rương"],["Dốc trơn","leo lên"],["Cổng băng","mở cổng"]],
[["Cầu vồng đứt","nối cầu vồng"],["Mây dày","thổi mây đi"],["Thang mây","leo thang"],["Rương kho báu bị khóa","mở khóa rương"],["Chuông thần","rung chuông"],["Cổng lâu đài","mở cổng"]]];
var NEED=[4,4,5,3,5,5,7],LVS=[1,1,2,2,2,3,3],NP=[[50,262],[140,240],[240,214],[150,176],[62,148],[150,108],[232,56]],advW=0;
function advLv(){var l=LVS[P.an.n];if(P.cw>=2)l=Math.max(1,l-1);return l}
function bossArt(w,m){var c=WN[w][4],s='<svg viewBox="0 0 100 100"><ellipse cx="50" cy="92" rx="26" ry="4" fill="#000" opacity=".12"/><path d="M26 30L22 10L40 24Z M74 30L78 10L60 24Z" fill="#ffd34d" stroke="#0003" stroke-width="1.5"/><path d="M22 84Q10 42 34 28Q50 22 66 28Q90 42 78 84Z" fill="'+c+'" stroke="#0003" stroke-width="2"/><ellipse cx="50" cy="70" rx="17" ry="12" fill="#fff" opacity=".35"/><circle cx="40" cy="50" r="7" fill="#fff"/><circle cx="60" cy="50" r="7" fill="#fff"/><circle cx="'+(m===0?42:40)+'" cy="52" r="3.5" fill="#2b2118"/><circle cx="'+(m===0?58:60)+'" cy="52" r="3.5" fill="#2b2118"/>';
 if(m===0)s+='<path d="M31 40L46 46M69 40L54 46" stroke="#2b2118" stroke-width="3" stroke-linecap="round"/><path d="M38 70Q50 62 62 70" stroke="#2b2118" stroke-width="3" fill="none" stroke-linecap="round"/>';
 else if(m===1)s+='<path d="M33 42H46M54 42H67" stroke="#2b2118" stroke-width="3" stroke-linecap="round"/><path d="M40 68H60" stroke="#2b2118" stroke-width="3" stroke-linecap="round"/>';
 else s+='<circle cx="33" cy="60" r="4.5" fill="#ff8fa3" opacity=".7"/><circle cx="67" cy="60" r="4.5" fill="#ff8fa3" opacity=".7"/><path d="M38 64Q50 78 62 64Z" fill="#7a2a2a" stroke="#2b2118" stroke-width="2" stroke-linejoin="round"/>';
 return s+'</svg>'}
function bossUpd(){var on=P.mode==="a"&&P.an&&P.an.n===6,s=$("bsc");s.classList.toggle("hide",!on);$("pc").classList.toggle("bossmode",on);if(!on)return;
 var r=P.an.got/P.an.need,m=r<.34?0:r<.8?1:2,k=P.an.w+"-"+m,a=$("bart");if(a.getAttribute("data-k")!==k){a.innerHTML=bossArt(P.an.w,m);a.setAttribute("data-k",k)}$("bhp").style.width=Math.round(r*100)+"%"}
function deco(w){var s="",i,x,y,c=WN[w][2];for(i=0;i<9;i++){x=20+i*34+(i%2)*9;y=[60,120,200,240,90,170,270,40,150][i];
 if(w===0)s+='<path d="M'+x+' '+y+'l-9 18h18z" fill="#2f8f4a" opacity=".35"/>';else if(w===1)s+='<ellipse cx="'+x+'" cy="'+y+'" rx="22" ry="7" fill="#c99a2e" opacity=".35"/>';
 else if(w===2)s+='<path d="M'+(x-14)+' '+y+'q7 -8 14 0t14 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>';else if(w===3)s+='<path d="M'+(x-12)+' '+(y+14)+'l12 -22l12 22z" fill="#fff" opacity=".8"/>';
 else s+='<ellipse cx="'+x+'" cy="'+y+'" rx="18" ry="8" fill="#fff" opacity=".65"/>'}return s}
function inner(svg){return svg.replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"")}
function wi(){var n=0;KEYS.forEach(function(k){n+=(P.gal&&P.gal[k])||0});return n%5}
function advMapOpen(){P.adv=P.adv||{w:wi(),n:0,st:{},fr:{}};advW=P.adv.w;show("adv")}
function grown(){if(P.ph!=="map"){P.ph="map";P.adv={w:wi(),n:0,st:{},fr:{}};P.mode=null;P.an=null;P.nd=null;save()}
 popAsk("Bạn nhỏ đã lớn rồi! Cùng đi phiêu lưu nào!","Đi thôi",advMapOpen,"Đi thôi",advMapOpen)}
function drawAdv(){var A=P.adv=P.adv||{w:0,n:0,st:{},fr:{}},w=advW,s,i,x,y,r,cu=-1,op,dn,k,j,txt;
 function isOp(i){return w<A.w||i<=A.n}function isDn(i){return(A.st[w+"-"+i]||0)>0}
 for(i=0;i<7&&cu<0;i++)if(isOp(i)&&!isDn(i))cu=i;
 $("atitle").textContent=CH[P.kind]+" · "+WN[w][0];$("aprev").innerHTML=ic("left",20);$("anext").innerHTML=ic("right",20);
 $("aprev").style.visibility="hidden";$("anext").style.visibility="hidden";
 $("aprev").onclick=function(){advW--;drawAdv()};$("anext").onclick=function(){advW++;drawAdv()};
 s='<svg viewBox="0 0 300 300"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+WN[w][1]+'"/><stop offset="1" stop-color="'+WN[w][2]+'"/></linearGradient></defs><rect width="300" height="300" rx="18" fill="url(#mg)"/>'+deco(w);
 s+='<polyline points="'+NP.map(function(p){return p.join(",")}).join(" ")+'" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>';
 for(i=0;i<7;i++){x=NP[i][0];y=NP[i][1];r=i===6?24:18;op=isOp(i);dn=isDn(i);
  s+='<g class="'+(op?"nd":"lk")+'" data-i="'+i+'"><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(dn?"#4caf50":op?"#fff":"#c9bfa9")+'" stroke="'+(i===cu?"#ff5c8a":"#0003")+'" stroke-width="'+(i===cu?4:2)+'"/>';
  if(i===6)s+='<svg x="'+(x-22)+'" y="'+(y-24)+'" width="44" height="44" viewBox="0 0 100 100">'+inner(bossArt(w,dn?2:0))+'</svg>';
  else s+='<text x="'+x+'" y="'+(y+5.5)+'" text-anchor="middle" font-size="16" font-weight="800" fill="'+(dn?"#fff":op?"#3a2d1c":"#8a7a62")+'">'+(i===3?"★":i+1)+'</text>';
  s+='</g>';
  if(dn)for(j=0;j<3;j++)s+='<path transform="translate('+(x-17+j*12)+' '+(y+r+1)+') scale(.55)" d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8z" fill="'+(j<A.st[w+"-"+i]?"#ffb703":"#fff")+'" stroke="#0003"/>'}
 if(cu>=0)s+=GR("pl",NP[cu][0],NP[cu][1],'<circle cx="'+NP[cu][0]+'" cy="'+NP[cu][1]+'" r="'+((cu===6?24:18)+6)+'" fill="none" stroke="#ff5c8a" stroke-width="3" stroke-dasharray="5 4"/>')+'<svg x="'+(NP[cu][0]-22)+'" y="'+(NP[cu][1]-60)+'" width="44" height="44" viewBox="0 0 100 100">'+inner(art(P.kind,stg(P)))+'</svg>';
 if(A.fr&&A.fr[w])s+='<svg x="12" y="12" width="46" height="46" viewBox="0 0 100 100">'+inner(bossArt(w,2))+'</svg>';
 $("amap").innerHTML=s+'</svg>';
 [].forEach.call(document.querySelectorAll("#amap .nd"),function(e){e.onclick=function(){advStart(+e.getAttribute("data-i"))}});
 txt=cu<0?"Bé đã hoàn thành thế giới này! Bấm vào chặng bất kỳ để chơi lại.":(cu===6?"Chặng cuối: bạn "+WN[w][3]+" đang cáu kỉnh. Giải đúng để làm bạn ấy vui lên và kết bạn!":"Chặng "+(cu+1)+": "+OB[w][cu][0]+". Giải "+NEED[cu]+" câu để "+OB[w][cu][1]+".");
 $("ainfo").textContent=txt}
function advStart(i){var ob=i===6?["Bạn "+WN[advW][3]+" đang cáu kỉnh","làm bạn ấy vui lên"]:OB[advW][i];P.mode="a";P.an={w:advW,n:i,got:0,wrong:0,need:NEED[i]};since=0;show("game");render(false);nextQ();bub(ob[0]+"! Giải "+NEED[i]+" câu để "+ob[1]+" nhé!")}
function advDone(){var A=P.adv,an=P.an,k=an.w+"-"+an.n,st=an.wrong<=0?3:an.wrong<=2?2:1,first=!(A.st[k]>0),bonus=st*2+(an.n===3?4:0),pts=first?bonus:Math.ceil(bonus/2),last=an.n===6;
 A.st[k]=Math.max(A.st[k]||0,st);if(last)A.n=7;else if(an.n===A.n)A.n++;
 P.xp+=pts;P.an=null;snd("goal");burst(18);save();
 if(last){finish();return}
 popAsk("Hoàn thành chặng! "+"★".repeat(st)+"☆".repeat(3-st)+" · +"+pts+" điểm","Về bản đồ",function(){advW=A.w;show("adv")},"Chặng tiếp",function(){advW=A.w;advStart(an.n+1)})}

function eye(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="2.6" fill="#fff"/><circle cx="'+(x-.6)+'" cy="'+(y+.4)+'" r="1.4" fill="#2b2118"/>'}
function bugArt(t,boss){var s,sm='<path d="M4 21Q8 24 12 21" stroke="#2b2118" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
 if(t===0)s='<circle cx="35" cy="23" r="5" fill="#8fd16a" stroke="#0002"/><circle cx="28" cy="22" r="6" fill="#7fcb5a" stroke="#0002"/><circle cx="19" cy="21" r="7" fill="#8fd16a" stroke="#0002"/><circle cx="10" cy="17" r="8.5" fill="#a8e07c" stroke="#0002"/>'+eye(7,15)+eye(13,15)+sm+'<path d="M7 9L4 3M13 9L16 3" stroke="#3f9a45" stroke-width="1.5" stroke-linecap="round"/><circle cx="4" cy="3" r="1.5" fill="#ff7aa2"/><circle cx="16" cy="3" r="1.5" fill="#ff7aa2"/>';
 else if(t===1)s='<circle cx="27" cy="14" r="11" fill="#d99a4e" stroke="#0002"/><path d="M27 14m-6 0a6 6 0 1 1 6 6" stroke="#a8692a" stroke-width="2" fill="none"/><path d="M4 28Q4 22 12 23H38Q38 29 30 29H8Q4 29 4 28Z" fill="#e8d9a8" stroke="#0002"/><circle cx="9" cy="21" r="5.5" fill="#efe3b8" stroke="#0002"/><path d="M7 17L5 9M12 17L14 9" stroke="#8a7a52" stroke-width="1.4"/>'+eye(5,8)+eye(14,8)+'<path d="M6 23Q9 25 12 23" stroke="#2b2118" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
 else if(t===2)s='<ellipse cx="24" cy="17" rx="14" ry="11" fill="#e5533d" stroke="#0002"/><path d="M24 6V28" stroke="#2b2118" stroke-width="1.5"/><circle cx="19" cy="14" r="2.2" fill="#2b2118"/><circle cx="29" cy="12" r="2.2" fill="#2b2118"/><circle cx="19" cy="22" r="2.2" fill="#2b2118"/><circle cx="29" cy="21" r="2.2" fill="#2b2118"/><circle cx="8" cy="19" r="6.5" fill="#3a2d1c"/>'+eye(6,17)+eye(11,17)+'<path d="M16 27L13 31M24 28V31M33 27L36 31" stroke="#2b2118" stroke-width="1.6" stroke-linecap="round"/>';
 else s='<ellipse cx="22" cy="21" rx="14" ry="6" fill="#8fd16a" stroke="#0002"/><path d="M30 21L36 9L40 24" stroke="#4aa24f" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="16" r="6.5" fill="#a8e07c" stroke="#0002"/>'+eye(6,14)+eye(11,14)+'<path d="M5 9L1 2M11 9L13 2" stroke="#3f9a45" stroke-width="1.3"/><path d="M5 19Q8 21 11 19" stroke="#2b2118" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
 return s+(boss?'<path d="M2 10L3 2L7 7L10 1L13 7L17 2L18 10Z" fill="#ffc83d" stroke="#e0a21a"/>':'')}

