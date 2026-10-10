function sh(a){var b=a.slice(),i,j,t;for(i=b.length-1;i>0;i--){j=Math.floor(Math.random()*(i+1));t=b[i];b[i]=b[j];b[j]=t}return b}
function uq(a){var s={},o=[];a.forEach(function(v){if(!s[v]){s[v]=1;o.push(v)}});return o}
function o4(ans,w){var o=[ans];w.concat([ans+1,ans+2,ans+4,ans+10,Math.max(1,ans-1),Math.max(1,ans-2),ans+20]).forEach(function(v){if(v>0&&o.indexOf(v)<0&&o.length<4)o.push(v)});return o}
function cmp(m,x){var a=R(m,x),b=Math.random()<.2?a:R(m,x),r=a<b?"<":a>b?">":"=";return["Điền dấu: "+a+" … "+b,r,0,1,a+(a<b?" bé hơn ":a>b?" lớn hơn ":" bằng ")+b+", nên điền dấu "+r,["<","=",">"],"",a+" so với "+b+". Điền dấu bé hơn, bằng hay lớn hơn"]}
function cmpE(){var a=R(2,9),b=R(2,9),c=R(5,20),s=a+b,r=s<c?"<":s>c?">":"=";return["Điền dấu: "+a+" + "+b+" … "+c,r,0,1,a+" + "+b+" = "+s+"; "+s+(s<c?" bé hơn ":s>c?" lớn hơn ":" bằng ")+c+", nên điền dấu "+r,["<","=",">"],"",a+" cộng "+b+" so với "+c+". Điền dấu bé hơn, bằng hay lớn hơn"]}
function big(m,x){var s={},o=[],v;while(o.length<4){v=R(m,x);if(!s[v]){s[v]=1;o.push(v)}}var mx=Math.random()<.5,a=mx?Math.max.apply(0,o):Math.min.apply(0,o);return["Số nào "+(mx?"lớn":"bé")+" nhất?",a,0,1,"So sánh các số "+o.join(", ")+": số "+(mx?"lớn":"bé")+" nhất là "+a,o,"","",(mx?"L":"B")+o.slice().sort().join(",")]}
function nxt(m,x){var n=R(m+1,x-1),af=Math.random()<.5,a=af?n+1:n-1;return["Số liền "+(af?"sau":"trước")+" của "+n+" là:",a,0,1,n+(af?" + 1 = ":" − 1 = ")+a]}
function seq(d1,d2,s1,s2){var d=R(d1,d2),s=R(s1,s2),dn=Math.random()<.25,st=dn?-d:d;if(dn)s+=4*d;var a=[s,s+st,s+2*st,s+3*st],ans=s+4*st;return["Tìm số tiếp theo: "+a.join(", ")+", …",ans,0,1,"Mỗi số "+(dn?"giảm ":"tăng ")+d+" so với số trước: "+(s+3*st)+(dn?" − ":" + ")+d+" = "+ans]}
function par(m,x){var ev=Math.random()<.5,s={},a=R(m,x),o,v;function ok(v){return ev?v%2===0:v%2!==0}while(!ok(a))a=R(m,x);o=[a];s[a]=1;while(o.length<4){v=R(m,x);if(!ok(v)&&!s[v]){s[v]=1;o.push(v)}}return["Số nào là số "+(ev?"chẵn":"lẻ")+"?",a,0,1,"Số "+(ev?"chẵn":"lẻ")+" có chữ số tận cùng là "+(ev?"0, 2, 4, 6, 8":"1, 3, 5, 7, 9")+": "+a,o,"","",(ev?"E":"O")+o.slice().sort().join(",")]}
function rnd(u,mn,mx){var n=R(mn,mx);while(n%u===0)n=R(mn,mx);var lo=Math.floor(n/u)*u,hi=lo+u,a=Math.round(n/u)*u,r=Math.floor(n/(u/10))%10,nm={10:"chục",100:"trăm",1000:"nghìn"}[u];return["Làm tròn "+n+" đến hàng "+nm+":",a,0,1,"Chữ số ngay sau hàng "+nm+" là "+r+(r>=5?", từ 5 trở lên nên làm tròn lên":", nhỏ hơn 5 nên làm tròn xuống")+" → "+a,uq([a,lo===a?hi:lo,Math.max(0,lo-u),hi+u]).slice(0,4)]}
var UN=[["m","cm",100],["km","m",1000],["kg","g",1000],["giờ","phút",60],["ngày","giờ",24],["tuần","ngày",7],["phút","giây",60]];
function unit(lo,hi){var u=UN[R(lo,hi)],n=R(2,9),fw=Math.random()<.6,a=fw?n*u[2]:n;return[fw?n+" "+u[0]+" = … "+u[1]:n*u[2]+" "+u[1]+" = … "+u[0],a,0,1,"1 "+u[0]+" = "+u[2]+" "+u[1]+". "+(fw?n+" × "+u[2]+" = "+a:n*u[2]+" ÷ "+u[2]+" = "+n),o4(a,[a*10,a+u[2],a-u[2],a*2].filter(function(v){return v>0&&v!==a}))]}
function tstr(h,m){return h+" giờ"+(m?" "+m+" phút":"")}
function clock(h,m){var s='<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#3a2d1c" stroke-width="4"/>',i,a;
 for(i=1;i<=12;i++){a=i*Math.PI/6;s+='<text x="'+(50+36*Math.sin(a)).toFixed(1)+'" y="'+(54-36*Math.cos(a)).toFixed(1)+'" font-size="11" font-weight="700" text-anchor="middle" fill="#3a2d1c">'+i+'</text>'}
 function hd(deg,l,w,c){var r=deg*Math.PI/180;return '<line x1="50" y1="50" x2="'+(50+l*Math.sin(r)).toFixed(1)+'" y2="'+(50-l*Math.cos(r)).toFixed(1)+'" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"/>'}
 return s+hd((h%12)*30+m/2,22,5,"#3a2d1c")+hd(m*6,33,3,"#e5533d")+'<circle cx="50" cy="50" r="3.5" fill="#3a2d1c"/></svg>'}
