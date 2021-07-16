#! /bin/sh
pgrep chkuser2.py -a | grep -v $$ >/dev/null
if [ $? -ne 0 ];
then
 ETCDCTL_API=3 ./chkuser2.py $@
else
 echo $2
fi
