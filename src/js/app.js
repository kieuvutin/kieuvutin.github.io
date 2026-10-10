// ===== Ứng dụng =====
var DB={ps:[],cur:null},P=null,cur=null,locked=false,gFrom="game";
try{var raw=localStorage.getItem("behoctoan2");if(raw)DB=JSON.parse(raw)}catch(e){}
DB.created=DB.created||Date.now();var GOAL=10,since=0,sq=0,offer={},lastT="";
function save(){try{localStorage.setItem("behoctoan2",JSON.stringify(DB))}catch(e){}}
function $(i){return document.getElementById(i)}
function owned(p){return KEYS.filter(function(k){return p.gal&&p.gal[k]}).length}
function show(s){["home","setup","pick","game","done","gal","hist","data","tbl","adv"].forEach(function(x){$(x).classList.toggle("hide",x!==s)});
  document.querySelector("main").classList.toggle("compact",s==="game");
  if(s==="home")drawHome();if(s==="setup")drawGrid($("chars"),createKid,null);
  if(s==="pick")drawGrid($("pgrid"),choose,P);if(s==="done")drawDone();if(s==="gal")drawGal();if(s==="hist")drawHist();if(s==="tbl")drawTbl();if(s==="adv")drawAdv();if(s==="data"){$("dmsg").className="hb hide";drawSettings()}}
function stg(p){var i=0;for(var k=0;k<T.length;k++)if(p.xp>=T[k])i=k;return i}
function idle(){return "art"+needCls()+sleepCls()+leanCls()}
function anim(c,ms){var e=$("face");e.className="art "+c;setTimeout(function(){e.className=idle()},ms||(c==="grow"?900:1800))}
function burst(n){var cl=["#ffb703","#ff7a8a","#6ec6ff","#7fd36b"];for(var i=0;i<n;i++){var s=document.createElement("span");s.className="fx";s.innerHTML=ic("star",R(16,28),pick(cl));
  s.style.setProperty("--x",R(-150,150)+"px");s.style.setProperty("--y",R(-170,60)+"px");document.body.appendChild(s);(function(s){setTimeout(function(){s.remove()},1400)})(s)}}
function tile(k,s,p,cb){var n=p&&p.gal&&p.gal[k]||0,b=document.createElement(cb?"button":"div");b.className="tile";
  b.innerHTML=art(k,4)+(n>=2?"<i class='bd'>×"+n+"</i>":"")+"<span>"+CH[k]+"</span>";if(cb)b.onclick=function(){cb(k)};return b}
function drawGrid(el,cb,p){el.innerHTML="";KEYS.forEach(function(k){el.appendChild(tile(k,4,p,cb))})}
function drawHome(){var k=$("kids");k.innerHTML="";
  var bk=$("bk"),dys=Math.floor((Date.now()-(DB.lastBackup||DB.created))/864e5);
  if(DB.ps.length&&dys>=7){bk.innerHTML="Đã "+dys+" ngày chưa sao lưu"+(DB.lastBackup?"":" (chưa sao lưu lần nào)")+". Bấm để sao lưu ngay.";bk.classList.remove("hide")}else bk.classList.add("hide");
  DB.ps.forEach(function(p){p.gal=p.gal||{};var r=document.createElement("div"),b=document.createElement("button"),c=document.createElement("button"),l=p.log&&p.log.length?p.log[p.log.length-1].t:0;
    r.className="kidrow";b.className="kid";
    b.innerHTML=art(p.kind,stg(p))+"<div style='min-width:0'>"+esc(p.name)+"<div class='mute'>Lớp "+p.grade+" · "+p.xp+" điểm · sưu tập "+owned(p)+"/"+KEYS.length+"</div><div class='mute'>Học gần nhất: "+(l?rel(l)+" lúc "+fT(l):"chưa học lần nào")+"</div></div>";
    b.onclick=function(){play(p.id)};
    c.className="btn";c.setAttribute("aria-label","Lịch sử học của "+p.name);c.innerHTML=ic("clock",24);c.onclick=function(){askPin(function(){P=p;P.gal=P.gal||{};openHist("home")})};
    r.appendChild(b);r.appendChild(c);k.appendChild(r)});
  if(!DB.ps.length)k.innerHTML="<div class='mute' style='margin:8px 0'>Chưa có bé nào. Thêm bé để bắt đầu nhé!</div>"}