function clk(mode){var ms=[[0],[0,30],[0,15,30,45],[0,5,10,15,20,25,30,35,40,45,50,55]][mode],h=R(1,12),m=pick(ms),a=tstr(h,m),o=[a],v;
 [tstr(h%12+1,m),tstr(h===1?12:h-1,m),tstr(m/5||12,h*5%60),tstr(h,pick(ms))].forEach(function(x){if(o.length<4&&o.indexOf(x)<0)o.push(x)});
 while(o.length<4){v=tstr(R(1,12),pick(ms));if(o.indexOf(v)<0)o.push(v)}
 return["Đồng hồ chỉ mấy giờ?",a,0,1,"Kim ngắn chỉ gần số "+h+", kim dài chỉ số "+m/5+(m?" ("+m+" phút)":" (đúng giờ)")+" → "+a,o,clock(h,m),"Đồng hồ chỉ mấy giờ?",h+":"+m]}
var DN=[1000,2000,5000,10000,20000,50000,100000,200000,500000],DC={1000:"#b8a2d6",2000:"#a9b5b2",5000:"#79b0e6",10000:"#d9b25f",20000:"#4f8fd1",50000:"#e58aa3",100000:"#6bb36b",200000:"#c9806a",500000:"#58b8c9"};
function notes(a){var s='<svg viewBox="0 0 '+a.length*62+' 40">';a.forEach(function(v,i){s+='<rect x="'+(i*62+2)+'" y="4" width="58" height="32" rx="4" fill="'+DC[v]+'" stroke="#0003"/><text x="'+(i*62+31)+'" y="25" font-size="10.5" font-weight="800" text-anchor="middle" fill="#2b2118">'+f(v,2)+'</text>'});return s+'</svg>'}
function monN(lv){var dn=DN.slice(0,[4,6,9][lv-1]),n=R(lv+1,lv+2),a=[],i,sum=0;for(i=0;i<n;i++)a.push(pick(dn));a.sort(function(x,y){return y-x});a.forEach(function(v){sum+=v});
 return["Các tờ tiền này có tổng cộng bao nhiêu?",sum,2,1,a.map(function(v){return f(v,2)}).join(" + ")+" = "+f(sum,2),null,notes(a),"Các tờ tiền này có tổng cộng bao nhiêu tiền?",a.join(",")]}
