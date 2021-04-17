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
 openright[1],openleft[1], openleft[2], openleft[3]])))
openlst.sort(key= lambda x: x[0])
for x in openlst:
 print(x[1])
