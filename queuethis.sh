#!/bin/sh
export ETCDCTL_API=3
stamp=`date +%s`
ref=`echo $@ | awk '{print $1}'`
stat=`echo $@ | awk '{print $2}'`
user=`echo $@ | awk '{print $3}'`
./logqueue.py $ref $stat $user $stamp >/dev/null
#echo /TopStor/logqueue.py $ref $stat $user $stamp > /root/queuethis
