// ===== 2027 months (keys 13=Jan,14=Feb,15=Mar). Shown live only if key in LIVE (else ?wip=1)
const THEATRES=["Majestic","Shubert","Broadhurst","Booth","Imperial","Winter Garden","Gershwin","Lyceum","Ambassador","Ethel Barrymore","Belasco","Hudson","Lunt-Fontanne","Minskoff","Nederlander","Neil Simon","New Amsterdam","Palace","Richard Rodgers","St. James","Al Hirschfeld","August Wilson","Circle in the Square","James Earl Jones","Eugene O'Neill","John Golden","Hayes","Longacre","Lyric","Marquis","Music Box"];
const BRAVO=[
["The Real Housewives of New York City","Bethenny Frankel · Luann de Lesseps · Ramona Singer · Sonja Morgan","“Money can't buy you class.”"],
["The Real Housewives of Beverly Hills","Kyle Richards · Lisa Vanderpump · Lisa Rinna · Erika Jayne","Diamonds, dinner parties, and a reunion couch."],
["The Real Housewives of Atlanta","NeNe Leakes · Kandi Burruss · Porsha Williams · Kenya Moore","“Close your legs to married men.” — NeNe"],
["The Real Housewives of Salt Lake City","Lisa Barlow · Heather Gay · Whitney Rose · Meredith Marks","Snow, glam and mountain-high drama."],
["The Real Housewives of Potomac","Gizelle Bryant · Karen Huger · Ashley Darby · Wendy Osefo","Etiquette, darling. The Grande Dame enters."],
["The Real Housewives of Orange County","Vicki Gunvalson · Tamra Judge · Shannon Beador · Heather Dubrow","“Woo-hoo!” The OG franchise."],
["The Real Housewives of New Jersey","Teresa Giudice · Melissa Gorga · Dolores Catania · Margaret Josephs","Table-flipping, family-style."],
["The Real Housewives of Miami","Lisa Hochstein · Larsa Pippen · Alexia Nepola · Guerdy Abraira","Sun, yachts and Miami heat."],
["The Real Housewives of Dubai","Caroline Stanbury · Chanel Ayan · Sara Al Madani · Lesa Milan","Desert glamour, sky-high."],
["The Real Housewives of Dallas","D'Andra Simmons · Brandi Redmond · Kameron Westcott","Big hair, bigger drama (2016–2021)."],
["Vanderpump Rules","Lisa Vanderpump · Ariana Madix · Tom Sandoval · James Kennedy","Now serving at SUR."],
["Below Deck","Captain Lee Rosbach · Kate Chastain · Eddie Lucas","“Stew, a word?” All hands on deck."],
["Below Deck Mediterranean","Captain Sandy Yawn · Hannah Ferrier (chief stew) · Malia White (bosun)","Charter season on the Med."],
["Below Deck Sailing Yacht","Captain Glenn Shephard · Daisy Kelliher · Gary King","Sails up, drama up."],
["Below Deck Down Under","Captain Jason Chambers · Aesha Scott","G'day from the bridge."],
["Summer House","Kyle Cooke · Amanda Batula · Lindsay Hubbard · Carl Radke · Paige DeSorbo","Loverboy on tap in the Hamptons."],
["Winter House","Kyle Cooke · Paige DeSorbo · Craig Conover","Ski lodge hookups."],
["Southern Charm","Shep Rose · Craig Conover · Madison LeCroy · Austen Kroll · Patricia Altschul","Charleston manners, mostly."],
["Southern Hospitality","Joe Bradley · Leva Bonaparte · Grace Lilly","Front of house at Republic."],
["Married to Medicine","Dr. Simone Whitmore · Quad Webb · Toya Bush-Harris · Dr. Heavenly Kimes","Scrubs and scandal in Atlanta."],
["Top Chef","Host Kristen Kish · Tom Colicchio · Gail Simmons (Padma Lakshmi hosted through 2023)","“Please pack your knives and go.”"],
["Watch What Happens Live","Andy Cohen","Live from the Clubhouse. Shotski!"],
["The Valley","Jax Taylor · Brittany Cartwright · Kristen Doute","Pump Rules, the suburbs edition."],
["Shahs of Sunset","Reza Farahan · Mercedes “MJ” Javid · Golnesa “GG” Gharachedaghi","Persian glam on Sunset Blvd."],
["Million Dollar Listing New York","Fredrik Eklund · Ryan Serhant · Steve Gold","High-kicks for closings."],
["Million Dollar Listing Los Angeles","Josh Flagg · Josh Altman · Tracy Tutor","Hollywood Hills, open house."],
["Ladies of London","Caroline Stanbury · Marissa Hermer · Julie Montagu","Tea, titles and tension."],
["Family Karma","Brian Benni · Monica Vaswani · Vishal Parvani","Miami family, Indian-American style."],
["Project Runway","Christian Siriano · Nina Garcia · Brandon Maxwell · Elaine Welteroth","Back on Bravo. “Make it work!”"],
["BravoCon","Hosted by Andy Cohen","Every Housewife, one stage."],
["RHOBH: The Reunion","Moderated by Andy Cohen","Sequins on the reunion couch."]];
M[13]={name:"January",accent:"#ffd34d",stamp:"🥂",sky:["#120612","#3a0d3a"],ground:"#1a1015",path:"#2b1b2b",tile:"#6a0f2a",
 title:"Bravo Takes Broadway",spots:BRAVO.map((b,i)=>`${b[0]} · ${THEATRES[i]}`),props:["🥂","💎","🎭","📸","💄","👠","🍾","⭐","🎤","💅"]};
