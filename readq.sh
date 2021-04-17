#! /bin/sh
#echo $@ > Data/readl
pgrep readq -a | grep -v $$ >/dev/null
if [ $? -ne 0 ];
then
 ETCDCTL_API=3 ./readq.py
else
 echo readq
fi
