# usage: verify_bd.py K D1 D2  -> checks live site photo mode + caption for days
import sys
from playwright.sync_api import sync_playwright
K,a,b=int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[3])
with sync_playwright() as p:
  br=p.chromium.launch(executable_path='/usr/bin/google-chrome');pg=br.new_page(viewport={'width':390,'height':844})
  for d in range(a,b+1):
    pg.goto(f'https://sparan54-sketch.github.io/?m={K}&day={d}&v={d}7');pg.wait_for_timeout(3000)
    print(d,pg.evaluate("document.getElementById('scene').classList.contains('photo')"),pg.evaluate("(document.querySelector('.pcap')||{}).innerText||''").replace('\n',' | '),flush=True)
  br.close()
