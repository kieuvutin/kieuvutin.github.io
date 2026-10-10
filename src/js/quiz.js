function drawTbl(){var g=$("tgrid"),n;g.innerHTML="";for(n=2;n<=10;n++)(function(n){var N=n===10?0:n,st=tbStat(N),b=document.createElement("button"),mt=P.mt||{},h="",k;
 b.className="tile";if(N){for(k=1;k<=10;k++)h+='<i class="m'+(mt[fk(N,k)]||0)+'"></i>';b.innerHTML="<b>Bảng "+N+'</b><div class="mini">'+h+"</div><small>"+st[0]+"/"+st[1]+" phép</small>"}
 else b.innerHTML="<b>Tất cả</b><small>"+st[0]+"/"+st[1]+" phép</small>";
 b.onclick=function(){P.mode="t";P.tbl=N;since=0;show("game");render(false);nextQ()};g.appendChild(b)})(n)}
function nextQ(){if(P.xp>=MAX&&P.ph!=="map"){grown();return}
 if(P.mode==="a"&&P.an&&P.an.got>=P.an.need){advDone();return}
 var md=P.mode==="t"?"t":P.mode==="a"&&P.an?"a":"",due=(P.rev||[]).filter(function(r){return(r.md||"")===md&&(r.dq==null||r.dq<=sq)});
 if(due.length&&since>=1){var r=due[0];cur={t:r.t,w:r.w,a:r.a,d:r.d,s:r.s,ex:r.ex,o:r.o?sh(r.o):mkO(r.a,r.d),fx:r.o?1:0,img:r.img||"",sp:r.sp||"",k:rk(r),lq:r.lq||r.t,tb:r.tb,md:r.md,rev:1};since=0;bub("Câu này mình gặp lại rồi nè, bé làm được!")}
 else{cur=md==="t"?tq():gen(P,md==="a"?advLv():0);since++;if(P.cw>=2&&!md)bub("Mình làm câu dễ hơn một chút nhé!")}
 cur.o=sh(cur.o);if(careOn())needDraw();
 locked=false;var st=md==="t"?tbStat(P.tbl):0;
 $("lvl").innerHTML=(md==="a"?"Chặng "+(P.an.n+1)+"/7 · "+P.an.got+"/"+P.an.need+" ":md?"Bảng "+(P.tbl||"nhân")+" ("+st[0]+"/"+st[1]+") ":"Độ khó ")+stars(cur.s)+" · +"+cur.s+" điểm"+(cur.rev?" · <b>Làm lại</b>":"");
 var q=$("q"),tx=(cur.w||cur.t.indexOf("?")>=0)?cur.t:cur.t+" = ?";q.className="q"+(cur.w||cur.img?" w":"");if(cur.img)q.innerHTML='<div class="qi">'+cur.img+"</div><div>"+esc(tx)+"</div>";else q.textContent=tx;
 $("msg").textContent="";$("nx").style.visibility="hidden";var o=$("opts");o.innerHTML="";o.className="opts"+(cur.o.some(function(v){return String(f(v,cur.d)).length>6})?" txt":"");
 cur.o.forEach(function(v){var b=document.createElement("button");b.className="btn opt";b.textContent=f(v,cur.d);b.onclick=function(){answer(v,b)};o.appendChild(b)});
 fitQ();if(DB.auto)readQ()}
