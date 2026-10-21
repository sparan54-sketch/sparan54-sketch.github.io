// ===== 2027 months (keys 13=Jan,14=Feb,15=Mar). Shown live only if key in LIVE (else ?wip=1)
const THEATRES=["Majestic","Shubert","Broadhurst","Booth","Imperial","Winter Garden","Gershwin","Lyceum","Ambassador","Ethel Barrymore","Belasco","Hudson","Lunt-Fontanne","Minskoff","Nederlander","Neil Simon","New Amsterdam","Palace","Richard Rodgers","St. James","Al Hirschfeld","August Wilson","Circle in the Square","James Earl Jones","Eugene O'Neill","John Golden","Hayes","Longacre","Lyric","Marquis","Music Box"];
const BRAVO=[
["The Real Housewives of New York City","Bethenny Frankel · Luann de Lesseps · Ramona Singer · Sonja Morgan","“Money can't buy you class.”"],
["The Real Housewives of Beverly Hills","Kyle Richards · Lisa Vanderpump · Lisa Rinna · Erika Jayne","Diamonds, dinner parties, and a reunion couch."],
["The Real Housewives of Atlanta","NeNe Leakes · Kandi Burruss · Porsha Williams · Kenya Moore","“Close your legs to married men.”"],
["The Real Housewives of Salt Lake City","Lisa Barlow · Heather Gay · Whitney Rose · Meredith Marks","Snow, glam and Bad Weather."],
["The Real Housewives of Potomac","Gizelle Bryant · Karen Huger · Robyn Dixon · Ashley Darby","Etiquette, darling. The Grande Dame enters."],
["The Real Housewives of Orange County","Vicki Gunvalson · Tamra Judge · Shannon Beador · Heather Dubrow","“Woo-hoo!” The OG franchise."],
["The Real Housewives of New Jersey","Teresa Giudice · Melissa Gorga · Dolores Catania · Margaret Josephs","Table-flipping, family-style."],
["The Real Housewives of Miami","Lisa Hochstein · Larsa Pippen · Alexia Nepola · Guerdy Abraira","Sun, yachts and Miami heat."],
["The Real Housewives of Dubai","Caroline Stanbury · Chanel Ayan · Sara Al Madani · Lesa Milan","Desert glamour, sky-high."],
["The Real Housewives of Dallas","D'Andra Simmons · Brandi Redmond · Kameron Westcott","Big hair, bigger drama."],
["Vanderpump Rules","Lisa Vanderpump · Ariana Madix · Tom Sandoval · James Kennedy","Now serving at SUR."],
["Below Deck","Captain Lee Rosbach · Kate Chastain · Eddie Lucas","“Stew, a word?” All hands on deck."],
["Below Deck Mediterranean","Captain Sandy Yawn · Hannah Ferrier · Malia White","Charter season on the Med."],
["Below Deck Sailing Yacht","Captain Glenn Shephard · Daisy Kelliher · Gary King","Sails up, drama up."],
["Below Deck Down Under","Captain Jason Chambers · Aesha Scott","G'day from the bridge."],
["Summer House","Kyle Cooke · Amanda Batula · Lindsay Hubbard · Carl Radke · Paige DeSorbo","Loverboy on tap in the Hamptons."],
["Winter House","Kyle Cooke · Paige DeSorbo · Craig Conover","Ski lodge hookups."],
["Southern Charm","Shep Rose · Craig Conover · Madison LeCroy · Austen Kroll · Patricia Altschul","Charleston manners, mostly."],
["Southern Hospitality","Joe Bradley · Leva Bonaparte · Grace Lilly","Front of house at Republic."],
["Married to Medicine","Dr. Simone Whitmore · Quad Webb · Toya Bush-Harris · Dr. Heavenly Kimes","Scrubs and scandal in Atlanta."],
["Top Chef","Padma Lakshmi · Tom Colicchio · Gail Simmons · Kristen Kish","“Please pack your knives and go.”"],
["Watch What Happens Live","Andy Cohen","Live from the Clubhouse. Shotski!"],
["The Valley","Jax Taylor · Brittany Cartwright · Kristen Doute","Pump Rules, the suburbs edition."],
["Shahs of Sunset","Reza Farahan · Mercedes “MJ” Javid · Golnesa “GG” Gharachedaghi","Persian glam on Sunset Blvd."],
["Million Dollar Listing New York","Fredrik Eklund · Ryan Serhant · Steve Gold","High-kicks for closings."],
["Million Dollar Listing Los Angeles","Josh Flagg · Josh Altman · James Harris","Hollywood Hills, open house."],
["Ladies of London","Caroline Stanbury · Marissa Hermer · Julie Montagu","Tea, titles and tension."],
["Family Karma","Brian Benni · Monica Vaswani · Vishal Parvani","Miami family, Indian-American style."],
["Project Runway","Heidi Klum · Tim Gunn","“Make it work!”"],
["BravoCon","Hosted by Andy Cohen","Every Housewife, one stage."],
["RHOBH: The Reunion","Moderated by Andy Cohen","Sequins on the reunion couch."]];
M[13]={name:"January",accent:"#ffd34d",stamp:"🥂",sky:["#120612","#3a0d3a"],ground:"#1a1015",path:"#2b1b2b",tile:"#6a0f2a",
 title:"Bravo Takes Broadway",spots:BRAVO.map((b,i)=>`${b[0]} · ${THEATRES[i]}`),props:["🥂","💎","🎭","📸","💄","👠","🍾","⭐","🎤","💅"]};