function monC(pays,mn,mx){var pay=pick(pays),p=R(mn,mx)*1000,n=pick(N),i=pick(I);return[n+" mua 1 "+i+" giá "+f(p,2)+", đưa người bán tờ "+f(pay,2)+". Người bán trả lại bao nhiêu tiền?",pay-p,2,1,f(pay,2)+" − "+f(p,2)+" = "+f(pay-p,2)]}
function monM(mp,mq){var p=R(1,mp)*1000,q=R(2,mq),n=pick(N),i=pick(I);return[n+" mua "+q+" "+i+", mỗi cái giá "+f(p,2)+". "+n+" phải trả bao nhiêu tiền?",p*q,2,1,q+" × "+f(p,2)+" = "+f(p*q,2)]}
var SC=["#ff8a5c","#4aa8ff","#7fd36b","#ffb703","#c58bf2","#ff7aa2"];
function poly(n,r,rot){var s="",i,a;for(i=0;i<n;i++){a=(rot===undefined?-90:rot)*Math.PI/180+i*2*Math.PI/n;s+=(50+r*Math.cos(a)).toFixed(1)+","+(50+r*Math.sin(a)).toFixed(1)+" "}return s}
function shpSvg(n,c){var b;if(n=="hình tròn")b='<circle cx="50" cy="50" r="38"/>';else if(n=="hình vuông")b='<rect x="14" y="14" width="72" height="72"/>';else if(n=="hình chữ nhật")b='<rect x="6" y="26" width="88" height="48"/>';else if(n=="hình tam giác")b='<polygon points="'+poly(3,44)+'"/>';else if(n=="hình ngũ giác")b='<polygon points="'+poly(5,44)+'"/>';else if(n=="hình lục giác")b='<polygon points="'+poly(6,44,0)+'"/>';else b='<polygon points="50,8 90,50 50,92 10,50"/>';return '<svg viewBox="0 0 100 100" fill="'+c+'" stroke="#0003" stroke-width="2">'+b+'</svg>'}
var SX={"hình tròn":0,"hình vuông":4,"hình chữ nhật":4,"hình tam giác":3,"hình ngũ giác":5,"hình lục giác":6,"hình thoi":4};
function shape(mode){var pool=["hình tròn","hình vuông","hình tam giác","hình chữ nhật"];if(mode>1)pool=pool.concat(["hình ngũ giác","hình lục giác","hình thoi"]);var a=pick(pool),ci=R(0,5),o=[a];sh(pool).forEach(function(v){if(o.length<4&&v!==a)o.push(v)});
 return["Đây là hình gì?",a,0,1,"Đây là "+a+(SX[a]?" (có "+SX[a]+" cạnh)":" (không có cạnh, là đường cong khép kín)"),o,shpSvg(a,SC[ci]),"Đây là hình gì?",a+ci]}
function sides(){var a=pick(["hình vuông","hình chữ nhật","hình tam giác","hình ngũ giác","hình lục giác","hình thoi"]),n=SX[a],ci=R(0,5),o=[n];sh([3,4,5,6,7,8]).forEach(function(v){if(o.length<4&&v!==n)o.push(v)});
 return["Hình này có mấy cạnh?",n,0,1,"Đếm các cạnh của "+a+": có "+n+" cạnh",o,shpSvg(a,SC[ci]),"Hình này có mấy cạnh?",a+ci+"s"]}
function per(k){var a=R(4,15),b=R(2,a-1),t,ans,w,ex;
 if(k=="rp"){ans=(a+b)*2;w=[a*b,a+b];t="Hình chữ nhật có chiều dài "+a+" cm, chiều rộng "+b+" cm. Chu vi hình chữ nhật là bao nhiêu cm?";ex="(dài + rộng) × 2 = ("+a+" + "+b+") × 2 = "+ans}
 else if(k=="ra"){ans=a*b;w=[(a+b)*2,a+b];t="Hình chữ nhật có chiều dài "+a+" cm, chiều rộng "+b+" cm. Diện tích hình chữ nhật là bao nhiêu cm²?";ex="dài × rộng = "+a+" × "+b+" = "+ans}
 else if(k=="sp"){a=R(2,12);ans=a*4;w=[a*a,a*2];t="Hình vuông có cạnh "+a+" cm. Chu vi hình vuông là bao nhiêu cm?";ex="cạnh × 4 = "+a+" × 4 = "+ans}
 else if(k=="sa"){a=R(2,12);ans=a*a;w=[a*4,a*2];t="Hình vuông có cạnh "+a+" cm. Diện tích hình vuông là bao nhiêu cm²?";ex="cạnh × cạnh = "+a+" × "+a+" = "+ans}
 else{var bs=2*R(2,8),hh=R(2,10);ans=bs*hh/2;w=[bs*hh,bs+hh];t="Hình tam giác có đáy "+bs+" cm, chiều cao "+hh+" cm. Diện tích hình tam giác là bao nhiêu cm²?";ex="đáy × cao ÷ 2 = "+bs+" × "+hh+" ÷ 2 = "+ans}
 return[t,ans,0,1,ex,o4(ans,w)]}
