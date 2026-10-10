// Lời thoại ghim vào đầu/ngọn cây theo từng giai đoạn; nhân vật đứng yên; nền trong suốt; chế độ màn hình chính chừa vùng an toàn.
const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();let bad=0,total=0;
 for(const [w,h,tag] of [[390,844,'big'],[360,560,'small']]){
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
  await p.route('**/fonts.googleapis.com/**',r=>r.abort());await p.goto('file:///mnt/user-data/outputs/be-hoc-toan.html');
  await p.click('#home .btn-primary');await p.fill('#nm','Hà');await p.click('#chars .tile >> nth=0');
  const short="Giỏi quá!",long="Mình cần phân bón để lớn nhanh! Giải đúng để bón phân nhé!";
  for(const kind of ['apple','sun','chick','cat','dragon','fish']){
   for(let s=0;s<=4;s++){
    for(const msg of [short,long]){
     await p.evaluate(([k,s])=>{P.mode=null;P.ph='care';P.kind=k;P.xp=[0,15,40,80,150][s]+(s===4?-1:0);render(false);},[kind,s]);
     await p.waitForTimeout(60);
     const before=await p.evaluate(()=>{const r=$('face').getBoundingClientRect();return [r.left,r.top,r.width,r.height].map(Math.round).join(',')});
     await p.evaluate(t=>bub(t),msg);await p.waitForTimeout(300);
     const g=await p.evaluate(()=>{const r=s=>document.querySelector(s).getBoundingClientRect(),b=r('#bub'),f=r('#face'),pc=r('#pc'),t=r('#bubtl'),side=$('bubtl').className.indexOf('side')>=0;
      const tx=f.left+f.width/2,ty=f.top+f.height*anchorY()/100;
      const bg=getComputedStyle($('bub')).backgroundColor,a=bg.match(/rgba?\(([^)]+)\)/)[1].split(',').map(Number)[3];
      // đầu mũi tên
      const tipX=side?b.right+9:t.left+t.width/2,tipY=side?t.top+t.height/2:b.bottom+9;
      return{inside:b.left>=pc.left-1&&b.right<=pc.right+1&&b.top>=pc.top-1&&b.bottom<=pc.bottom+1,alpha:a===undefined?1:a,side,dx:Math.round(tipX-(side?tx-f.width*.22:tx)),dy:Math.round(tipY-(side?ty+f.height*.12:ty)),face:[f.left,f.top,f.width,f.height].map(Math.round).join(',')}});
     // mũi tên phải chỉ vào nhân vật (sai số nhỏ); nếu bị kẹp sát mép thẻ thì cho phép lệch ngang lớn hơn
     const near=Math.abs(g.dy)<=12&&Math.abs(g.dx)<=(g.side?14:40);
     total++;
     const dfm=g.face.split(',').map(Number).every((v,i)=>Math.abs(v-before.split(',').map(Number)[i])<=6);
     if(!(g.inside&&g.alpha<1&&dfm&&near)){bad++;if(bad<8)console.log(tag,kind,s,msg.length,'BAD',JSON.stringify(g),'before',before)}
    }}}
  await p.evaluate(()=>{P.kind='apple';P.xp=0;render(false)});await p.evaluate(t=>bub(t),"Giỏi quá!");await p.waitForTimeout(400);await p.screenshot({path:`/tmp/bub4_${tag}_seed.png`});
  await p.evaluate(()=>{P.kind='chick';P.xp=40;render(false)});await p.evaluate(t=>bub(t),"Ba câu liền! Giỏi ghê!");await p.waitForTimeout(400);await p.screenshot({path:`/tmp/bub4_${tag}_chick.png`});
  await p.evaluate(()=>document.documentElement.classList.add('sa'));await p.waitForTimeout(150);
  const sa=await p.evaluate(()=>({chipsTop:Math.round($('grades').getBoundingClientRect().top),over:document.documentElement.scrollHeight>innerHeight,tab:Math.round(document.querySelector('#game .tabbar').getBoundingClientRect().bottom),vh:innerHeight}));
  if(sa.chipsTop<46||sa.over||sa.tab>sa.vh)bad++;console.log(tag,'standalone',JSON.stringify(sa),'errors',JSON.stringify(errs));await c.close();
 }
 console.log('cases',total,'PROBLEMS',bad);await b.close();
})().catch(e=>{console.log('FAIL',e.message.split('\n')[0]);process.exit(1)});
