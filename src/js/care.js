function needDraw(){var f=$("face"),a,s,ck,l,t,ex="";if(!f)return;a=$("act");
 if(!careOn()){if(a)a.innerHTML="";return}
 if(!a){a=document.createElement("div");a.id="act";a.className="act";f.appendChild(a)}
 s=stg(P);ck=ckind();
 if(!P.nd||P.nd.done||NEEDS[ck].indexOf(P.nd.t)<0){l=NEEDS[ck].filter(function(x){return x!==P.ln});if(!l.length)l=NEEDS[ck];P.nd={t:pick(l),done:0};bub(NM[P.nd.t])}
 t=P.nd.t;
 if(t==="bug"){var bp=BP[s];ex='<g id="bgg" style="transform-origin:'+bp[0]+'px '+bp[1]+'px"><g transform="translate('+(bp[0]-9)+' '+(bp[1]-7)+') scale(.42)"><g class="bw" style="transform-origin:20px 16px">'+bugArt(0,0)+'</g></g></g>'}
 else if(t==="bath")ex=mud(s);
 if(!$("nib"))a.innerHTML='<svg viewBox="0 0 100 100"><g id="nib"></g><g id="nex"></g><g id="fxg"></g><g id="lif"></g></svg>';
 $("nib").innerHTML=needIcon(t);$("nex").innerHTML=ex;$("nex").setAttribute("class","");
 if(!/grow|happy|perk|shk|eatk|swm|sadk|gulp|lpk|lsc|lgr|lstp|lswx|lpuf|lwalk|lhop|llook|lstr|lbask|lup|ljump|lgust/.test(f.className))f.className=idle()}
var SCID=0;
function careDo(ok,up){var n=P.nd,s,sc,ni,id;if(!n||!$("fxg"))return;
 if(!ok){anim("sadk");return}
 if(n.done||up)return;n.done=1;P.ln=n.t;s=stg(P);sc=SCN[n.t](s);id=++SCID;
 ni=$("nib");if(ni)ni.innerHTML="";$("fxg").innerHTML=sc.h;if(sc.js)sc.js();scSnd(n.t);LF.until=Date.now()+sc.d+400;
 setTimeout(function(){if(SCID===id&&careOn()){anim(sc.re+" happy");cry()}},sc.rt);
  setTimeout(function(){if(SCID===id){var f=$("fxg");if(f)f.innerHTML=""}},sc.d+300)}