function todayN(p){var l=p.log||[],t=dk(Date.now()),n=0;for(var i=l.length-1;i>=0&&dk(l[i].t)===t;i--)n++;return n}
function answer(v,b){if(locked)return;locked=true;P.done++;sq++;var before=stg(P),bs=$("opts").children,ok=v===cur.a,td=dk(Date.now()),m="",i,mb="",l0=lvOf(skill()),it;
 if(!cur.tb){P.seen.push(cur.k||cur.t);if(P.seen.length>3000)P.seen=P.seen.slice(-3000)}
 P.log=P.log||[];P.log.push({t:Date.now(),g:P.grade,s:cur.s,ok:ok?1:0,q:cur.lq||cur.t,w:cur.w?1:0,r:f(v,cur.d),a:f(cur.a,cur.d)});if(P.log.length>5000)P.log=P.log.slice(-5000);
 P.rc=(P.rc||[]).concat([ok?1:0]).slice(-12);P.rev=P.rev||[];it=P.rev.filter(function(r){return rk(r)===rk(cur)})[0];
 if(ok){P.cs=(P.cs||0)+1;P.cw=0}else{P.cw=(P.cw||0)+1;P.cs=0}
 if(P.mode==="a"&&P.an){if(ok)P.an.got++;else P.an.wrong++}
 if(cur.tb)mset(cur.tb,ok);else adj(ok,cur.s);
 if(ok){var pts=cur.s+(cur.rev?1:0);b.classList.add("ok");P.xp+=pts;P.right++;snd("ok");if(it)P.rev=P.rev.filter(function(r){return r!==it});
  m='<span style="color:var(--pri-d)">'+ic("check",20)+" Giỏi lắm! +"+pts+" điểm</span>"+(cur.rev?"<br><span class='mute'>Thưởng thêm 1 điểm vì bé làm lại được!</span>":"");
  mb=cur.rev?"Bé làm được rồi! Mình tự hào lắm!":(!cur.tb&&lvOf(skill())>l0)?"Bé giỏi quá nên mình thử câu khó hơn nhé!":P.cs===3?"Ba câu liền! Giỏi ghê!":P.cs===5?"Năm câu liền! Mình lớn nhanh quá!":P.cs===10?"Mười câu liền! Bé siêu quá!":pick(["Giỏi quá!","Tuyệt vời!","Đúng rồi nè!","Mình thích lắm!"])}
 else{b.classList.add("no");for(i=0;i<bs.length;i++)if(bs[i].textContent===f(cur.a,cur.d))bs[i].classList.add("ok");snd("no");
  m="Chưa đúng, đáp án là <b>"+f(cur.a,cur.d)+"</b>.<br><span class='mute'>Cách giải: "+esc(cur.ex)+"</span>";
  if(!it){it={t:cur.t,w:cur.w,a:cur.a,d:cur.d,s:cur.s,ex:cur.ex,o:cur.fx?cur.o:null,img:cur.img,sp:cur.sp,k:cur.k,lq:cur.lq,tb:cur.tb,md:cur.tb?"t":P.mode==="a"?"a":"",n:0};P.rev.push(it);if(P.rev.length>30)P.rev.shift()}
  it.n=(it.n||0)+1;
  if(it.n>=3){P.rev=P.rev.filter(function(r){return r!==it});mb="Câu này hơi khó nhỉ, mình ôn lại vào hôm khác nhé!"}
  else{it.dq=sq+(cur.rev?R(4,5):R(3,4));mb=P.cw>=2?"Không sao đâu! Câu tới mình làm câu dễ hơn nhé!":"Không sao đâu! Lát nữa mình làm lại câu này nhé!"}}
 if(todayN(P)>=GOAL&&P.gd!==td){P.gd=td;P.gs=P.gl===dk(Date.now()-864e5)?(P.gs||0)+1:1;P.gl=td;var bo=5+({3:10,7:20,14:30}[P.gs]||0);P.xp+=bo;
  m+="<br><b>Đạt mục tiêu hôm nay! +"+bo+" điểm</b>"+(P.gs>1?" · chuỗi "+P.gs+" ngày":"");snd("goal");burst(14);mb="Bé đạt mục tiêu hôm nay rồi! Mình vui quá!"}
 $("msg").innerHTML=m;fitQ();bub(mb);save();var up=stg(P)>before;render(up);if(up)snd("up");if(careOn())careDo(ok,up);else if(ok&&!up){anim("happy");burst(6)}
 if(P.mode==="a"&&P.an&&P.an.n===6){bossUpd();var bt=$("bart");bt.className="art "+(ok?"bs-ok":"bs-no");setTimeout(function(){bt.className="art"},700)}
 var nx=$("nx"),fin=P.mode==="a"&&P.an&&P.an.got>=P.an.need;if(P.xp>=MAX&&P.ph!=="map")btn(nx,"Bạn nhỏ lớn rồi!","trophy");else if(fin)btn(nx,"Hoàn thành chặng!","trophy");else btn(nx,"Câu tiếp",0,"right");nx.style.visibility="visible";
 if(ok&&P.xp<MAX){
  if(!cur.tb&&P.grade<5&&P.sk[P.grade]>=2.75&&P.cs>=6&&!offer[P.grade]){offer[P.grade]=1;var tk1=cur,g1=P.grade;setTimeout(function(){if(cur!==tk1){delete offer[g1];return}popAsk("Bé làm rất giỏi Lớp "+P.grade+"! Mình thử sức Lớp "+(P.grade+1)+" nhé?","Thử Lớp "+(P.grade+1),function(){P.grade++;P.mode=null;save();render(false);nextQ()})},900)}
  if(cur.tb&&P.tbl&&tbStat(P.tbl)[0]===10&&!offer["t"+P.tbl]){offer["t"+P.tbl]=1;var tk2=cur,t2=P.tbl;setTimeout(function(){if(cur!==tk2){delete offer["t"+t2];return}popAsk("Bé đã thuộc cả bảng "+P.tbl+"! Chọn bảng khác để luyện nhé?","Chọn bảng",function(){show("tbl")})},900)}}}
