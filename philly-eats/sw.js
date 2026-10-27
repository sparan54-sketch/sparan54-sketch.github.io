const V='pe-v23',SHELL=['./','index.html','manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>fetch(u,{cache:'no-store'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('pe-')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
const nav=r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html');
e.respondWith(fetch(nav?new Request(r.url,{cache:'no-store',credentials:'same-origin'}):r,nav?{}:{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(nav?'index.html':r,cp))}return res}).catch(()=>caches.match(nav?'index.html':r,{ignoreSearch:true}).then(h=>h||caches.match('index.html')||caches.match('./'))))});
