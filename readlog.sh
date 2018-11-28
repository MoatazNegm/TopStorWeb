#! /bin/sh
pgrep readlog -a | grep -v $$ 
if [ $? -ne 0 ];
then
 ETCDCTL_API=3 ./readlog.py $@
fi