M[14]={name:"February",accent:"#ff7eb6",stamp:"💘",sky:["#2a0f4a","#ff9ec7"],ground:"#f6c6e0",path:"#fff0f7",tile:"#b0306a",
 title:"A Valentine Dreamscape",
 spots:["Cloud Gate of Hearts","Rose-Petal River","Cotton Candy Clouds","Moonlit Swing","Floating Lantern Lake","Heart Balloon Ferry","Chocolate Waterfall","Love-Letter Library","Starlit Gondola","Pearl Staircase","Candy Heart Meadow","Crystal Rose Garden","Valentine's Eve Sky","Valentine's Day Palace","Dream Carousel","Silk Ribbon Bridge","Kiss-the-Moon Pier","Sugar-Glass Forest","Lullaby Lighthouse","Cupid's Archery Field","Velvet Night Bloom","Twin-Star Observatory","Strawberry Fields","Bubble Bath Lagoon","Paper Hearts Sky","Moonbeam Ballroom","Pink Aurora Peak","Sweet Dreams Cottage"],
 props:["💖","🌹","🎈","💌","🕊️","🦋","🍫","✨","💫","🌸"]};
// Verified open Oct 2026 via web sources; coords = OSM Nominatim (lat/lon) projected to km on the Philly grid (rotated 9.2°): [name,address,u(km, west+),v(km, south+)]
const BARS=[["Paddy's Pub Old City", "228 Race St", -1.2789, -0.6331],["The Victoria Freehouse", "10 S Front St", -1.4923, -0.1667],["The Monto", "226 Market St", -1.283, -0.1878],["National Mechanics", "22 S 3rd St", -1.1699, -0.1415],["Sassafras Bar", "48 S 2nd St", -1.3545, -0.089],["Khyber Pass Pub", "56 S 2nd St", -1.3548, -0.0625],["The Plough & the Stars", "123 Chestnut St", -1.3991, -0.072],["Cavanaugh's Headhouse", "421 S 2nd St", -1.3401, 0.6233],["The Twisted Tail", "509 S 2nd St", -1.3942, 0.6907],["O'Neals Pub", "611 S 3rd St", -1.2011, 0.8099],["Tattooed Mom", "530 South St", -0.8283, 0.7931],["Bob & Barbara's Lounge", "1509 South St", 0.5202, 0.7626],["Dirty Franks", "347 S 13th St", 0.1536, 0.5384],["Tavern on Camac", "243 S Camac St", 0.0888, 0.321],["Moriarty's Restaurant & Irish Pub", "1116 Walnut St", -0.0355, 0.1459],["Fergie's Pub", "1214 Sansom St", 0.0902, 0.0582],["McGillin's Olde Ale House", "1310 Drury St", 0.2197, 0.0131],["Finn McCool's Ale House", "118 S 12th St", 0.0364, 0.0356],["Molly Malloy's", "Reading Terminal Market, 51 N 12th St", -0.0252, -0.3752],["Tír na nÓg", "1600 Arch St", 0.646, -0.3936],["Con Murphy's Irish Pub", "1700 Benjamin Franklin Pkwy", 0.7904, -0.5073],["City Tap House Logan Square", "100 N 18th St", 0.9049, -0.4534],["The Goat Rittenhouse", "1907 Sansom St", 1.0541, 0.0354],["Cavanaugh's Rittenhouse", "1921 Sansom St", 1.0695, 0.0355],["Bonner's Irish Pub", "120 S 23rd St", 1.5875, 0.0351],["Grace Tavern", "2229 Grays Ferry Ave", 1.5584, 0.7995],["TenStone", "2063 South St", 1.3283, 0.7559],["Locust Rendezvous", "1415 Locust St", 0.4479, 0.2185],["Fadó Irish Pub", "1500 Locust St", 0.5182, 0.2818],["Misconduct Tavern", "1511 Locust St", 0.5276, 0.2344],["Good Dog Bar", "224 S 15th St", 0.5089, 0.219]];
const MAPD={"streets": [["Front", -1.5117], ["2nd", -1.3554], ["3rd", -1.1886], ["4th", -1.0537], ["5th", -0.9156], ["6th", -0.7795], ["7th", -0.6419], ["8th", -0.5084], ["9th", -0.3728], ["10th", -0.237], ["11th", -0.1019], ["12th", 0.0337], ["13th", 0.1696], ["Broad", 0.3703], ["15th", 0.499], ["16th", 0.6354], ["17th", 0.771], ["18th", 0.9061], ["19th", 1.0423], ["20th", 1.1778], ["21st", 1.3459], ["22nd", 1.4801], ["23rd", 1.5796]], "aves": [["Race", -0.6357], ["Arch", -0.4067], ["Market", -0.17], ["Chestnut", -0.0313], ["Walnut", 0.1383], ["Locust", 0.2672], ["Spruce", 0.4237], ["Pine", 0.5341], ["Lombard", 0.6657], ["South", 0.784]], "lm": {"City Hall": [0.3449, -0.2138], "Rittenhouse Sq": [0.9814, 0.2157], "Washington Sq": [-0.6679, 0.2401], "Logan Sq": [0.9675, -0.6524], "Franklin Sq": [-0.7143, -0.7459], "ArtMuseum": [2.0402, -1.4227], "Delaware": [-1.7205, -0.2796], "Schuylkill": [1.9659, 0.0946]}};
M[15]={name:"March",accent:"#3ddc6b",stamp:"☘️",sky:["#04210f","#0f4d26"],ground:"#0c2e18",path:"#e9f5d0",tile:"#0d6b34",
 title:"St. Patrick's Bar Hop · Center City Philadelphia",spots:BARS.map(b=>b[0]),props:["🍺","☘️","🍀","🎻","🥃","🪙","🌈","🎩","🥔","🍻"],map:true};