M[14]={name:"February",accent:"#ff7eb6",stamp:"💘",sky:["#2a0f4a","#ff9ec7"],ground:"#f6c6e0",path:"#fff0f7",tile:"#b0306a",
 title:"A Valentine Dreamscape",
 spots:["Cloud Gate of Hearts","Rose-Petal River","Cotton Candy Clouds","Moonlit Swing","Floating Lantern Lake","Heart Balloon Ferry","Chocolate Waterfall","Love-Letter Library","Starlit Gondola","Pearl Staircase","Candy Heart Meadow","Crystal Rose Garden","Valentine's Eve Sky","Valentine's Day Palace","Dream Carousel","Silk Ribbon Bridge","Kiss-the-Moon Pier","Sugar-Glass Forest","Lullaby Lighthouse","Cupid's Archery Field","Velvet Night Bloom","Twin-Star Observatory","Strawberry Fields","Bubble Bath Lagoon","Paper Hearts Sky","Moonbeam Ballroom","Pink Aurora Peak","Sweet Dreams Cottage"],
 props:["💖","🌹","🎈","💌","🕊️","🦋","🍫","✨","💫","🌸"]};
const BARS=[ // name, address, col (street # east->west, Front=1), row (0 Race,1 Arch,2 Market,3 Chestnut,4 Walnut,5 Locust,6 Spruce,7 Pine,8 Lombard,9 South)
["The Plough & the Stars","123 Chestnut St",1.3,3],["Khyber Pass Pub","56 S 2nd St",2,2.7],["Sassafras Bar","48 S 2nd St",2.1,2.4],["National Mechanics","22 S 3rd St",3,2.4],
["Mac's Tavern","226 Market St",2.4,2],["Sugar Mom's","225 Church St",2.4,1.4],["Paddy's Pub Old City","228 Race St",2.4,0],["Dark Horse Pub","421 S 2nd St",2,7.6],
["O'Neals Pub","611 S 3rd St",3,9.4],["Tattooed Mom","530 South St",5.3,9],["Bob & Barbara's Lounge","1509 South St",15,9],["Dirty Frank's","347 S 13th St",13,6.6],
["Tavern on Camac","243 S Camac St",12.5,5.6],["Moriarty's Irish Pub","1116 Walnut St",11.2,4],["The Irish Pub","1123 Walnut St",11.5,4.1],["Fergie's Pub","1214 Sansom St",12.3,3.5],
["McGillin's Olde Ale House","1310 Drury St",13.2,3.3],["Locust Rendezvous","1415 Locust St",14.3,5],["Fadó Irish Pub","1500 Locust St",15.1,5],["Misconduct Tavern","1511 Locust St",15.4,5.1],
["Good Dog Bar","224 S 15th St",15,5.4],["McGlinchey's","259 S 15th St",15,5.8],["The Black Sheep Pub","247 S 17th St",17,5.6],["Cavanaugh's Rittenhouse","1823 Sansom St",18.4,3.5],
["Con Murphy's Irish Pub","1700 Benjamin Franklin Pkwy",17,0.6],["City Tap House Logan Square","2 Logan Sq",18.5,0.2],["Bonner's Irish Pub","120 S 23rd St",23,3.4],["The Bards","2013 Walnut St",20.2,4],
["Ten Stone","2063 South St",20.6,9],["Doobies","2201 Lombard St",22,8],["Grace Tavern","2229 Grays Ferry Ave",22.4,9.8]];
M[15]={name:"March",accent:"#3ddc6b",stamp:"☘️",sky:["#04210f","#0f4d26"],ground:"#0c2e18",path:"#e9f5d0",tile:"#0d6b34",
 title:"St. Patrick's Bar Hop · Center City Philadelphia",spots:BARS.map(b=>b[0]),props:["🍺","☘️","🍀","🎻","🥃","🪙","🌈","🎩","🥔","🍻"],map:true};
