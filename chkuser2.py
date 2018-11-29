#!/usr/bin/python3.6
import sys,etcdget,subprocess,time

with open('Data/chkuser2','w') as f:
 f.write(str(sys.argv))
y=[]
z=[]
x=etcdget.etcdget('updlogged/'+sys.argv[1])
z.append(sys.argv[2])
y.append(x[0])
cmdline=['./pump.sh','UnixChkUser2']+sys.argv[1:]
result=subprocess.run(cmdline,stdout=subprocess.PIPE)
while float(z[0]) > 100 and str(y[0])==str(x[0]):
 time.sleep(2)
 y=etcdget.etcdget('updlogged/'+sys.argv[1])
 z=etcdget.etcdget('logged/'+sys.argv[1])
y=etcdget.etcdget('logged/'+sys.argv[1])
print(y[0])
