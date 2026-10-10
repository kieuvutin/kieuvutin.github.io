function rk(x){return x.k||x.t}
function skill(){P.sk=P.sk||{};var v=P.sk[P.grade],r,a;if(v==null){r=P.rc||[];a=r.length?r.reduce(function(x,y){return x+y},0)/r.length:0;v=r.length>=6?(a>=.85?2.2:a<=.5?1.1:1.5):1.3;P.sk[P.grade]=v}return v}
function adj(ok,s){var v=skill();if(ok){v+=s>=v-.3?.06:.025;if(P.cs%5===0)v+=.08}else v-=s<=v+.3?.3:.12;P.sk[P.grade]=Math.max(1,Math.min(3,v))}
function mset(k,ok){P.mt=P.mt||{};var m=P.mt[k]||0;P.mt[k]=ok?Math.min(3,m+1):Math.max(0,m-1)}
function anchorY(){var s=stg(P);return isP(P.kind)?topY(s)+2:s===0?26:90-68*acx(s)}
var BUB=null;function bub(t){var e=$("bub"),pc=$("pc"),f=$("face"),tl=$("bubtl"),pr,fr,w,h,tx,ty,l,tp,side;$("bubt").textContent=t;e.classList.add("on");
 e.style.maxWidth="";pr=pc.getBoundingClientRect();fr=f.getBoundingClientRect();w=e.offsetWidth;h=e.offsetHeight;
 if(fr.width>0){tx=fr.left-pr.left+fr.width/2;ty=fr.top-pr.top+fr.height*anchorY()/100;tp=ty-13-h;side=tp<6;
  if(!side){l=Math.max(6,Math.min(pr.width-w-6,tx-w*.7));tl.className="btl";tl.style.left=Math.max(16,Math.min(w-16,tx-l))+"px";tl.style.top=""}
  else{e.style.maxWidth=Math.max(110,tx-fr.width*.22-14)+"px";w=e.offsetWidth;h=e.offsetHeight;ty+=fr.height*.12;tp=Math.max(6,Math.min(pr.height-h-6,ty-h/2));l=Math.max(6,tx-fr.width*.22-w-8);tl.className="btl side";tl.style.top=Math.max(14,Math.min(h-14,ty-tp))+"px";tl.style.left=""}
  e.style.left=l+"px";e.style.top=tp+"px"}
 clearTimeout(BUB);BUB=setTimeout(function(){e.classList.remove("on")},3800)}
function popAsk(t,y,fn,n,fn2){$("pn").textContent=n||"Để sau";$("pn").onclick=function(){$("pop").classList.add("hide");if(fn2)fn2()};$("pa").innerHTML=art(P.kind,stg(P));$("ptx").textContent=t;$("py").textContent=y;$("py").onclick=function(){$("pop").classList.add("hide");fn()};$("pop").classList.remove("hide")}
function tbStat(n){var mt=P.mt||{},ks={},a,b,c=0,t=0,k;for(a=(n||2);a<=(n||9);a++)for(b=1;b<=10;b++)ks[fk(a,b)]=1;for(k in ks){t++;if(mt[k]>=3)c++}return[c,t]}
function tq(){var a=P.tbl||R(2,9),mt=P.mt||{},w=[],b,i,r,tot=0,m,fm,p,t,ans,s,ex,o,sk=[],j,pend={};
 (P.rev||[]).forEach(function(x){if(x.md==="t"&&x.tb&&x.dq>sq)pend[x.tb]=1});
 for(b=1;b<=10;b++){m=mt[fk(a,b)]||0;w.push(m>=3?.6:m===2?1.3:m===1?2.2:3);tot+=w[b-1]}
 for(j=0;j<12;j++){r=Math.random()*tot;for(i=0;i<9&&r>w[i];i++)r-=w[i];b=i+1;if(lastT!==a+"x"+b&&!pend[fk(a,b)])break}
 lastT=a+"x"+b;m=mt[fk(a,b)]||0;p=a*b;fm=m>=3?pick([0,1,2]):m===2?pick([0,0,1]):0;
 for(i=1;i<=b;i++)sk.push(a*i);
 if(fm===0){t=a+" × "+b;ans=p;s=1;ex=a+" × "+b+" = "+p+". Mẹo: đếm cách "+a+": "+sk.join(", ");o=o4(p,[a*(b+1),a*(b-1),(a+1)*b,(a-1)*b])}
 else if(fm===1){t=a+" × ? = "+p;ans=b;s=2;ex=p+" ÷ "+a+" = "+b+", vì "+a+" × "+b+" = "+p;o=o4(b,[b+1,b-1,b+2])}
 else{t=p+" ÷ "+a;ans=b;s=2;ex=p+" ÷ "+a+" = "+b+", vì "+a+" × "+b+" = "+p;o=o4(b,[b+1,b-1,b+2])}
 return{t:t,w:0,a:ans,d:0,o:o,fx:1,s:s,ex:ex,img:"",sp:"",k:"T"+t,lq:t,tb:fk(a,b),md:"t"}}

