#!/usr/bin/python3.6
import sys, datetime
from subprocess import check_output
from etcdgetsilent import etcdget as get
opentasks=get('OpenTask','--prefix')
openlst= []
for opent in opentasks:
 openleft = opent[0].split('/')
 openright = opent[1].split('/')
 openlst.append((int(openright[0]),' '.join([openright[2].replace(':','/'), \
 openright[1],openleft[1], openleft[2], openleft[3].replace('\n','')])))
openlst.sort(key= lambda x: x[0])
res = ''
for x in openlst:
 res += x[1]+'|' 
print(res[:-1])
with open ('Data/tmpq','w') as f:
 f.write(res[:-1])
