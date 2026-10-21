# usage: venv/bin/python test_sync.py <url> <month> <day>
import sys,time
from playwright.sync_api import sync_playwright
url,m,d=sys.argv[1],sys.argv[2],sys.argv[3]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
  A=b.new_context(viewport={'width':430,'height':900}).new_page(); errs=[]
  A.on('pageerror',lambda e:errs.append(str(e)))
  sep='&' if '?' in url else '?'
  A.goto(f'{url}{sep}m={m}&day={d}'); A.wait_for_timeout(2500)
  A.click('#logbtn'); tag='Test '+str(int(time.time())); A.fill('#ev',tag); A.fill('#tm','19:30'); A.click('#f button'); A.wait_for_timeout(2500)
  print('A list:',A.inner_text('#list').replace('\n',' | '))
  A.screenshot(path=f'/tmp/t_{m}_closeup.png')
  Bp=b.new_context(viewport={'width':430,'height':900}).new_page(); Bp.goto(f'{url}{sep}m={m}'); Bp.wait_for_timeout(3000)
  Bp.screenshot(path=f'/tmp/t_{m}_board.png')
  print('B sees stamp-day text in board:', tag in Bp.evaluate("JSON.stringify(data)"), 'sync:',Bp.inner_text('#sync'))
  # cleanup via B: delete
  Bp.goto(f'{url}{sep}m={m}&day={d}'); Bp.wait_for_timeout(2500); Bp.click('#list li button'); Bp.wait_for_timeout(2000)
  print('after delete:',Bp.inner_text('#list')); print('errors:',errs)
  b.close()
