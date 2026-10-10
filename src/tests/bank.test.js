const fs=require('fs');
const h=fs.readFileSync('/mnt/user-data/outputs/be-hoc-toan.html','utf8');
const bank=h.split('// ==BANK==')[1].split('// ==END==')[0];
const ctx=new Function(bank+';return {G,gen,f,notes,clock,shpSvg}')();
let bad=0,types={},imgs={};
function chk(c,msg,q){if(!c){bad++;if(bad<15)console.log('BAD',msg,JSON.stringify(q).slice(0,200))}}
for(let g=1;g<=5;g++)for(let l=0;l<3;l++)for(const fn of ctx.G[g][l])for(let k=0;k<4000;k++){
  const q=fn();
  chk(typeof q[0]==='string'&&q[0].length>0,'text',q);
  if(typeof q[1]==='number'){chk(Number.isInteger(q[1])&&q[1]>=0,'num ans',q)}else chk(typeof q[1]==='string','str ans',q);
  if(q[5]){chk(q[5].indexOf(q[1])>=0,'opts has ans',q);chk(new Set(q[5]).size===q[5].length&&q[5].length>=3&&q[5].length<=4,'opts uniq/len',q)}
  if(q[2]===2)chk(q[1]%1000===0,'money mult',q);
  if(/^[\d +×÷−()]+$/.test(q[0])){const v=eval(q[0].replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-'));chk(v===q[1],'arith',q)}
  const key=(q[6]?'img:':'')+(q[5]&&typeof q[1]==='string'?'txt:':'')+q[0].slice(0,18);types[key]=(types[key]||0)+1;
  if(q[6]&&Object.keys(imgs).length<60&&!imgs[q[8]])imgs[q[8]]=q[6];
}
// gen() end-to-end incl. options validity for every grade
for(let g=1;g<=5;g++){const p={grade:g,seen:[],rc:[]};for(let i=0;i<3000;i++){const c=ctx.gen(p);chk(c.o.indexOf(c.a)>=0&&new Set(c.o).size===c.o.length,'gen opts',c);p.seen.push(c.k)}}
fs.mkdirSync('/tmp/imgs',{recursive:true});let i=0;for(const k in imgs)fs.writeFileSync('/tmp/imgs/'+(i++)+'.svg',imgs[k].replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));
console.log('distinct type-prefixes',Object.keys(types).length,'imgs saved',i,'PROBLEMS',bad);
