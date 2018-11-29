#!/usr/bin/python3.6
import sys,etcdget,subprocess,time

with open('Data/chkuser','w') as f:
 f.write(str(sys.argv))
x=etcdget.etcdget('logged/'+sys.argv[1])
z=etcdget.etcdget('updlogged/'+sys.argv[1])
y=x
u=z
cmdline=['./pump.sh','UnixChkUser']+sys.argv[1:]
result=subprocess.run(cmdline,stdout=subprocess.PIPE)
while str(y)==str(x) and str(z)==str(u):
 time.sleep(2)
 y=etcdget.etcdget('logged/'+sys.argv[1])
 u=etcdget.etcdget('updlogged/'+sys.argv[1])
print(y[0])