function createKid(k){var n=$("nm").value.trim();if(!n){alert("Bé nhập tên trước nhé!");return}
  var id=Date.now(),p={id:id,ids:[id],rev:[],rc:[],gs:0,name:n,kind:k,xp:0,grade:1,done:0,right:0,seen:[],gal:{},pending:false};DB.ps.push(p);save();$("nm").value="";play(p.id)}
function choose(k){P.kind=k;P.xp=0;P.pending=false;P.ph="care";P.adv=null;P.nd=null;P.mode=null;P.an=null;save();show("game");render(false);nextQ()}
function play(id){P=DB.ps.filter(function(p){return p.id===id})[0];P.gal=P.gal||{};if(!CH[P.kind])P.kind="apple";DB.cur=id;sq=0;since=0;offer={};P.mode=null;P.an=null;P.cs=0;P.cw=0;(P.rev||[]).forEach(function(r){r.dq=R(2,4)});save();
  if(P.pending){finish();return}if(P.ph==="map"){advMapOpen();return}if(P.xp>=MAX){grown();return}show("game");render(false);nextQ()}
function finish(){if(!P.pending){P.gal[P.kind]=(P.gal[P.kind]||0)+1;P.pending=true;save()}show("done");burst(24)}
function drawDone(){var n=P.gal[P.kind],o=owned(P);$("dface").innerHTML=art(P.kind,4);
  var t="Chúc mừng "+esc(P.name)+"! Bé đã nuôi "+CH[P.kind]+" lớn đến cấp cao nhất và đi hết hành trình!";
  if(n>=2)t+="<br>Đây là lần thứ "+n+" bé nuôi bạn này (×"+n+")";
  t+="<div class='mute' style='margin-top:6px'>Đã sưu tập "+o+"/"+KEYS.length+" bạn</div>";
  if(o===KEYS.length)t+="<div style='margin-top:6px;color:var(--pri-d)'>"+ic("trophy",22)+" Bé đã sưu tập ĐỦ tất cả cây và con vật! Giỏi quá! Bé có thể nuôi lại bạn nào cũng được nhé.</div>";
  $("dtxt").innerHTML=t}
function openGal(f){gFrom=f;show("gal")}
function gBack(){show(gFrom)}
function drawGal(){$("gname").textContent=P.name;$("gcount").textContent="Đã sưu tập "+owned(P)+"/"+KEYS.length+" bạn";var g=$("ggrid");g.innerHTML="";
  KEYS.forEach(function(k){var t=tile(k,4,P,null);if(!P.gal[k])t.classList.add("lock");g.appendChild(t)})}
