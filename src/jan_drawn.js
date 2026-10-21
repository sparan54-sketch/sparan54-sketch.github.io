// ===== January 2027 drawn food-crawl moments
{const SET={
 store:(name,c1,c2,night)=>(night?A.sky('#0b1430','#2a3a6a')+A.stars(25):A.sky('#7ab8e8','#d8ecff'))+A.rowhouses()+A.awning(110,180,c1,c2,name)+`<rect x="130" y="140" width="140" height="70" fill="#ffe7a8" opacity=".9"/><rect x="150" y="150" width="100" height="10" fill="#3a2414" opacity=".5"/>`,
 rtm:(name,c1)=>A.interior('#d8c8a8','#cbb894','#6a6a6a')+Array.from({length:6},(_,i)=>`<path d="M${i*80-20} 0 L${i*80+20} 60" stroke="#8a7a5a" stroke-width="5"/>`).join('')+`<rect x="0" y="56" width="400" height="8" fill="#8a7a5a"/>`+A.sign(200,40,'READING TERMINAL MARKET','#c0392b','#fff',13)+`<rect x="80" y="100" width="240" height="130" fill="#f6efe2"/>`+A.sign(200,118,name,c1,'#fff',14)+A.shelves(100,128,200,[0,1,2,3,4,5].map(i=>`<rect x="${110+i*32}" y="${138+(i%2)*30}" width="22" height="16" rx="3" fill="${['#ffd34d','#c0392b','#d9a05a','#fff','#4caf50','#a0522d'][i]}"/>`).join(''))+`<rect x="40" y="120" width="40" height="110" fill="#b0a080"/><rect x="320" y="120" width="40" height="110" fill="#b0a080"/>`,
 counter:(name,c1,wall)=>A.interior(wall||'#f2e2c4','#e8d2ac','#5a3a22')+A.sign(200,46,name,c1,'#fff',16)+`<rect x="70" y="64" width="260" height="70" rx="6" fill="#222"/>`+[0,1,2,3].map(i=>`<rect x="86" y="${76+i*14}" width="${120+((i*53)%90)}" height="6" fill="#fff" opacity=".85"/><rect x="290" y="${76+i*14}" width="24" height="6" fill="#ffd34d"/>`).join('')+A.window(20,80,40,70)+A.window(340,80,40,70),
 window:(name,c1)=>A.sky('#0b1430','#2a3a6a')+A.stars(30)+`<rect x="40" y="60" width="320" height="170" fill="#3a3a44"/><rect x="100" y="110" width="200" height="90" fill="#ffe7a8"/><text x="200" y="128" font-size="11" font-weight="900" text-anchor="middle" fill="#c0392b">ORDER HERE</text>${['WIT / WITOUT','WHIZ · PROV · AMERICAN','FRIES · SODA'].map((t,i)=>`<text x="200" y="${146+i*15}" font-size="10" text-anchor="middle" fill="#3a2414">${t}</text>`).join('')}<rect x="100" y="196" width="200" height="10" fill="#888"/>`+A.sign(200,92,name,c1,'#fff',16)+`<rect x="0" y="230" width="400" height="70" fill="#555"/><rect y="230" width="400" height="10" fill="#bbb"/>`
};
const JD=[["Splittin' a sloppy cheesesteak at Dalessandro's in Roxborough","counter","#c0392b","cheesesteak"],
["Grabbin' a cheesesteak hoagie across the street at Chubby's","counter","#2a6ad9","cheesesteak"],
["Downin' a giant cheesesteak at Max's on Germantown Ave","window","#c0392b","cheesesteak"],
["Waitin' at the counter for Steve's whiz wit in the Northeast","counter","#1e3a8a","cheesesteak"],
["Sippin' black-and-white milkshakes with steaks at Joe's in Fishtown","counter","#e53935","shake"],
["Holdin' cheesesteaks outside Campo's on Market St","store","#c0392b","cheesesteak"],
["Sharin' a corned beef special at Hershel's deli counter","rtm","#1e6fd9","hoagie"],
["Eatin' a Pennsylvania Dutch pancake breakfast at the Dutch Eating Place","rtm","#2a7a3a","pancakes"],
["Diggin' into biscuits and coffee at Down Home Diner","rtm","#8a2a2a","coffee"],
["Watchin' fresh doughnuts glazed at Beiler's","rtm","#6a1a8a","donut"],
["Bitin' into a roast pork with broccoli rabe at DiNic's","rtm","#c0392b","hoagie"],
["Lickin' scoops at Bassetts, America's oldest ice cream company","rtm","#2a6ad9","cone"],
["Pullin' apart a hot soft pretzel at Miller's Twist","rtm","#a0522d","pretzel"],
["Sharin' a cheesesteak from the window counter at Jim's on South St","store","#222","cheesesteak"],
["Splittin' a mile-high corned beef at the Famous 4th Street Deli","counter","#c0392b","hoagie"],
["Slurpin' cherry water ice at John's on Christian St","store","#e53935","waterice"],
["Holdin' a cheesy slice at Angelo's Pizzeria","counter","#2a7a3a","pizza"],
["Carryin' seeded rolls out of Sarcone's Bakery","store","#d9a05a","bread"],
["Twirlin' spaghetti in red gravy at Ralph's","counter","#8a1a1a","gravy","#f2d8c4"],
["Sharin' a big Italian dinner at Dante & Luigi's","counter","#2a5a3a","gravy","#e8dcc4"],
["Takin' the first bite of a cannoli at Isgro Pastries","counter","#c0392b","cannoli"],
["Samplin' cheese at the Di Bruno Bros. counter","store","#2a6a3a","cheese"],
["Grabbin' a bag of fresh pretzels on Washington Ave","store","#a0522d","pretzel"],
["Eatin' barbacoa tacos at South Philly Barbacoa","store","#c0392b","taco"],
["Eatin' cheesesteaks under the bright neon at Geno's","window","#ff8a00","cheesesteak"],
["Orderin' wit whiz at Pat's King of Steaks","window","#c0392b","cheesesteak"],
["Splittin' an Italian hoagie at Cosmi's Deli","store","#2a7a3a","hoagie"],
["Pickin' out cannoli and pastries at Termini Bros.","counter","#1e3a8a","cannoli"],
["Wishin' Pop's water ice were open in January","store","#4dc3ff","waterice"],
["Carryin' cheesesteaks out of Tony and Nick's on Oregon Ave","store","#c0392b","cheesesteak"],
["Endin' the crawl with John's Roast Pork sandwiches","store","#e53935","hoagie"]];
if(M[13]){M[13].extra=(d,R)=>{const f=FOOD[d-1],[cap,set,c1,food,wall]=JD[d-1],nm=f[0].replace(/ \(.*\)/,'').replace(/&/g,'and');
 const art=SET[set](nm,c1,set=='store'?'#fff':wall,d%4==0)+P[food](110,262,1.3)+(set!='window'?P[food](290,262,1.1):'');
 return drawnScene(M[13],d,{art,fg:FG.counter(set=='rtm'?'#8a7a5a':'#7a4a22'),hand:P[food](0,0,1),title:f[0],cap:cap+(/seasonal/.test(f[0])?' (seasonal, opens in spring)':'')})}}}