// --- March map board (simplified Center City grid)
function marchBoard(W0,H0){const T=M[15],U0=-1.78,U1=2.12,V0=-0.95,V1=0.92;
 const W=Math.max(W0,1150),k=W/(U1-U0),top=110,H=Math.max(H0,top+(V1-V0)*k+20);
 const cx=u=>W-(u-U0)*k, cy=v=>top+(v-V0)*k; // east on right, north up
 let s=`<rect width="${W}" height="${H}" fill="${T.ground}"/>`;
 const D=MAPD.lm.Delaware,S=MAPD.lm.Schuylkill;
 s+=`<rect x="${cx(-1.62)}" y="0" width="${W}" height="${H}" fill="#123a5a"/><path d="M${cx(1.86)} 0 L${cx(1.80)} ${cy(0.1)} L${cx(1.9)} ${H} L0 ${H} L0 0Z" fill="#123a5a"/>`;
 s+=`<text x="${cx(-1.7)}" y="${cy(0.3)}" fill="#7fb6e0" font-size="13" transform="rotate(-90 ${cx(-1.7)} ${cy(0.3)})" text-anchor="middle">Delaware River</text><text x="${cx(1.98)}" y="${cy(0.3)}" fill="#7fb6e0" font-size="13" transform="rotate(-90 ${cx(1.98)} ${cy(0.3)})" text-anchor="middle">Schuylkill River</text>`;
 const sq=(n,l)=>{const p=MAPD.lm[n],h=.085;s+=`<rect x="${cx(p[0]+h)}" y="${cy(p[1]-h)}" width="${2*h*k}" height="${2*h*k}" fill="#1f6e35"/><text x="${cx(p[0])}" y="${cy(p[1])+4}" text-anchor="middle" fill="#cfe" font-size="10">${l}</text>`};
 sq('Rittenhouse Sq','Rittenhouse Sq');sq('Washington Sq','Washington Sq');sq('Franklin Sq','Franklin Sq');
 const L=MAPD.lm['Logan Sq'];s+=`<circle cx="${cx(L[0])}" cy="${cy(L[1])}" r="${.07*k}" fill="#1f6e35"/><text x="${cx(L[0])}" y="${cy(L[1])+4}" text-anchor="middle" fill="#cfe" font-size="10">Logan Sq</text>`;
 const C=MAPD.lm['City Hall'],A=MAPD.lm.ArtMuseum;
 s+=`<line x1="${cx(C[0])}" y1="${cy(C[1])}" x2="${cx(A[0])}" y2="${cy(A[1])}" stroke="#4a6b52" stroke-width="7"/><text x="${cx(1.35)}" y="${cy(-0.9)}" fill="#cfe" font-size="11" transform="rotate(-32 ${cx(1.35)} ${cy(-0.9)})">Ben Franklin Pkwy</text>`;
 MAPD.streets.forEach(([n,u])=>{const x=cx(u),b=n=='Broad';s+=`<line x1="${x}" y1="${cy(-0.8)}" x2="${x}" y2="${cy(0.86)}" stroke="${b?'#5f8f68':'#2f5a3c'}" stroke-width="${b?5:1.6}"/><text x="${x}" y="${cy(-0.82)}" fill="#9fd4a8" font-size="10" text-anchor="middle">${n}${b?' St':''}</text>`});
 MAPD.aves.forEach(([n,v])=>{const y=cy(v),m=n=='Market';s+=`<line x1="${cx(1.6)}" y1="${y}" x2="${cx(-1.52)}" y2="${y}" stroke="${m?'#5f8f68':'#2f5a3c'}" stroke-width="${m?5:1.6}"/><text x="${cx(1.62)}" y="${y+4}" fill="#9fd4a8" font-size="10" text-anchor="end">${n} St</text>`});
 s+=`<rect x="${cx(C[0])-14}" y="${cy(C[1])-12}" width="28" height="24" fill="#b39b55"/><text x="${cx(C[0])}" y="${cy(C[1])+24}" text-anchor="middle" fill="#ffe9a8" font-size="10">City Hall</text>`;
 const P=BARS.map(b=>[cx(b[2]),cy(b[3])]),ts=40;
 // tiles drawn on a short leader line from true spot when crowded
 const Q=P.map(p=>[p[0],p[1]]);for(let it=0;it<120;it++)for(let i=0;i<Q.length;i++)for(let j=i+1;j<Q.length;j++){const dx=Q[j][0]-Q[i][0],dy=Q[j][1]-Q[i][1],d=Math.hypot(dx,dy)||1,mn=ts*1.08;if(d<mn){const f=(mn-d)/2/d;Q[i][0]-=dx*f;Q[i][1]-=dy*f;Q[j][0]+=dx*f;Q[j][1]+=dy*f}}
 P.forEach((p,i)=>{s+=`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#ffd34d"/><line x1="${p[0]}" y1="${p[1]}" x2="${Q[i][0]}" y2="${Q[i][1]}" stroke="#ffd34d" stroke-width="1" opacity=".7"/>`});
 return {s,P:Q,ts,W,H}}

