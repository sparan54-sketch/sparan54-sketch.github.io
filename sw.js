const V='cal-v4',SHELL=['./','index.html','manifest.webmanifest','icons/splash-1170x2532.jpg.b64','icons/splash-1179x2556.jpg.b64'];
function monthAssets(){const out=[],n=new Date();for(let k=0;k<2;k++){const d=new Date(n.getFullYear(),n.getMonth()+k,1),y=d.getFullYear(),m=d.getMonth()+1,days=new Date(y,m,0).getDate();for(let i=1;i<=days;i++)out.push(`assets/backdrops/${y}-${String(m).padStart(2,'0')}-${String(i).padStart(2,'0')}.jpg`)}return out}
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(SHELL);await Promise.all(monthAssets().flatMap(u=>[u,u+'.b64']).map(u=>c.add(u).catch(()=>{})))}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 if(u.hostname.endsWith('textdb.dev')){e.respondWith(fetch(r,{cache:'no-store'}));return} // network only, never cached
 if(u.origin!==location.origin)return;
 if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html')){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res});return hit||net}))});