// --- March map board (simplified Center City grid)
function marchBoard(W,H){const T=M[15],X0=W*.04,X1=W*.96,Y0=H*.2,Y1=H*.95;
 const cx=c=>X1-(c-1)/(23.5-1)*(X1-X0), cy=r=>Y0+r/10*(Y1-Y0);
 const ST=["Front","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","Broad","15th","16th","17th","18th","19th","20th","21st","22nd","23rd"];
 const AV=["Race","Arch","Market","Chestnut","Walnut","Locust","Spruce","Pine","Lombard","South"];
 let s=`<rect width="${W}" height="${H}" fill="${T.ground}"/>`;
 // Delaware river east, Schuylkill west
 s+=`<rect x="${X1+6}" y="0" width="${W}" height="${H}" fill="#123a5a"/><rect x="0" y="0" width="${X0-6}" height="${H}" fill="#123a5a"/>`;
 s+=`<text x="${W-8}" y="${H*.6}" fill="#7fb6e0" font-size="11" transform="rotate(-90 ${W-8} ${H*.6})">Delaware River</text><text x="12" y="${H*.6}" fill="#7fb6e0" font-size="11" transform="rotate(-90 12 ${H*.6})">Schuylkill River</text>`;
 // city hall + rittenhouse + washington sq
 s+=`<rect x="${cx(14.6)}" y="${cy(2.15)}" width="${cx(13.4)-cx(14.6)}" height="${cy(2.85)-cy(2.15)}" fill="#8a7a4a" opacity=".6"/><text x="${cx(14)}" y="${cy(2.6)}" text-anchor="middle" fill="#ffe9a8" font-size="10">City Hall</text>`;
 s+=`<rect x="${cx(18.9)}" y="${cy(4.1)}" width="${cx(18.1)-cx(18.9)}" height="${cy(5.9)-cy(4.1)}" fill="#1f6e35"/><text x="${cx(18.5)}" y="${cy(5.1)}" text-anchor="middle" fill="#cfe" font-size="9">Rittenhouse Sq</text>`;
 s+=`<rect x="${cx(6.9)}" y="${cy(4.1)}" width="${cx(6.1)-cx(6.9)}" height="${cy(5.9)-cy(4.1)}" fill="#1f6e35"/><text x="${cx(6.5)}" y="${cy(5.1)}" text-anchor="middle" fill="#cfe" font-size="9">Wash. Sq</text>`;
 s+=`<line x1="${cx(15)}" y1="${cy(1.8)}" x2="${cx(22.5)}" y2="${cy(-1.2)}" stroke="#4a6b52" stroke-width="5"/><text x="${cx(20.5)}" y="${cy(-0.2)}" fill="#cfe" font-size="10" transform="rotate(-18 ${cx(20.5)} ${cy(-0.2)})">Ben Franklin Pkwy</text>`;
 ST.forEach((n,i)=>{const x=cx(i+1);s+=`<line x1="${x}" y1="${cy(-.3)}" x2="${x}" y2="${cy(9.9)}" stroke="#2f5a3c" stroke-width="${n=='Broad'?4:1.5}"/>`;if(i%2==0||n=='Broad')s+=`<text x="${x}" y="${cy(-.45)}" fill="#9fd4a8" font-size="9" text-anchor="middle">${n}</text>`});
 AV.forEach((n,i)=>{const y=cy(i);s+=`<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y}" stroke="#2f5a3c" stroke-width="${n=='Market'?4:1.5}"/><text x="${X0+3}" y="${y-3}" fill="#9fd4a8" font-size="9">${n} St</text>`});
 // pts with simple overlap relaxation
 let P=BARS.map(b=>[cx(b[2]),cy(b[3])]);const ts=Math.max(30,Math.min(W/22,56));
 for(let it=0;it<80;it++)for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const dx=P[j][0]-P[i][0],dy=P[j][1]-P[i][1],d=Math.hypot(dx,dy)||1,min=ts*1.05;if(d<min){const k=(min-d)/2/d;P[i][0]-=dx*k;P[i][1]-=dy*k;P[j][0]+=dx*k;P[j][1]+=dy*k}}
 return {s,P,ts}}
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
  <div class="p" style="left:0;right:0;bottom:30%;height:6px;background:repeating-linear-gradient(90deg,#ffd34d 0 8px,transparent 8px 16px);animation:chase 1s linear infinite"></div>`}
 if(m==14)return `<div class="p" style="inset:0;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.35),transparent 60%);animation:fog 5s ease-in-out infinite"></div>`+Array.from({length:12},()=>`<span class="p" style="left:${R()*100}%;bottom:-10%;font-size:${18+R()*26}px;animation:rise ${7+R()*7}s linear ${-R()*10}s infinite">${["💖","💗","💕","🎈"][Math.floor(R()*4)]}</span>`).join('')+(d==14?`<div class="p" style="left:0;right:0;top:44%;text-align:center;font:900 30px Georgia;color:#fff;text-shadow:0 0 18px #ff2f7a">Happy Valentine's Day</div>`:'');
 if(m==15){const b=BARS[d-1];return `<div class="p" style="left:50%;top:32%;transform:translateX(-50%);z-index:2;text-align:center;background:#0b2a14;border:5px solid #c9a227;border-radius:12px;padding:10px 18px;box-shadow:0 0 24px #3ddc6b">
  <div style="font:900 clamp(20px,6vw,34px) Georgia;color:#3ddc6b;text-shadow:0 0 12px #3ddc6b;animation:flick 3s infinite">${b[0]}</div><div style="font:13px Georgia;color:#f5e6b8">${b[1]} · Philadelphia</div>
  <div style="font:12px Georgia;color:#fff;opacity:.8">Stop ${d} of 31 on the hop${d==17?' · ☘️ ST. PATRICK’S DAY ☘️':''}</div></div>
  <div class="p" style="left:6%;bottom:26%;width:22%;height:30%;background:linear-gradient(#ffcf6b,#c9781f);border:6px solid #3b2410;border-radius:6px 6px 0 0;opacity:.9;box-shadow:0 0 30px #ffb347"></div>`}
 return ''}
document.head.insertAdjacentHTML('beforeend','<style>@keyframes rise{to{transform:translateY(-120vh)}}@keyframes chase{to{background-position:16px 0}}</style>');