var hFrom="home",WD=["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"],WS=["CN","T2","T3","T4","T5","T6","T7"];
function p2(n){return n<10?"0"+n:""+n}
function fT(t){var d=new Date(t);return p2(d.getHours())+":"+p2(d.getMinutes())}
function fD(t){var d=new Date(t);return WD[d.getDay()]+", "+p2(d.getDate())+"/"+p2(d.getMonth()+1)+"/"+d.getFullYear()}
function fS(t){var d=new Date(t);return p2(d.getDate())+"/"+p2(d.getMonth()+1)+"/"+d.getFullYear()+" "+fT(t)+":"+p2(d.getSeconds())}
function dk(t){var d=new Date(t);return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()}
function rel(t){var n=Date.now();return dk(t)===dk(n)?"hôm nay":dk(t)===dk(n-864e5)?"hôm qua":fD(t)}
function ago(t){var m=Math.floor((Date.now()-t)/6e4);return m<1?"vừa xong":m<60?m+" phút trước":m<1440?Math.floor(m/60)+" giờ trước":Math.floor(m/1440)+" ngày trước"}
function openHist(f){hFrom=f;show("hist")}
function drawHist(){var l=P.log||[],h="",i,m={},now=Date.now();
  l.forEach(function(e){var k=dk(e.t);m[k]=m[k]||{n:0,r:0};m[k].n++;m[k].r+=e.ok});
  var td=m[dk(now)]||{n:0,r:0},last=l.length?l[l.length-1].t:0;$("hname").textContent=P.name;
  $("hsum").innerHTML=last?'<div class="hb '+(td.n?"ok":"warn")+'"><b>'+(td.n?"Hôm nay bé đã học":"Hôm nay bé chưa học")+'</b><br>Học lần cuối: '+fD(last)+' lúc '+fT(last)+' ('+ago(last)+')</div>':'<div class="hb warn"><b>Bé chưa học lần nào</b></div>';
  var st=0,d=now;if(!m[dk(d)])d-=864e5;while(m[dk(d)]){st++;d-=864e5}
  var rt=l.reduce(function(a,e){return a+e.ok},0);
  h+='<div class="stats"><div><b>'+td.n+'</b>câu hôm nay</div><div><b>'+(l.length?Math.round(rt/l.length*100):0)+'%</b>làm đúng</div><div><b>'+st+'</b>ngày liên tiếp</div></div>';
  var mx=1,days=[];for(i=6;i>=0;i--){var t=now-i*864e5,c=(m[dk(t)]||{n:0}).n;days.push([t,c]);if(c>mx)mx=c}
  h+='<div class="sec">7 ngày gần đây (số câu)</div><div class="bars">'+days.map(function(x){return '<div><em>'+x[1]+'</em><i class="'+(x[1]?"on":"")+'" style="height:'+(x[1]?Math.max(6,Math.round(x[1]/mx*44)):3)+'px"></i><span>'+WS[new Date(x[0]).getDay()]+'</span></div>'}).join("")+'</div>';
  var ss=[],cs=null;l.forEach(function(e){if(!cs||e.t-cs.e>6e5){cs={s:e.t,e:e.t,n:0,r:0};ss.push(cs)}cs.e=e.t;cs.n++;cs.r+=e.ok});
  h+='<div class="sec">Các buổi học</div>'+(ss.length?ss.slice().reverse().slice(0,30).map(function(x){var mi=Math.round((x.e-x.s)/6e4);return '<div class="hi"><b>'+fD(x.s)+'</b><br>'+fT(x.s)+' – '+fT(x.e)+' · '+(mi<1?"dưới 1 phút":mi+" phút")+'<br>'+x.n+' câu · đúng '+x.r+' ('+Math.round(x.r/x.n*100)+'%)</div>'}).join(""):'<div class="mute">Chưa có buổi học nào.</div>');
  h+='<div class="sec">Câu làm gần đây</div>'+(l.length?l.slice(-40).reverse().map(function(e){var q=(e.w||e.q.indexOf("?")>=0)?e.q:e.q+" = ?";
    return '<div class="hi"><span class="mute">'+fS(e.t)+' · Lớp '+e.g+' · '+"★".repeat(e.s)+'</span><br><b>'+esc(q)+'</b><br>Bé chọn '+esc(e.r)+' · '+(e.ok?'<span class="ok-t">'+ic("check",16)+' đúng</span>':'<span class="no-t">'+ic("x",16)+' sai, đáp án '+esc(e.a)+'</span>')+'</div>'}).join(""):'<div class="mute">Chưa có câu nào.</div>');
  $("hbody").innerHTML=h;$("hbody").scrollTop=0}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function num(x,d){x=+x;return isFinite(x)?x:d}
function clean(p){if(!p||typeof p!=="object")return null;var n=String(p.name||"").replace(/[<>]/g,"").trim().slice(0,20);if(!n)return null;
 var o={id:num(p.id,Date.now()),ids:[],name:n,kind:CH[p.kind]?p.kind:"apple",xp:Math.max(0,num(p.xp,0)),grade:Math.min(5,Math.max(1,num(p.grade,1)|0)),done:Math.max(0,num(p.done,0)),right:Math.max(0,num(p.right,0)),pending:!!p.pending,gd:num(p.gd,0),gl:num(p.gl,0),gs:Math.max(0,num(p.gs,0)|0),rc:(Array.isArray(p.rc)?p.rc:[]).slice(-12).map(function(x){return x?1:0}),rev:[],seen:[],gal:{},log:[]};
 (Array.isArray(p.ids)?p.ids:[]).concat([o.id]).forEach(function(i){i=num(i,0);if(i&&o.ids.indexOf(i)<0)o.ids.push(i)});
 (Array.isArray(p.seen)?p.seen:[]).slice(-3000).forEach(function(s){if(typeof s==="string")o.seen.push(s.slice(0,200))});
 if(p.gal&&typeof p.gal==="object")KEYS.forEach(function(k){var c=num(p.gal[k],0)|0;if(c>0)o.gal[k]=Math.min(c,999)});
 (Array.isArray(p.log)?p.log:[]).slice(-5000).forEach(function(e){if(e&&typeof e==="object"&&num(e.t,0)>0)o.log.push({t:num(e.t,0),g:Math.min(5,Math.max(1,num(e.g,1)|0)),s:Math.min(3,Math.max(1,num(e.s,1)|0)),ok:e.ok?1:0,q:String(e.q||"").slice(0,200),w:e.w?1:0,r:String(e.r||"").slice(0,20),a:String(e.a||"").slice(0,20)})});
o.mt={};if(p.mt&&typeof p.mt==="object")Object.keys(p.mt).forEach(function(k){if(/^\d{1,2}x\d{1,2}$/.test(k)){var v=num(p.mt[k],0)|0;if(v>0)o.mt[k]=Math.min(3,v)}});
 o.sk={};if(p.sk&&typeof p.sk==="object")[1,2,3,4,5].forEach(function(g){var v=num(p.sk[g],0);if(v>=1&&v<=3)o.sk[g]=v});
 o.ph=p.ph==="map"?"map":"care";
 o.adv={w:0,n:0,st:{},fr:{}};if(p.adv&&typeof p.adv==="object"){o.adv.w=Math.min(4,Math.max(0,num(p.adv.w,0)|0));o.adv.n=Math.min(7,Math.max(0,num(p.adv.n,0)|0));
  [0,1,2,3,4].forEach(function(w){if(p.adv.fr&&p.adv.fr[w])o.adv.fr[w]=1;for(var i=0;i<7;i++){var v=num(p.adv.st&&p.adv.st[w+"-"+i],0)|0;if(v>0)o.adv.st[w+"-"+i]=Math.min(3,v)}})}
 return o}
