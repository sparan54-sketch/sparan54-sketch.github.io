import json
from shapely.geometry import LineString,Polygon,box
from shapely.ops import polygonize,unary_union,linemerge
def PK(la,lo):return((lo+75.16)*0.766*111,-(la-39.95)*111)
W=json.load(open('q2.json'));lines=[];polys=[]
for e in W['elements']:
 if e['type']=='way' and 'geometry' in e:
  c=[PK(p['lat'],p['lon']) for p in e['geometry']]
  if len(c)>3 and c[0]==c[-1]:polys.append(Polygon(c).buffer(0))
 elif e['type']=='relation':
  for m in e.get('members',[]):
   if 'geometry' in m and m.get('role')!='inner':lines.append(LineString([PK(p['lat'],p['lon']) for p in m['geometry']]))
polys+=list(polygonize(unary_union(lines)))
def P(g):
 out=''
 for x in ([g] if g.geom_type=='Polygon' else getattr(g,'geoms',[])):
  if x.geom_type!='Polygon':continue
  for r in [x.exterior]+list(x.interiors):out+='M'+'L'.join(f'{a:.3f} {b:.3f}' for a,b in r.coords)+'Z'
 return out
def L(gs):
 out=''
 for g in gs:
  for l in ([g] if g.geom_type=='LineString' else getattr(g,'geoms',[])):
   if l.geom_type=='LineString' and l.length>0.02:out+='M'+'L'.join(f'{a:.3f} {b:.3f}' for a,b in l.coords)
 return out
def mk(bb,src,tol,minarea,cls,labels):
 la0,lo0,la1,lo1=bb;x0,y1=PK(la0,lo0);x1,y0=PK(la1,lo1);B=box(x0,y0,x1,y1)
 wat=unary_union([p for p in polys if p.area>minarea]).intersection(B).simplify(tol)
 R=json.load(open(src));roads={};byname={}
 for e in R['elements']:
  t=e.get('tags',{});hw=t.get('highway','');n=t.get('name','')
  if 'geometry' not in e or hw.endswith('_link'):continue
  c=cls(hw,n)
  if not c:continue
  ls=LineString([PK(p['lat'],p['lon']) for p in e['geometry']]);roads.setdefault(c,[]).append(ls);byname.setdefault(n,[]).append(ls)
 out={'box':[x0,y0,x1,y1],'water':P(wat)}
 for k,v in roads.items():out[k]=L([linemerge(unary_union(v)).intersection(B).simplify(tol)])
 lab=[]
 for n,sz in labels:
  if n not in byname:print('nolabel',n);continue
  g=unary_union(byname[n]).intersection(B.buffer(-0.05))
  if g.is_empty:continue
  segs=[l for l in getattr(g,'geoms',[g]) if l.geom_type=='LineString']
  l=max(segs,key=lambda s:s.length);p=l.interpolate(.5,normalized=True);q=l.interpolate(min(l.length,l.project(p)+0.05))
  import math;ang=math.degrees(math.atan2(q.y-p.y,q.x-p.x))
  if ang>90:ang-=180
  if ang<-90:ang+=180
  lab.append([n.replace('Street','St').replace('Avenue','Ave').replace('Boulevard','Blvd').replace('North ','').replace('South ',''),round(p.x,3),round(p.y,3),round(ang,1),sz])
 out['lab']=lab;return out
def jcls(hw,n):
 if 'Broad Street' in n:return 'b'
 if hw in('motorway','trunk'):return 'm'
 if hw=='primary':return 'p'
 if hw=='secondary':return 's'
J=mk((39.905,-75.235,40.06,-75.035),'q1.json',0.02,0.05,jcls,[(n,1) for n in ['North Broad Street','South Broad Street','Market Street','West Girard Avenue','East Girard Avenue','Washington Avenue','Oregon Avenue','Germantown Avenue','Ridge Avenue','Roosevelt Boulevard','Henry Avenue','Bustleton Avenue','East Passyunk Avenue','Lehigh Avenue','Spring Garden Street','Delaware Avenue','South Columbus Boulevard','North Delaware Avenue','Kelly Drive','Martin Luther King Jr. Drive','Cottman Avenue','Castor Avenue']])
def mcls(hw,n):
 if 'Broad Street' in n or n=='Market Street':return 'b'
 if hw in('motorway','trunk'):return 'm'
 if hw in('primary','secondary'):return 'p'
 return 's'
ML=['South Front Street','South 2nd Street','South 3rd Street','South 4th Street','South 5th Street','South 6th Street','South 7th Street','South 8th Street','South 9th Street','South 10th Street','South 11th Street','South 12th Street','South 13th Street','South Broad Street','South 15th Street','South 16th Street','South 17th Street','South 18th Street','South 19th Street','South 20th Street','South 21st Street','South 22nd Street','South 23rd Street','Race Street','Arch Street','Market Street','Chestnut Street','Walnut Street','Locust Street','Spruce Street','Pine Street','Lombard Street','South Street','Benjamin Franklin Parkway','Grays Ferry Avenue','Sansom Street','Vine Street']
Mm=mk((39.9385,-75.184,39.9595,-75.138),'q3.json',0.004,0.002,mcls,[(n,1) for n in ML])
def j2(hw,n):
 if 'Broad Street' in n or n=='Market Street':return 'b'
 if hw in('motorway','trunk'):return 'm'
 if hw in('primary','secondary'):return 'p'
 return 's'
JL=['South Broad Street','North Broad Street','Market Street','Chestnut Street','Walnut Street','Spruce Street','South Street','Washington Avenue','East Passyunk Avenue','Grays Ferry Avenue','Girard Avenue','Spring Garden Street','South Columbus Boulevard','North Delaware Avenue','Frankford Avenue','North 2nd Street','South 9th Street','South 20th Street','Benjamin Franklin Parkway','Vine Street','Callowhill Street','Delaware Expressway','Schuylkill Expressway','Snyder Avenue','Christian Street','South 4th Street']
J2=mk((39.921,-75.187,39.978,-75.127),'q4.json',0.005,0.002,j2,[(n,1) for n in JL])
OL=['North Broad Street','South Broad Street','Market Street','Germantown Avenue','Ridge Avenue','Kelly Drive','Martin Luther King Jr. Drive','Benjamin Franklin Parkway','Spring Garden Street','West Girard Avenue','East Girard Avenue','Lehigh Avenue','Allegheny Avenue','Hunting Park Avenue','Lincoln Drive','Wissahickon Avenue','Chestnut Street','Walnut Street','South Street','Fairmount Avenue','North Delaware Avenue','Frankford Avenue']
JO=mk((39.932,-75.205,40.053,-75.126),'q5.json',0.006,0.003,j2,[(n,1) for n in OL])
open('/workspace/calendar/osmdata.js','w').write('// Street & water geometry from OpenStreetMap (ODbL), projected to km via PK\nconst OSMJ='+json.dumps(J,separators=(',',':'))+';\nconst OSMJ2='+json.dumps(J2,separators=(',',':'))+';\nconst OSMO='+json.dumps(JO,separators=(',',':'))+';\nconst OSMM='+json.dumps(Mm,separators=(',',':'))+';\n')
import os;print(os.path.getsize('/workspace/calendar/osmdata.js'),len(J['lab']),len(Mm['lab']))