// toy-brick-style minifigures (generic, show-themed; not likenesses)
function minifig(o){const{x=0,sc=1,skin='#ffd23f',torso='#c2185b',legs='#222',hair='#5a3a1a',hat='',item='',flip=1}=o;
 const it={wine:'<g transform="translate(46,58)"><path d="M0 0 h10 l-2 10 h-6z" fill="#fff8" stroke="#fff"/><rect x="4" y="10" width="2" height="8" fill="#fff"/><path d="M1 2 h8 l-1 5 h-6z" fill="#8b0030"/></g>',
  champ:'<g transform="translate(46,52)"><rect x="2" y="0" width="5" height="20" fill="#fff8" stroke="#fff"/><rect x="3" y="6" width="3" height="13" fill="#ffd34d"/></g>',
  tray:'<g transform="translate(36,58)"><rect x="0" y="0" width="26" height="3" fill="#ccc"/><rect x="4" y="-10" width="5" height="10" fill="#ffd34d" opacity=".8"/><rect x="14" y="-12" width="6" height="12" fill="#e33" opacity=".7"/></g>',
  shaker:'<g transform="translate(46,48)"><rect x="0" y="0" width="9" height="20" rx="2" fill="#cfd8dc" stroke="#90a4ae"/><rect x="2" y="-5" width="5" height="6" fill="#90a4ae"/></g>',
  wheel:'<g transform="translate(42,52)"><circle cx="10" cy="10" r="10" fill="none" stroke="#8d5524" stroke-width="3"/><path d="M10 0v20M0 10h20M3 3l14 14M17 3L3 17" stroke="#8d5524" stroke-width="2"/></g>',
  rope:'<g transform="translate(44,56)"><circle cx="8" cy="8" r="7" fill="none" stroke="#e0c08a" stroke-width="3"/></g>',
  knife:'<g transform="translate(46,50)"><rect x="3" y="12" width="4" height="8" fill="#5d4037"/><path d="M3 12 L3 -6 L8 -2 L7 12z" fill="#eceff1"/></g>',
  mic:'<g transform="translate(46,48)"><rect x="3" y="6" width="4" height="16" fill="#333"/><circle cx="5" cy="4" r="5" fill="#777"/></g>',
  key:'<g transform="translate(44,56)"><circle cx="5" cy="5" r="5" fill="none" stroke="#ffd34d" stroke-width="3"/><rect x="9" y="4" width="12" height="3" fill="#ffd34d"/></g>',
  scissors:'<g transform="translate(44,54)"><circle cx="4" cy="12" r="4" fill="none" stroke="#e91e63" stroke-width="2"/><circle cx="14" cy="12" r="4" fill="none" stroke="#e91e63" stroke-width="2"/><path d="M6 9 L14 -6 M12 9 L4 -6" stroke="#cfd8dc" stroke-width="2"/></g>',
  purse:'<g transform="translate(44,60)"><path d="M3 4 q6 -10 12 0" fill="none" stroke="#333" stroke-width="2"/><rect x="0" y="4" width="18" height="12" rx="2" fill="#e91e63"/></g>',
  }[item]||'';
 const hats={captain:'<rect x="11" y="-4" width="30" height="8" rx="2" fill="#fff"/><rect x="8" y="3" width="36" height="4" fill="#0d1b4c"/><circle cx="26" cy="0" r="2.5" fill="#ffd34d"/>',
  chef:'<rect x="13" y="-14" width="26" height="16" rx="7" fill="#fff"/><rect x="13" y="-2" width="26" height="6" fill="#fff"/>',
  tiara:'<path d="M14 2 l4 -8 l4 6 l4 -9 l4 9 l4 -6 l4 8z" fill="#ffd34d"/>',
  cap:'<path d="M12 4 q14 -16 28 0z" fill="#1565c0"/><rect x="34" y="2" width="12" height="3" fill="#1565c0"/>',
  bun:'<circle cx="26" cy="-3" r="7" fill="'+hair+'"/>'}[hat]||'';
 const hairSvg=hair?`<path d="M10 8 q16 -14 32 0 v6 h-32z" fill="${hair}"/>${hat?'':`<path d="M10 10 v18 h5 v-14z M42 10 v18 h-5 v-14z" fill="${hair}" opacity="${o.long?1:0}"/>`}`:'';
 return `<svg viewBox="-6 -18 64 118" width="${70*sc}" height="${129*sc}" style="position:absolute;left:${x}%;bottom:3%;z-index:6;filter:drop-shadow(0 6px 4px rgba(0,0,0,.5));animation:bob ${2.4+Math.random()}s ease-in-out infinite">
 <rect x="20" y="-1" width="12" height="5" rx="1" fill="${skin}"/>
 <rect x="10" y="3" width="32" height="27" rx="7" fill="${skin}"/>
 <circle cx="20" cy="15" r="2.2" fill="#111"/><circle cx="32" cy="15" r="2.2" fill="#111"/><path d="M19 21 q7 6 14 0" stroke="#111" stroke-width="2" fill="none"/>
 ${hairSvg}${hats}
 <rect x="21" y="30" width="10" height="4" fill="${skin}"/>
 <path d="M10 34 h32 l5 30 h-42z" fill="${torso}"/><rect x="24" y="38" width="4" height="22" fill="#0002"/>
 <path d="M10 35 l-7 24 l6 2 l6 -20z M42 35 l7 24 l-6 2 l-6 -20z" fill="${torso}"/>
 <path d="M0 61 a5 5 0 1 0 9 1 l-3 0 a2 2 0 1 1 -3 -1z" fill="${skin}"/><path d="M44 61 a5 5 0 1 0 9 1 l-3 0 a2 2 0 1 1 -3 -1z" fill="${skin}"/>
 <rect x="5" y="64" width="42" height="7" fill="${legs}"/><rect x="6" y="71" width="19" height="25" fill="${legs}"/><rect x="27" y="71" width="19" height="25" fill="${legs}"/><rect x="25" y="71" width="2" height="12" fill="#0003"/>
 ${it}</svg>`}
