#!/bin/python3.6
import sys, datetime
from time import time
from etcdget import etcdget as get
from ast import literal_eval as mtuple
from socket import gethostname as hostname
from sendhost import sendhost
def queuethis(*args):
 z=[]
 knowns=[]
 myhost=hostname()
 dt=datetime.datetime.now().strftime("%m/%d/%Y")
 tm=datetime.datetime.now().strftime("%H:%M:%S")
 z=['/TopStor/logqueue2.sh', dt, tm, myhost ]
 for arg in args:
  z.append(arg)
 z.append(int(time()*1000))
 with open('/root/logqueuetmp','w') as f:
  f.write(str(z))
 leaderinfo=get('leader','--prefix')
 knowninfo=get('known','--prefix')
 leaderip=leaderinfo[0][1]
 for k in knowninfo:
  knowns.append(k[1])
 print('leader',leaderip) 
 print('knowns',knowns) 
 msg={'req': 'queue', 'reply':z}
 print('sending', leaderip, str(msg),'recevreply',myhost)
 sendhost(leaderip, str(msg),'recvreply',myhost)
 #for k in knowninfo:
 # sendhost(k[1], str(msg),'recvreply',myhost)
 # knowns.append(k[1])
 #print('logqueue z=',z)

if __name__=='__main__':
 queuethis(*sys.argv[1:])
