// ===== Mã PIN phụ huynh =====
var pin={buf:"",mode:"",cb:null,first:"",msg:""};
function hp(s){var h=5381,i;s="bh"+s;for(i=0;i<s.length;i++)h=(h*33)^s.charCodeAt(i);return String(h>>>0)}
function askPin(cb){if(!DB.pin){cb();return}pinOpen("check",cb)}
function pinOpen(m,cb){pin.mode=m;pin.cb=cb;pin.buf="";pin.first="";pin.msg="";$("pin").classList.remove("hide");pinDraw()}
function pinClose(){$("pin").classList.add("hide")}
function pinDraw(){$("pt").textContent={check:"Nhập mã PIN phụ huynh",new:"Đặt mã PIN mới (4 số)",again:"Nhập lại mã PIN để xác nhận"}[pin.mode];
 $("pd").innerHTML=[0,1,2,3].map(function(i){return '<i class="'+(i<pin.buf.length?"f":"")+'"></i>'}).join("");$("ps").textContent=pin.msg;$("pf").style.display=pin.mode==="check"?"":"none"}
function pinKey(k){if(k==="back")pin.buf=pin.buf.slice(0,-1);else if(pin.buf.length<4)pin.buf+=k;pin.msg="";pinDraw();if(pin.buf.length===4)setTimeout(pinDone,120)}
function pinDone(){var b=pin.buf;pin.buf="";
 if(pin.mode==="check"){if(hp(b)===DB.pin){pinClose();pin.cb&&pin.cb()}else pin.msg="Sai mã PIN, thử lại"}
 else if(pin.mode==="new"){pin.first=b;pin.mode="again"}
 else{if(b===pin.first){DB.pin=hp(b);save();pinClose();drawSettings();pin.cb&&pin.cb()}else{pin.msg="Hai lần nhập chưa giống nhau";pin.mode="new"}}pinDraw()}
function setPin(){pinOpen("new",null)}
function pinOff(){if(confirm("Tắt mã PIN? Ai cũng có thể xem lịch sử và xóa bé."))DB.pin=null;save();drawSettings()}
function pinForgot(){var a=R(120,899),b=R(21,49),r=prompt("Dành cho người lớn: "+a+" × "+b+" = ?");if(r!==null&&+r===a*b){pin.mode="new";pin.buf="";pin.first="";pin.msg="Đặt mã PIN mới";pinDraw()}else if(r!==null)alert("Chưa đúng.")}