const SKINS=['#ffd23f','#f1c27d','#c68642','#8d5524','#ffdbac','#e0ac69'];
function bravoCrew(d){const i=d-1,R=rnd(777+d),sk=()=>SKINS[Math.floor(R()*SKINS.length)],hc=()=>['#2b1a0e','#d8b04a','#111','#7a2e0e','#e8d6a0','#5a3a1a'][Math.floor(R()*6)];
 let type=i<10||i==30?'hw':i==10?'vpr':i<15?'boat':i<17?'house':i==17?'charm':i==18?'hosp':i==19?'med':i==20?'chef':i==21?'talk':i==22?'vpr':i==23?'hw':i<26?'realty':i==26?'hw':i==27?'house':i==28?'fashion':'talk';
 const glam=['#c2185b','#7b1fa2','#d4af37','#e91e63','#111','#00897b','#b71c1c'];
 const cfg={hw:()=>({torso:glam[Math.floor(R()*7)],legs:'#222',item:R()<.6?'wine':'purse',hat:R()<.3?'tiara':'',long:1}),
  vpr:()=>({torso:'#111',legs:'#111',item:R()<.5?'shaker':'tray',long:R()<.5?1:0}),
  boat:()=>({torso:'#fff',legs:'#0d1b4c',item:['wheel','rope','tray'][Math.floor(R()*3)],hat:R()<.4?'captain':'cap'}),
  house:()=>({torso:['#4fc3f7','#ff8a65','#aed581','#f06292'][Math.floor(R()*4)],legs:'#795548',item:R()<.5?'champ':'wine',hat:R()<.3?'cap':'',long:R()<.5?1:0}),
  charm:()=>({torso:['#fce4ec','#bbdefb','#c8e6c9'][Math.floor(R()*3)],legs:'#e0d5b5',item:'wine',long:R()<.5?1:0}),
  hosp:()=>({torso:'#111',legs:'#111',item:'tray',long:R()<.5?1:0}),
  med:()=>({torso:'#fff',legs:'#4db6ac',item:R()<.5?'wine':'purse',long:R()<.6?1:0}),
  chef:()=>({torso:'#fff',legs:'#333',item:'knife',hat:'chef'}),
  talk:()=>({torso:['#1565c0','#6a1b9a','#c62828'][Math.floor(R()*3)],legs:'#263238',item:R()<.5?'mic':'champ'}),
  realty:()=>({torso:'#263238',legs:'#263238',item:'key'}),
  fashion:()=>({torso:['#111','#e91e63','#ffeb3b'][Math.floor(R()*3)],legs:'#111',item:'scissors',hat:R()<.4?'bun':'',long:R()<.5?1:0})}[type];
 const xs=[0,15,63,79];return xs.map((x,k)=>minifig(Object.assign({x,sc:.95+R()*.25,skin:sk(),hair:hc(),flip:k<2?1:-1},cfg()))).join('')}

