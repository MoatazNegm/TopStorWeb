#! /bin/sh
#echo $@ > Data/readl
export ETCDCTL_API=3
pgrep readq -a | grep -v $$ >/dev/null
if [ $? -ne 0 ];
then
 x=`./readq.py`
 echo $x
else
 echo readq
fi