function frac(d1,d2){var d=R(d1,d2),add=Math.random()<.6,a,b,r,t,i;if(add){a=R(1,d-2);b=R(1,d-1-a);r=a+b;t=a+"/"+d+" + "+b+"/"+d}else{a=R(2,d-1);b=R(1,a-1);r=a-b;t=a+"/"+d+" − "+b+"/"+d}
 var ans=r+"/"+d,o=[ans];[r+"/"+(d+d),(r+1)+"/"+d,Math.max(1,r-1)+"/"+d,(add?a*b:a+b)+"/"+d,r+"/"+(d+1),(r+2)+"/"+d].forEach(function(v){if(o.length<4&&o.indexOf(v)<0)o.push(v)});
 return[t,ans,0,0,"Hai phân số cùng mẫu số "+d+": "+(add?a+" + "+b:a+" − "+b)+" = "+r+", giữ nguyên mẫu số → "+ans,o]}
G[1][0].push(function(){return cmp(0,20)},function(){return nxt(0,20)},function(){return big(0,20)},function(){return seq(1,2,0,8)});
G[1][1].push(function(){return cmp(10,100)},function(){return nxt(10,99)},function(){return big(10,100)},function(){return seq(1,5,10,30)},function(){return clk(0)},function(){return shape(1)});
G[1][2].push(function(){return clk(1)},function(){return cmpE()},function(){return seq(2,10,5,40)},function(){return sides()},function(){return par(10,99)});
G[2][0].push(function(){return cmp(10,100)},function(){return clk(1)},function(){return shape(1)},function(){return unit(0,0)},function(){return par(10,99)});
G[2][1].push(function(){return cmp(100,999)},function(){return clk(2)},function(){return monN(1)},function(){return nxt(100,999)},function(){return seq(2,10,10,200)},function(){return big(100,999)},function(){return monC([10000],1,9)});
G[2][2].push(function(){return clk(3)},function(){return monN(2)},function(){return cmpE()},function(){return unit(2,2)},function(){return monM(9,5)},function(){return sides()});
G[3][0].push(function(){return cmpE()},function(){return shape(2)},function(){return sides()},function(){return clk(2)},function(){return unit(0,2)},function(){return monN(2)});
G[3][1].push(function(){return clk(3)},function(){return monM(20,9)},function(){return rnd(10,11,99)},function(){return per("sp")},function(){return unit(3,6)},function(){return monC([20000,50000],3,19)});
G[3][2].push(function(){return per("rp")},function(){return per("ra")},function(){return per("sa")},function(){return rnd(100,101,999)},function(){return monN(3)},function(){return unit(0,6)});
G[4][0].push(function(){return monN(3)},function(){return unit(0,6)},function(){return rnd(10,11,99)},function(){return per("rp")},function(){return rnd(100,101,999)});
G[4][1].push(function(){return frac(5,12)},function(){return per("ra")},function(){return unit(0,6)},function(){return rnd(1000,1001,9999)},function(){return monC([100000,200000],10,99)});
G[4][2].push(function(){return frac(8,20)},function(){return per("sa")},function(){return per("ra")},function(){return monM(99,9)},function(){return rnd(1000,1001,9999)});
G[5][0].push(function(){return unit(0,6)},function(){return frac(6,15)},function(){return rnd(1000,1001,9999)},function(){return monC([200000,500000],20,190)});
G[5][1].push(function(){return frac(8,20)},function(){return per("ta")},function(){return per("ra")},function(){return monM(99,9)});
G[5][2].push(function(){return per("ta")},function(){return frac(10,30)},function(){return per("sa")},function(){return monN(3)});
