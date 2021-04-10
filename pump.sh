#! /bin/sh
export ETCDCTL_API=3
request=`echo $@ | awk '{print $1}'`
user=`echo $@ | awk '{print $NF}'`
stamp=`date +%s`
myhost=`hostname`
datenow=`date +%m/%d/%Y`; timenow=`date +%T`;
pgrep $request 
if [ $? -ne 0 ];
then
#echo $datenow $timenow $myhost queued $user $request $stamp >> Data/TopStorqueue.log
 #./logqueue.py  $datenow $timenow $myhost queued $user $request $stamp 
 ./logqueue.py   $request queued $user
# #echo hi >> /tmp2/msgqueue 
 echo $@  > Data/pump.txt;
 echo $@ >> /tmp2/msgfile
else
 echo $@ already running > Data/pump.txt;
fi 