function lastT(p){return p.log&&p.log.length?p.log[p.log.length-1].t:0}
function mergeKid(a,b){var at=lastT(a),seen={},add=0,ng=0;a.log=a.log||[];a.gal=a.gal||{};a.seen=a.seen||[];a.ids=a.ids||[a.id];
 a.log.forEach(function(e){seen[e.t+"|"+e.q+"|"+e.r]=1});
 b.log.forEach(function(e){var k=e.t+"|"+e.q+"|"+e.r;if(!seen[k]){seen[k]=1;a.log.push(e);add++}});
 a.log.sort(function(x,y){return x.t-y.t});
 if(lastT(b)>at||(lastT(b)===at&&b.xp>a.xp)){a.kind=b.kind;a.xp=b.xp;a.pending=b.pending;a.grade=b.grade;a.ph=b.ph;a.adv=b.adv}
 KEYS.forEach(function(k){if(b.gal[k]){if(!a.gal[k])ng++;if(b.gal[k]>(a.gal[k]||0))a.gal[k]=b.gal[k]}});
 if(b.gl>(a.gl||0)){a.gd=b.gd;a.gl=b.gl;a.gs=b.gs}a.done=Math.max(a.done||0,b.done);a.right=Math.max(a.right||0,b.right);
 b.seen.forEach(function(s){if(a.seen.indexOf(s)<0)a.seen.push(s)});if(a.seen.length>3000)a.seen=a.seen.slice(-3000);
 b.ids.forEach(function(i){if(a.ids.indexOf(i)<0)a.ids.push(i)});
 Object.keys(b.mt||{}).forEach(function(k){a.mt=a.mt||{};if(b.mt[k]>(a.mt[k]||0))a.mt[k]=b.mt[k]});Object.keys(b.sk||{}).forEach(function(g){a.sk=a.sk||{};if(b.sk[g]>(a.sk[g]||0))a.sk[g]=b.sk[g]});
 return{logs:add,gal:ng}}
function dmsg(t,bad){var m=$("dmsg");m.className="hb "+(bad?"warn":"ok");m.innerHTML=t}
function importText(t){var o;try{o=JSON.parse(t)}catch(e){dmsg("Không đọc được dữ liệu. Hãy chọn đúng file sao lưu của game.",1);return}
 if(!o||o.app!=="behoctoan"||!Array.isArray(o.ps)){dmsg("Đây không phải file sao lưu của Bé Học Toán.",1);return}
 var inc=o.ps.map(clean).filter(Boolean);if(!inc.length){dmsg("File không có bé nào để nhập.",1);return}
 var plan=inc.map(function(b){var m=DB.ps.filter(function(a){a.ids=a.ids||[a.id];return a.ids.some(function(i){return b.ids.indexOf(i)>=0})||a.name.toLowerCase()===b.name.toLowerCase()})[0];return[b,m]});
 var nw=plan.filter(function(x){return!x[1]}).length;
 if(!confirm("Tìm thấy "+inc.length+" bé: "+nw+" bé mới, "+(inc.length-nw)+" bé trùng sẽ được gộp. Dữ liệu cũ trên máy này được giữ nguyên. Nhập nhé?"))return;
 try{localStorage.setItem("behoctoan2_backup",JSON.stringify(DB))}catch(e){}
 var lines=[];plan.forEach(function(x){var b=x[0],a=x[1];
  if(a){var r=mergeKid(a,b);lines.push("Gộp vào <b>"+esc(a.name)+"</b>: +"+r.logs+" câu học mới, +"+r.gal+" bạn mới trong bộ sưu tập")}
  else{DB.ps.push(b);lines.push("Thêm bé mới <b>"+esc(b.name)+"</b>: "+b.log.length+" câu học, sưu tập "+owned(b)+"/"+KEYS.length)}});
 save();$("dtext").value="";dmsg(lines.join("<br>")+"<br>Dữ liệu cũ vẫn được giữ nguyên.")}
