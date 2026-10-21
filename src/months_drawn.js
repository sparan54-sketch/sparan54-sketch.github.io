// ===== Drawn "one moment" scenes for Feb–Nov 2027. Day spec: [caption, setting, settingOpts, landmark, fg, props[[name,...args]], handProp]
const DRAWN_ON=__DRAWN__;
function renderSpec(k,d,R,S){const [cap,set,so,lm,fg,props,hand]=S,T=M[k];
 const art=ST[set](so||{})+(lm?(Array.isArray(lm)?LM[lm[0]](...lm.slice(1)):LM[lm]()):'')+(props||[]).map(p=>p[0]=='flag'?flagArt(p[1],p[2],p[3]):p[0]=='sign'?A.sign(p[1],p[2],p[3],p[4],p[5],p[6]):(P[p[0]]||A[p[0]])(...p.slice(1))).join('');
 const fgh=Array.isArray(fg)?FG[fg[0]](...fg.slice(1)):FG[fg||'none']();
 return drawnScene(T,d,{art,fg:fgh,hand:hand?P[hand](0,0,1):'',title:T.spots[d-1],cap})}
const DS={};
function hookDrawn(){DRAWN_ON.forEach(k=>{if(!M[k]||!DS[k])return;const old=M[k].extra;M[k].extra=(d,R)=>DS[k][d-1]?renderSpec(k,d,R,DS[k][d-1]):(old?old(d,R):'')});}
DS[14]=[
["Walkin' through a giant cloud gate shaped like a heart","dream",{},null,"none",[["heart",200,200,3.2,"#ff4d8a"],["heart",80,230,1,"#ff9ec7"],["heart",320,230,1,"#ff9ec7"]],"rose"],
["Floatin' down a river of rose petals in a little boat","nightlake",{},null,["water","#c2185b"],[["boat",110,230,1.2,"#ff4d8a"],["rose",300,230,1.2],["rose",340,232,1]],"heart"],
["Sharin' cotton candy on top of the clouds","clouds",{},null,"none",[["cone",90,230,1.6,"#ff9ec7"],["cone",310,230,1.6,"#9ecbff"]],"cone"],
["Swingin' together under the full moon","night",{a:"#1a0f3a",b:"#5a2a7a",g:"#3a2a5a"},null,"none",[["swing",200,236],["tree",60,236,1.6,"#2a1a4a"],["tree",350,236,1.8,"#2a1a4a"]],"heart"],
["Releasin' floating lanterns over the lake","nightlake",{lan:1},null,["water","#2a1f5a"],[["lantern",120,200,1.4],["lantern",290,190,1.4]],"lantern"],
["Ridin' a ferry lifted by heart balloons","dream",{a:"#7ab8ff",b:"#ffd1e6"},null,["water","#7ab8ff"],[["boat",200,200,2.2,"#c2185b"],["balloon",150,120,1.4,"#ff4d8a"],["balloon",200,100,1.6,"#ff9ec7"],["balloon",250,120,1.4,"#ff4d8a"]],"heart"],
["Dippin' strawberries under a chocolate waterfall","dream",{a:"#8a4a2a",b:"#f2c4a0",g:"#5a2a14"},["falls"],"none",[["heart",340,120,1,"#ff4d8a"]],"apple"],
["Readin' old love letters in a cozy library","cafe",{w:"#6a3a4a",w2:"#5a2a3a",t:"LOVE-LETTER LIBRARY"},null,["table","#8a5a32","#6a3a1a"],[["book",120,250,1.6,"#c2185b"],["book",290,250,1.6,"#7a2a8a"],["candle",200,250,1.4]],"book"],
["Driftin' through the canals in a starlit gondola","nightlake",{},null,["water","#2a1f5a"],[["boat",200,236,2,"#222"],["lantern",80,180,1.3],["lantern",320,180,1.3]],"rose"],
["Climbin' a staircase made of pearls into the sky","dream",{a:"#c8a8ff",b:"#fff0f7"},null,"none",Array.from({length:8},(_,i)=>["heart",60+i*40,260-i*22,.5,"#fff"]),"heart"],
["Pickin' candy hearts out of the meadow","meadow",{h1:"#ffb3d1",h2:"#ff9ec7"},null,["flowers",["#ff4d8a","#fff","#ffd34d"]],[["heart",80,230,.9,"#ff4d8a"],["heart",160,240,.7,"#ffd34d"],["heart",260,236,.8,"#9ecbff"],["heart",330,232,.9,"#fff"]],"heart"],
["Wanderin' a garden of crystal roses","garden",{c:["#c2185b","#ff9ec7","#fff"]},null,["flowers",["#c2185b","#ff9ec7","#fff"]],[["rose",100,232,2],["rose",300,232,2.2]],"rose"],
["Stargazin' on Valentine's Eve","night",{a:"#1a0f3a",b:"#ff6fae"},null,"none",[["telescope",310,236,1.6],["heart",80,90,1,"#ff4d8a"]],"heart"],
["Handin' my girl a heart-shaped box of chocolates at the Valentine's Day palace","dream",{a:"#ff6fae",b:"#ffe3f0"},["castle"],"none",[["sign",200,70,"HAPPY VALENTINE'S DAY","#c2185b","#fff",16]],"heart"],
["Ridin' the carousel horses side by side","dream",{a:"#9ecbff",b:"#ffe3f0"},null,"none",[["sign",200,110,"DREAM CAROUSEL","#ff4d8a","#fff",16]].concat([60,130,270,340].map((x,i)=>["balloon",x,240,1.3,["#ff4d6a","#ffd34d","#4dc3ff","#ff9ec7"][i]])),"heart"],
["Crossin' a bridge tied with silk ribbons","dream",{},["goldengate"],"none",[["heart",200,80,1,"#ff4d8a"]],"rose"],
["Kissin' at the end of the pier under the moon","nightlake",{},null,["railing","#c8a070"],[["heart",200,90,1.4,"#ff4d8a"]],"heart"],
["Strollin' through a forest of sugar glass","forest",{a:"#c8a8ff",b:"#ffe3f0",c:"#ff9ec7",g:"#ffd1e6"},null,"none",[["heart",320,100,.8,"#fff"]],"cone"],
["Watchin' the lighthouse sing a lullaby at dusk","cliffs",{a:"#5a3a8a",b:"#ff9ec7",sea:"#3a2a6a",c:"#6a4a7a"},["lighthouse",300,236],"none",[],"heart"],
["Takin' turns at Cupid's archery target","meadow",{h1:"#ffb3d1",h2:"#ff9ec7"},null,"none",[["dartboard",320,150],["heart",80,100,1,"#ff4d8a"]],"heart"],
["Watchin' night flowers bloom under velvet skies","night",{a:"#2a0a3a",b:"#6a2a6a",g:"#3a1a3a"},null,["flowers",["#c2185b","#9b59b6","#fff"]],[["flower",100,236,2,"#9b59b6"],["flower",300,236,2,"#c2185b"]],"rose"],
["Findin' our twin stars at the observatory","night",{a:"#0a0a2a",b:"#3a2a6a"},null,"none",[["telescope",200,236,2.4],["heart",120,60,.6,"#fff"],["heart",160,70,.6,"#fff"]],"heart"],
["Pickin' strawberries in the field","meadow",{h1:"#8fd17a",h2:"#6fbf5a"},null,["flowers",["#e53935","#fff"]],[["apple",100,240,1.6],["apple",300,240,1.6]],"apple"],
["Bubblin' in a pink bubble-bath lagoon","dream",{},null,["water","#ff9ec7"],Array.from({length:10},(_,i)=>["coin",30+i*38,200-(i%3)*20,.9]),"heart"],
["Makin' paper hearts dance across the sky","dream",{a:"#ffd1e6",b:"#fff"},null,"none",Array.from({length:8},(_,i)=>["heart",30+i*48,80+(i%3)*30,.7,["#ff4d8a","#fff","#ff9ec7"][i%3]]),"heart"],
["Slow-dancin' in the moonbeam ballroom","party",{w:"#3a2a5a",w2:"#2a1a4a",sign:"MOONBEAM BALLROOM"},null,"none",[],"rose"],
["Watchin' a pink aurora over the snowy peak","ice",{},null,"none",[["heart",200,70,1.4,"#ff9ec7"]],"heart"],
["Closin' the month at our sweet dreams cottage","night",{a:"#1a0f3a",b:"#ff9ec7",g:"#3a2a4a"},null,"none",[["candle",300,236,1.6],["heart",200,80,1,"#ff4d8a"]],"heart"]];
// March: St. Patrick's bar hop — each bar gets its own activity
{const ACT=[["Kickin' off the hop with pints at","pint","fiddle"],["Toastin' over the Delaware view at","pint","shamrock"],["Clinkin' Guinness glasses at","pint","shamrock"],["Shootin' darts at","beer","dartboard"],["Sippin' cozy cocktails at","beer","candle"],["Catchin' a live band at","pint","fiddle"],["Singin' along with Irish trad music at","pint","fiddle"],["Splittin' a basket of fries at","beer","shamrock"],["Playin' pool at","beer","dartboard"],["Watchin' the game with a cold one at","pint","shamrock"],["Admirin' the wild murals at","beer","candle"],["Sippin' citywide specials at","beer","shamrock"],["Holdin' our ground at the dive bar","pint","dartboard"],["Tuckin' into a tiny pub on Camac St at","pint","candle"],["Raisin' a pint at","pint","fiddle"],["Watchin' the footy at","pint","shamrock"],["Celebratin' St. Patrick's Day at Philly's oldest tavern,","beer","candle"],["Cheersin' at","pint","fiddle"],["Grabbin' Molly Malloy's Irish stew inside Reading Terminal,","pint","shamrock"],["Toastin' the luck of the Irish at","pint","shamrock"],["Hearin' the bagpipes outside","pint","fiddle"],["Samplin' a wall of taps at","beer","dartboard"],["Grabbin' a corner booth at","beer","candle"],["Splittin' a flight at","beer","shamrock"],["Winnin' trivia night at","pint","dartboard"],["Sippin' by the fireplace at","pint","candle"],["Lingerin' over Irish coffee at","beer","fiddle"],["Dancin' a jig at","pint","fiddle"],["Toastin' with Irish whiskey at","beer","shamrock"],["Chattin' with the bartender at","pint","candle"],["Endin' the hop with a dog-friendly pint at","pint","shamrock"]];
 DS[15]=BARS.map((b,i)=>{const [a,h,pr]=ACT[i];const nm=b[0].replace(/&/g,'and');return [a.endsWith(',')?`${a} ${nm}`:`${a} ${nm}`,"pub",{t:nm.toUpperCase().slice(0,26)},null,["counter","#3a2214","#c9a227"],[[h,110,236,1.6],[pr,pr=='dartboard'?330:300,pr=='dartboard'?120:236,pr=='dartboard'?1:1.6]].concat(i==16?[["sign",200,226,"ST. PATRICK'S DAY","#0d6b34","#ffd34d",14]]:[]),h]})}
