#!/bin/python3.6
import subprocess,sys
import json

key=sys.argv[1]
try:
 prefix=sys.argv[2]
except:
 prefix=''
endpoints=''
data=json.load(open('Data/runningetcdnodes.txt'));
for x in data['members']:
 endpoints=endpoints+str(x['clientURLs'])[2:][:-2]+','
cmdline=['etcdctl','--endpoints='+endpoints,'get',key,prefix]
result=subprocess.run(cmdline,stdout=subprocess.PIPE)
ilist=[]
try:
 if(prefix !=''):
  mylist=str(result.stdout)[2:][:-3].split('\\n')
  mylist=zip(mylist[0::2],mylist[1::2])
  hostid=0
  hosts=[]
  for x in mylist:
   ll=[]
   #xx=str(x[1]).replace('{','{"').replace('}','"}').replace(':','":"').repalce(',','","')
   xx=x[1]
   ll.append(xx)
   hostsdic={'id':str(hostid),'name':x[0],'prop':xx}
   hosts.append(hostsdic)
  print(str(hosts).replace('"','').replace("'",'"'))
 else:
  print(str(result.stdout).split(key)[1][2:][:-3].replace("'",'"'))
 
except:
 print('-1')
