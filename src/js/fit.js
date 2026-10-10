// ===== Khung nhân vật cố định + thẻ câu hỏi tự co cho vừa (không vỡ giao diện khi câu hỏi đổi) =====
function petFit(){var g=$("game"),pc=$("pc"),h;if(!g||!pc||g.className.indexOf("hide")>=0)return;h=g.clientHeight;if(!h)return;var ph=Math.round(Math.max(150,Math.min(300,h*.34)));pc.style.setProperty("--ph",ph+"px");pc.style.setProperty("--fs",Math.max(50,Math.min(ph-92,pc.clientWidth||ph))+"px")}
function fitQ(){var q=document.querySelector("#game .qc"),f;if(!q||q.offsetParent===null)return;
 for(f=0;f<=6;f++){q.setAttribute("data-f",f);if(q.scrollHeight<=q.clientHeight+1)break}}
function fitAll(){petFit();skyFit();fitQ()}
