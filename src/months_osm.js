// ===== One-piece, to-scale OSM street maps for January (food) and March (bars)
function osmBoard(D,LL,o){const [x0,y0,x1,y1]=D.box,k=o.k,mh=(y1-y0)*k,top=Math.round((0.12*mh+40)/0.88),W=(x1-x0)*k,H=top+mh,ts=o.ts;
 const X=x=>(x-x0)*k,Y=y=>top+(y-y0)*k,g=`transform="translate(${-x0*k},${top-y0*k}) scale(${k})"`;
 let s=`<rect width="${W}" height="${H}" fill="${o.land}"/><rect width="${W}" height="${top}" fill="${o.head}"/>`;
 s+=`<g ${g}><path d="${D.water}" fill="${o.water}" fill-rule="evenodd"/>`;
 [['s',o.rs,o.ws],['p',o.rp,o.wp],['m',o.rm,o.wm],['b',o.rb,o.wb]].forEach(([c,col,w])=>{if(D[c])s+=`<path d="${D[c]}" fill="none" stroke="${col}" stroke-width="${w}" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/>`});
 s+='</g>';
 (D.lab||[]).forEach(([n,x,y,a])=>s+=`<text x="${X(x)}" y="${Y(y)-3}" transform="rotate(${a} ${X(x)} ${Y(y)})" text-anchor="middle" font-size="${o.lf}" fill="${o.lc}" style="paint-order:stroke" stroke="${o.land}" stroke-width="3">${n}</text>`);
 (o.extraLab||[]).forEach(([t,la,lo,c,f,it])=>{const p=PK(la,lo);s+=`<text x="${X(p[0])}" y="${Y(p[1])}" text-anchor="middle" font-size="${f}" fill="${c}" ${it?'font-style="italic"':''} style="paint-order:stroke" stroke="${o.land}" stroke-width="3">${t}</text>`});
 s+=`<g><rect x="${W-k-30}" y="${H-30}" width="${k}" height="6" fill="${o.lc}"/><text x="${W-k-30}" y="${H-36}" font-size="13" fill="${o.lc}">1 km</text><text x="${W-30}" y="${H-36}" font-size="13" fill="${o.lc}" text-anchor="end">N ↑ · streets © OpenStreetMap</text></g>`;
 const P=LL.map(([la,lo],i)=>{const p=PK(la,lo);return[X(p[0]),Y(p[1])]}),Q=P.map((p,i)=>[p[0]+Math.cos(i*2.4)*3,p[1]+Math.sin(i*2.4)*3]);
 for(let it=0;it<300;it++)for(let i=0;i<Q.length;i++)for(let j=i+1;j<Q.length;j++){const dx=Q[j][0]-Q[i][0],dy=Q[j][1]-Q[i][1],dd=Math.hypot(dx,dy)||1,mn=ts*1.12;if(dd<mn){const f=(mn-dd)/2/dd;Q[i][0]-=dx*f;Q[i][1]-=dy*f;Q[j][0]+=dx*f;Q[j][1]+=dy*f}}
 P.forEach((p,i)=>s+=`<line x1="${p[0]}" y1="${p[1]}" x2="${Q[i][0]}" y2="${Q[i][1]}" stroke="${o.pin}" stroke-width="1.2" opacity=".8"/><circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${o.pin}" stroke="#fff" stroke-width="1"/>`);
 return{s,P:Q,ts,W,H}}
if(M[13]){M[13].board=(W0,H0)=>osmBoard(OSMJ2,FOOD.map(f=>[f[4],f[5]]),{k:230,ts:40,land:"#f3ead7",head:"#3b1d0e",water:"#9cc7e4",rs:"#d8c7a8",ws:1,rp:"#a88b62",wp:1.8,rm:"#e08a2e",wm:2.6,rb:"#c0392b",wb:3.5,lf:11,lc:"#5a3a1a",pin:"#c0392b",
 extraLab:[["Delaware River",39.955,-75.137,"#2f6d99",15,1],["Schuylkill River",39.955,-75.182,"#2f6d99",15,1],["Rittenhouse",39.9525,-75.176,"#5a3a1a",13],["Old City",39.952,-75.144,"#5a3a1a",13],["Fishtown",39.976,-75.131,"#5a3a1a",13],["East Passyunk",39.924,-75.162,"#5a3a1a",13],["Queen Village",39.937,-75.148,"#5a3a1a",13],["City Hall",39.9535,-75.1636,"#7a2a1a",12]]});M[13].ground="#f3ead7"}
if(M[15]){M[15].board=(W0,H0)=>osmBoard(OSMM,MBARS,{k:430,ts:40,land:"#0c2e18",head:"#04210f",water:"#123a5a",rs:"#2f5a3c",ws:1.4,rp:"#4a7d57",wp:2.4,rm:"#4a7d57",wm:3,rb:"#6fa57b",wb:4.5,lf:10,lc:"#9fd4a8",pin:"#ffd34d",
 extraLab:[["Delaware River",39.951,-75.1395,"#7fb6e0",13,1],["Schuylkill",39.952,-75.1828,"#7fb6e0",13,1],["City Hall",39.9524,-75.1636,"#ffe9a8",12],["Rittenhouse Sq",39.9496,-75.1718,"#cfe",11],["Washington Sq",39.9466,-75.1525,"#cfe",11],["Franklin Sq",39.9556,-75.1503,"#cfe",11],["Logan Sq",39.9578,-75.1709,"#cfe",11]]});M[15].ground="#0c2e18"}
