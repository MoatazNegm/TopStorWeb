#!/bin/python3.6
import subprocess,sys
import json

key=sys.argv[1]
try:
 prefix=sys.argv[2]
except:
 prefix=''
endpoints=''
data=json.load(open('/pacedata/runningetcdnodes.txt'));
for x in data['members']:
 endpoints=endpoints+str(x['clientURLs'])[2:][:-2]+','
cmdline=['etcdctl','--endpoints='+endpoints,'get',key,prefix]
result=subprocess.run(cmdline,stdout=subprocess.PIPE)
ilist=[]
try:
 if(prefix !=''):
  mylist=str(result.stdout)[2:][:-3].split('\\n')
  zipped=zip(mylist[0::2],mylist[1::2])
  for x in zipped:
   ilist.append(str(x).replace('run/','').replace('(','[').replace(')',']'))
  print(ilist)
 else:
  print(str(result.stdout).split(key)[1][2:][:-3])
 
except:
 print('-1')
