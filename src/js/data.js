var T=[0,15,40,80,150],MAX=150;
var CH={apple:"Cây táo",sun:"Hoa hướng dương",pine:"Cây thông",rose:"Hoa hồng",tomato:"Cà chua",cactus:"Xương rồng",berry:"Dâu tây",
chick:"Gà",duck:"Vịt",bird:"Đại bàng",dragon:"Rồng",dino:"Khủng long",unicorn:"Kỳ lân",cat:"Mèo",dog:"Chó",fish:"Cá"};
var KEYS=Object.keys(CH),PL=KEYS.slice(0,7);
function isP(k){return PL.indexOf(k)>=0}
function sn(k,s){var n=CH[k];return isP(k)?["Hạt giống","Mầm non","Cây non","Sắp ra hoa quả",n+" trưởng thành"][s]:["Quả trứng",n+" con",n+" nhỡ",n+" lớn","Vua "+n][s]}
// ===== Icon (stroke, kiểu Lucide) =====
var IC={img:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',left:'<path d="M19 12H5M12 19l-7-7 7-7"/>',right:'<path d="M5 12h14M12 5l7 7-7 7"/>',
plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="M5 12l5 5L20 7"/>',trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>',
x:'<path d="M18 6L6 18M6 6l12 12"/>',bug:'<path d="M8 2l1.5 2M16 2l-1.5 2"/><rect x="7" y="6" width="10" height="14" rx="5"/><path d="M12 6v14M3 9l4 2M21 9l-4 2M3 15l4-1M21 15l-4-1M5 20l3-2M19 20l-3-2"/>',map:'<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',vol:'<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',volx:'<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/>',upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',star:'<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8z"/>'};
function ic(n,z,f){return '<svg class="ic" width="'+(z||20)+'" height="'+(z||20)+'" viewBox="0 0 24 24" fill="'+(f||"none")+'" stroke="'+(f?"none":"currentColor")+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'}
function stars(n){var s="";for(var i=0;i<3;i++)s+=ic("star",18,i<n?"#ffb703":"#c9bfa9");return s}
function btn(el,t,a,b){el.innerHTML=(a?ic(a):"")+"<span>"+t+"</span>"+(b?ic(b):"")}
function hydrate(){var l=document.querySelectorAll("[data-ic],[data-ic2]");for(var i=0;i<l.length;i++)btn(l[i],l[i].textContent,l[i].getAttribute("data-ic"),l[i].getAttribute("data-ic2"))}
