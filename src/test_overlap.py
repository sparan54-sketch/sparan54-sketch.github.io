import sys,json
from playwright.sync_api import sync_playwright
base=sys.argv[1] if len(sys.argv)>1 else 'http://localhost:8765/index.html'
bad=0
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/google-chrome')
  for w,h in [(390,844),(1280,800)]:
    pg=b.new_page(viewport={'width':w,'height':h})
    for k in range(10,25):
      pg.goto(f'{base}?m={k}');pg.wait_for_timeout(400)
      R=pg.evaluate("[...document.querySelectorAll('#board .tile rect')].map(r=>{const b=r.getBoundingClientRect();return[b.left,b.top,b.right,b.bottom]})")
      ov=[(i+1,j+1) for i in range(len(R)) for j in range(i+1,len(R)) if R[i][0]<R[j][2]-.5 and R[j][0]<R[i][2]-.5 and R[i][1]<R[j][3]-.5 and R[j][1]<R[i][3]-.5]
      if ov: bad+=1
      print(w,k,len(R),'OVERLAPS' if ov else 'ok',ov[:8])
  b.close()
print('FAIL' if bad else 'PASS')
