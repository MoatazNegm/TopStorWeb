#! /bin/sh
echo $@ > Data/readl
pgrep readlog -a | grep -v $$ >/dev/null
if [ $? -ne 0 ];
then
 ETCDCTL_API=3 ./readlog.py $@
else
 echo readlog
fi
