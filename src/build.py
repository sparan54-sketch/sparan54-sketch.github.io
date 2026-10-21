import base64,sys,json
# usage: python3 build.py "<sync url>" "10,11,12"
s=open('app.src.html').read().replace('/*__M2027__*/',open('months2027.js').read()+open('months_more.js').read()+(open('months_themes.js').read() if __import__('os').path.exists('months_themes.js') else '')+open('art.js').read()+open('dec27.js').read()+open('months_2026.js').read()+open('moments2026.js').read()+open('osmdata.js').read()+open('months_osm.js').read()+open('jan_drawn.js').read())
for n in('HIM','HER'):s=s.replace(f'__{n}__','data:image/png;base64,'+base64.b64encode(open(f'{n.lower()}_s.png','rb').read()).decode())
s=s.replace('__SYNC__',sys.argv[1] if len(sys.argv)>1 else '')
s=s.replace('__LIVE__',json.dumps([int(x) for x in (sys.argv[2] if len(sys.argv)>2 else '10,11,12').split(',')]))
open('index.html','w').write(s)