// --- per-month close-up extras
function closeExtra(m,d,R){
 if(m==13){const b=BRAVO[d-1],th=THEATRES[d-1];
  return `<div class="p" style="left:50%;top:30%;transform:translateX(-50%);width:min(92vw,520px);text-align:center;z-index:2">
  <div style="background:#1b0a10;border:6px solid #ffd34d;border-radius:10px;padding:10px 12px;box-shadow:0 0 30px #ffb300,inset 0 0 18px #ff9d00">
   <div class="bulbs"></div><div style="font:700 13px Georgia;letter-spacing:3px;color:#ffd34d">THE ${th.toUpperCase()} THEATRE · NOW PLAYING</div>
   <div style="font:900 clamp(18px,5vw,30px) Georgia;color:#fff;text-shadow:0 0 10px #ff4fa3;margin:4px 0">${b[0]}</div>
   <div style="font:italic 13px Georgia;color:#ffd9f0">${b[2]}</div></div></div>
  <div class="p" style="right:4%;bottom:6%;width:120px;z-index:6;background:#fff;color:#111;border-top:22px solid #ffd34d;padding:6px;font:10px/1.3 Georgia;transform:rotate(6deg);box-shadow:0 8px 18px rgba(0,0,0,.6)">
   <div style="font-weight:900;letter-spacing:2px;margin-top:-20px;color:#111">PLAYBILL</div><b>${b[0]}</b><br><i>Starring</i><br>${b[1].split(' · ').join('<br>')}</div>
  <div class="p" style="left:0;right:0;bottom:30%;height:6px;background:repeating-linear-gradient(90deg,#ffd34d 0 8px,transparent 8px 16px);animation:chase 1s linear infinite"></div>`+bravoCrew(d)}
 if(m==14)return `<div class="p" style="inset:0;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.35),transparent 60%);animation:fog 5s ease-in-out infinite"></div>`+Array.from({length:12},()=>`<span class="p" style="left:${R()*100}%;bottom:-10%;font-size:${18+R()*26}px;animation:rise ${7+R()*7}s linear ${-R()*10}s infinite">${["💖","💗","💕","🎈"][Math.floor(R()*4)]}</span>`).join('')+(d==14?`<div class="p" style="left:0;right:0;top:44%;text-align:center;font:900 30px Georgia;color:#fff;text-shadow:0 0 18px #ff2f7a">Happy Valentine's Day</div>`:'');
 if(m==15){const b=BARS[d-1];return `<div class="p" style="left:50%;top:32%;transform:translateX(-50%);z-index:2;text-align:center;background:#0b2a14;border:5px solid #c9a227;border-radius:12px;padding:10px 18px;box-shadow:0 0 24px #3ddc6b">
  <div style="font:900 clamp(20px,6vw,34px) Georgia;color:#3ddc6b;text-shadow:0 0 12px #3ddc6b;animation:flick 3s infinite">${b[0]}</div><div style="font:13px Georgia;color:#f5e6b8">${b[1]} · Philadelphia</div>
  <div style="font:12px Georgia;color:#fff;opacity:.8">Stop ${d} of 31 on the hop${d==17?' · ☘️ ST. PATRICK’S DAY ☘️':''}</div></div>
  <div class="p" style="left:6%;bottom:26%;width:22%;height:30%;background:linear-gradient(#ffcf6b,#c9781f);border:6px solid #3b2410;border-radius:6px 6px 0 0;opacity:.9;box-shadow:0 0 30px #ffb347"></div>`}
 return ''}
document.head.insertAdjacentHTML('beforeend','<style>@keyframes rise{to{transform:translateY(-120vh)}}@keyframes chase{to{background-position:16px 0}}</style>');
