
// ==BANK==
var N=["An","Bình","Mai","Lan","Nam","Hà"],I=["viên bi","quả táo","cái kẹo","bông hoa","quyển vở"];
function R(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function pick(a){return a[R(0,a.length-1)]}
function f(n,d){return d===1?(n/10).toFixed(1).replace(".",","):d===2?String(n).replace(/\B(?=(\d{3})+(?!\d))/g,".")+"đ":String(n)}
function ab(m,x){var a=R(m,x-m);return[a,R(m,x-a)]}
function add(m,x){var p=ab(m,x);return[p[0]+" + "+p[1],p[0]+p[1]]}
function sub(m,x){var p=ab(m,x);return[(p[0]+p[1])+" − "+p[1],p[0]]}
function miss(m,x){var p=ab(m,x);return[p[0]+" + ? = "+(p[0]+p[1]),p[1],0,0,"Số còn thiếu = "+(p[0]+p[1])+" − "+p[0]+" = "+p[1]]}
function missS(m,x){var p=ab(m,x);return[(p[0]+p[1])+" − ? = "+p[0],p[1],0,0,"Số còn thiếu = "+(p[0]+p[1])+" − "+p[0]+" = "+p[1]]}
function add3(){var a=R(5,40),b=R(5,40),c=R(1,a+b-1);return[a+" + "+b+" − "+c,a+b-c,0,0,a+" + "+b+" = "+(a+b)+", rồi "+(a+b)+" − "+c+" = "+(a+b-c)]}
function mul(a,b,c,d){var x=R(a,b),y=R(c,d);return[x+" × "+y,x*y]}
function mulM(a,b,c,d){var x=R(a,b),y=R(c,d);return[x+" × ? = "+x*y,y,0,0,"Số còn thiếu = "+x*y+" ÷ "+x+" = "+y]}
function div(a,b,c,d){var x=R(a,b),y=R(c,d);return[x*y+" ÷ "+x,y]}
function mix(){var a=R(2,9),b=R(2,9),c=R(1,50);return[a+" × "+b+" + "+c,a*b+c,0,0,a+" × "+b+" = "+a*b+", rồi "+a*b+" + "+c+" = "+(a*b+c)]}
function mix2(){var a=R(2,15),b=R(2,15),c=R(2,9);return["("+a+" + "+b+") × "+c,(a+b)*c,0,0,"("+a+" + "+b+") = "+(a+b)+", rồi "+(a+b)+" × "+c+" = "+(a+b)*c]}
function wAdd(m,x){var p=ab(Math.max(1,m),x),n=pick(N),i=pick(I);return[n+" có "+p[0]+" "+i+", được tặng thêm "+p[1]+". "+n+" có tất cả mấy "+i+"?",p[0]+p[1],0,1,"Cộng: "+p[0]+" + "+p[1]+" = "+(p[0]+p[1])]}
function wSub(m,x){var p=ab(Math.max(1,m),x),n=pick(N),i=pick(I);return[n+" có "+(p[0]+p[1])+" "+i+", cho bạn "+p[1]+". "+n+" còn lại mấy "+i+"?",p[0],0,1,"Trừ: "+(p[0]+p[1])+" − "+p[1]+" = "+p[0]]}
function wMul(a,b,c,d){var x=R(a,b),y=R(c,d),i=pick(I);return["Mỗi hộp có "+x+" "+i+". "+y+" hộp có tất cả bao nhiêu "+i+"?",x*y,0,1,"Nhân: "+x+" × "+y+" = "+x*y]}
function wDiv(a,b,c,d){var x=R(a,b),y=R(c,d),n=pick(N),i=pick(I);return[n+" chia đều "+x*y+" "+i+" cho "+x+" bạn. Mỗi bạn được mấy "+i+"?",y,0,1,"Chia: "+x*y+" ÷ "+x+" = "+y]}
function wPct(){var n=R(1,10)*20,p=pick([10,20,25,50]);return["Lớp có "+n+" học sinh, "+p+"% là học sinh nữ. Có bao nhiêu bạn nữ?",n*p/100,0,1,"Tính: "+n+" × "+p+" ÷ 100 = "+n*p/100]}
function dadd(){var a=R(11,99),b=R(11,99);return[f(a,1)+" + "+f(b,1),a+b,1]}
function dsub(){var a=R(11,99),b=R(11,99);return[f(a+b,1)+" − "+f(b,1),a,1]}
function dmul(){var a=R(11,99),b=R(2,9);return[f(a,1)+" × "+b,a*b,1]}
function ddiv(){var q=R(11,60),b=R(2,5);return[f(q*b,1)+" ÷ "+b,q,1]}
function pct(){var p=pick([10,20,25,50]),n=R(1,10)*40;return[p+"% của "+n,n*p/100,0,0,n+" × "+p+" ÷ 100 = "+n*p/100]}
var G={
1:[[()=>add(0,10),()=>sub(0,10),()=>miss(0,10),()=>missS(0,10),()=>wAdd(1,10),()=>wSub(1,10)],
   [()=>add(2,20),()=>sub(2,20),()=>miss(2,20),()=>missS(2,20),()=>wAdd(2,20),()=>wSub(2,20)],
   [()=>add(10,100),()=>sub(10,100),()=>miss(10,100),()=>missS(10,100),()=>wAdd(10,100),()=>wSub(10,100)]],
2:[[()=>add(10,100),()=>sub(10,100),()=>miss(10,100),()=>add3(),()=>wAdd(10,100),()=>wSub(10,100)],
   [()=>mul(2,5,2,9),()=>mulM(2,5,2,9),()=>div(2,5,2,9),()=>wMul(2,5,2,9),()=>wDiv(2,5,2,9)],
   [()=>mul(6,9,2,9),()=>mulM(6,9,2,9),()=>add(100,999),()=>sub(100,999),()=>mix(),()=>wMul(6,9,2,9)]],
3:[[()=>mul(2,9,2,9),()=>mulM(2,9,2,9),()=>div(2,9,2,9),()=>wMul(2,9,2,9),()=>wDiv(2,9,2,9)],
   [()=>mul(11,40,2,9),()=>add(100,999),()=>mix(),()=>mix2(),()=>wMul(11,40,2,9)],
   [()=>div(2,9,11,60),()=>sub(100,999),()=>mul(100,300,2,9),()=>mix2(),()=>wDiv(2,9,11,60)]],
4:[[()=>add(100,999),()=>sub(100,999),()=>add(1000,9999),()=>sub(1000,9999),()=>miss(100,999)],
   [()=>mul(12,30,11,30),()=>mul(100,999,2,9),()=>mix2(),()=>div(2,9,100,300),()=>wMul(11,60,2,9)],
   [()=>mul(1000,9000,2,9),()=>mul(100,300,11,20),()=>mix(),()=>div(11,30,20,90),()=>wDiv(2,9,100,300)]],
5:[[()=>dadd(),()=>dsub(),()=>add(1000,9999),()=>sub(1000,9999),()=>wAdd(100,999)],
   [()=>dmul(),()=>ddiv(),()=>mul(12,30,11,30),()=>mul(100,999,2,9),()=>pct()],
   [()=>pct(),()=>wPct(),()=>ddiv(),()=>dmul(),()=>mul(100,300,11,30)]]};
