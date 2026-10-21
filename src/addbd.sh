#!/bin/bash
# usage: addbd.sh YYYY-MM-DD /path/photo.jpg "caption"
cd /workspace/calendar; D=$1; F=$2; C=$3
../venv/bin/python -c "
from PIL import Image
im=Image.open('$F').convert('RGB')
if im.height>1600: im=im.resize((round(im.width*1600/im.height),1600))
im.save('assets/backdrops/$D.jpg',quality=80,optimize=True,progressive=True)"
(echo -n "data:image/jpeg;base64,"; base64 -w0 assets/backdrops/$D.jpg) > assets/backdrops/$D.jpg.b64
Y=${D:0:4};Mo=$((10#${D:5:2}));Dy=$((10#${D:8:2}));K=$Mo;[ $Y = 2027 ] && K=$((Mo+12))
echo "if(M[$K]){M[$K].photoCap=M[$K].photoCap||[];M[$K].photoCap[$((Dy-1))]=$(python3 -c 'import json,sys;print(json.dumps(sys.argv[1]))' "$C")}" >> photocaps.js
echo added $D K=$K
