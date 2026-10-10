// ===== Thời tiết: mưa phía trước nhân vật, vũng nước, ánh sáng mặt trời/trăng, cây nghiêng theo nắng =====
function sunnyDay(){var t=tod();return wx()!=="rain"&&(t==="day"||t==="aft"||t==="dawn")}
function leanCls(){return P&&isP(P.kind)&&careOn()&&sunnyDay()?" lean":""}
function wxGround(){var h="",i;for(i=0;i<4;i++)h+='<i class="pud" style="left:'+(8+i*24+(i%2)*5)+'%;width:'+(30+i*6)+'px"></i>';
 for(i=0;i<9;i++)h+='<i class="spl" style="left:'+((i*11+5)%96)+'%;animation-delay:-'+(i*.23).toFixed(2)+'s"></i>';return h}
function wxLayers(skyH){var pc=$("pc"),r=$("rainf"),l=$("lt"),f=$("face"),t=tod(),w=wx(),p=sunPos(),i,h,bg,lean;if(!pc||!f)return;
 if(!l){l=document.createElement("div");l.id="lt";l.className="light";pc.appendChild(l)}
 if(!r){r=document.createElement("div");r.id="rainf";r.className="rainf";pc.appendChild(r)}
 l.style.height=skyH+"px";r.style.height=skyH+"px";
 bg=t==="night"?"rgba(110,140,255,.16)":w==="rain"?"rgba(140,160,185,.2)":t==="dawn"?"rgba(255,200,150,.26)":t==="aft"?"rgba(255,196,120,.28)":t==="dusk"?"rgba(255,140,110,.26)":"rgba(255,244,190,.24)";
 l.style.background="radial-gradient(ellipse 85% 75% at "+(p.x/3.2).toFixed(0)+"% 0%,"+bg+",transparent 72%)";
 if(w==="rain"){if(r.getAttribute("data-on")!=="1"){h="";for(i=0;i<18;i++)h+='<i class="rf" style="left:'+((i*29+7)%98)+'%;animation-delay:-'+(i*.09).toFixed(2)+'s;animation-duration:'+(.55+(i%4)*.1).toFixed(2)+'s"></i>';r.innerHTML=h;r.setAttribute("data-on","1")}}
 else if(r.getAttribute("data-on")==="1"){r.innerHTML="";r.setAttribute("data-on","0")}
 lean=sunnyDay()?(p.x-160)/160*4:0;f.style.setProperty("--lean",lean.toFixed(1)+"deg");
 if(!/grow|happy|perk|shk|eatk|swm|sadk|gulp|lpk|lsc|lgr|lstp|lswx|lpuf|lwalk|lhop|llook|lstr|lbask|lup|ljump|lgust/.test(f.className))f.className=idle()}
