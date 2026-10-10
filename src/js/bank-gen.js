function mkO(a,d){var set={},o=[a];set[a]=1;var offs=d===2?[-10000,-5000,-2000,-1000,1000,2000,5000,10000]:d?[-10,-1,1,2,-2,10,3]:[-10,-2,-1,1,2,10,-5,5];while(o.length<4){var v=a+pick(offs)*(Math.random()<.3?2:1);if(v>=(d===2?1000:0)&&!set[v]){set[v]=1;o.push(v)}}return sh(o)}
function lvOf(v){return v<1.7?1:v<2.5?2:3}
function lvPick(p){var sk=(p.sk&&p.sk[p.grade])||1.3;if(p.cw>=2)sk=Math.max(1,sk-1);var w=[1,2,3].map(function(i){return Math.exp(-Math.pow(i-sk,2)/.405)}),t=Math.random()*(w[0]+w[1]+w[2]);return t<w[0]?1:t<w[0]+w[1]?2:3}
function fk(a,b){return Math.min(a,b)+"x"+Math.max(a,b)}
function gen(p,l0){var lv=l0||lvPick(p),arr=G[p.grade][lv-1],q,t=0;do{q=pick(arr)();t++}while(p.seen.indexOf(q[8]||q[0])>=0&&t<40);
  var a=q[1],d=q[2]||0;return{t:q[0],w:q[3]||0,a:a,d:d,o:q[5]?sh(q[5]):mkO(a,d),fx:q[5]?1:0,s:lv,ex:q[4]||(q[0]+" = "+f(a,d)),img:q[6]||"",sp:q[7]||"",k:q[8]||q[0],lq:q[8]?q[0]+" ["+q[8]+"]":q[0]}}
// ==END==
