#!/usr/bin/python3.6
import os,sys, datetime
from subprocess import run
from subprocess import PIPE
cmdline='sh getqueue.sh'
x=run(cmdline.split(),stdout=PIPE).stdout
y=x.decode('utf-8')
z=y.split('\n')
stopfinish=[]
allstopfinish=[]
other=[]
countfinish=0
for x in z:
 if len(x) < 4:
  continue
 st=x.split()
 if 'finish' in st[3] or 'stop' in st[3]:
  stopfinish.append((st[2],st[5]))
  if countfinish < 2: 
   other.append(x)
   countfinish+=1
  else:
   allstopfinish.append(x)
 elif  (st[2],st[5]) in stopfinish:
  stopfinish.remove((st[2],st[5]))
  allstopfinish.append(x)
 else:
  other.append(x)
other.reverse()
print(other)