function spk(t,w){if(!w&&t.indexOf("?")<0)t+=" = ?";t=t.replace(/×/g," nhân ").replace(/÷/g," chia ").replace(/−/g," trừ ").replace(/\+/g," cộng ").replace(/(\d),(\d)/g,"$1 phẩy $2").replace(/(\d+)\/(\d+)/g,"$1 phần $2").replace(/(\d)đ/g,"$1 đồng").replace(/%/g," phần trăm ").replace(/…/g," bao nhiêu ").replace(/=\s*\?/g," bằng bao nhiêu").replace(/=/g," bằng ");return w?t:t.replace(/\?/g," mấy ")}
function readQ(){try{if(!window.speechSynthesis||!cur)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(spk(cur.sp||cur.t,cur.w));u.lang="vi-VN";u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
var DROP='<svg viewBox="0 0 24 24"><path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0C19 10 12 2 12 2z" fill="#4aa8ff"/><path d="M9 15a3 3 0 0 0 3 3" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
COOK='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#d99a4e"/><circle cx="8" cy="9" r="1.7" fill="#6b4a2b"/><circle cx="15" cy="8" r="1.5" fill="#6b4a2b"/><circle cx="14" cy="15" r="1.8" fill="#6b4a2b"/><circle cx="8" cy="15" r="1.4" fill="#6b4a2b"/></svg>',
HEART='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z" fill="#ff6b8b"/></svg>';
function drawSnd(){$("snb").innerHTML=ic(DB.mute?"volx":"vol",20)}
function toggle(k){DB[k]=!DB[k];save();if(k==="mute"||k==="nobgm")bgmStart();drawSettings();if(P&&$("game").className.indexOf("hide")<0)drawSnd()}
function drawSettings(){$("bpin").textContent=DB.pin?"Đổi mã PIN":"Đặt mã PIN";$("bsnd").textContent="Âm thanh: "+(DB.mute?"Tắt":"Bật");$("bbgm").textContent="Nhạc nền: "+(DB.nobgm?"Tắt":"Bật");$("bread").textContent="Tự đọc câu hỏi: "+(DB.auto?"Bật":"Tắt");$("boff").style.display=DB.pin?"":"none";
 $("blast").textContent=DB.lastBackup?"Sao lưu gần nhất: "+fD(DB.lastBackup)+" lúc "+fT(DB.lastBackup):"Chưa sao lưu lần nào."}