function impFile(i){var f=i.files&&i.files[0];if(!f)return;var r=new FileReader();r.onload=function(){importText(String(r.result));i.value=""};r.readAsText(f)}
function dump(){return JSON.stringify({app:"behoctoan",v:1,exported:Date.now(),ps:DB.ps})}
function expFile(){DB.lastBackup=Date.now();save();var s=dump(),d=new Date(),n="be-hoc-toan-"+d.getFullYear()+p2(d.getMonth()+1)+p2(d.getDate())+"-"+p2(d.getHours())+p2(d.getMinutes())+".json";
 try{var f=new File([s],n,{type:"application/json"});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f]}).catch(function(){});return}}catch(e){}
 try{var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([s],{type:"application/json"}));a.download=n;document.body.appendChild(a);a.click();setTimeout(function(){a.remove()},800);dmsg("Đã tạo file "+n+". Nếu máy không tải xuống, hãy bấm Sao chép.")}catch(e){expCopy()}}
function expCopy(){var s=dump(),ta=$("dtext"),fb=function(){ta.value=s;ta.focus();ta.select();dmsg("Hãy chép toàn bộ đoạn dữ liệu trong khung bên dưới (bấm giữ rồi chọn Sao chép).",1)};
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(s).then(function(){DB.lastBackup=Date.now();save();dmsg("Đã sao chép dữ liệu. Sang máy khác, dán vào khung rồi bấm Nhập.")},fb);else fb()}
function del(){if(confirm("Xóa "+P.name+" và toàn bộ điểm, bộ sưu tập?")){DB.ps=DB.ps.filter(function(p){return p!==P});save();show("home")}}
function render(grew){
  var g=$("grades"),i,sp=document.createElement("span");g.innerHTML="";sp.className="gl";sp.textContent="Lớp";g.appendChild(sp);
  for(i=1;i<=5;i++){(function(i){var b=document.createElement("button");b.textContent=i;b.className="chip"+(!P.mode&&i===P.grade?" on":"");b.setAttribute("aria-label","Lớp "+i);b.onclick=function(){if(P.ph==="map"){advMapOpen();return}P.mode=null;P.an=null;P.grade=i;save();render(false);nextQ()};g.appendChild(b)})(i)}
  var tb=document.createElement("button");tb.textContent="× Bảng";tb.className="chip tb"+(P.mode==="t"?" on":"");tb.onclick=function(){if(P.ph==="map"){advMapOpen();return}show("tbl")};g.appendChild(tb);
  i=stg(P);
  var fk=P.kind+i;if($("face").getAttribute("data-k")!==fk){$("face").innerHTML=art(P.kind,i);$("face").setAttribute("data-k",fk)}if(!grew)$("face").className=idle();$("name").textContent=P.name+" · "+sn(P.kind,i);
  var tdk=dk(Date.now()),sk=(P.gl===tdk||P.gl===dk(Date.now()-864e5))?P.gs:0;drawSnd();bossUpd();$("rdb").innerHTML=ic("vol",20);
  $("pts").innerHTML=ic("star",18,"#ffb703")+" "+P.xp+" điểm · hôm nay "+Math.min(todayN(P),GOAL)+"/"+GOAL+" câu"+(sk>=2?" · chuỗi "+sk+" ngày":"");
  if(i<4){$("fill").style.width=Math.round((P.xp-T[i])/(T[i+1]-T[i])*100)+"%";$("next").textContent="Còn "+(T[i+1]-P.xp)+" điểm để lớn thành: "+sn(P.kind,i+1)}
  else{$("fill").style.width="100%";$("next").textContent="Đã lớn tối đa!"}
  if(grew){anim("grow");burst(16)}petFit();needDraw();skyFit();fitQ()}
