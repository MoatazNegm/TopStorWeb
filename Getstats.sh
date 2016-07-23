#! /bin/bash
echo $@ > Data/tmpGet
date=`echo $@ | awk '{print $1}'`
time=`echo $@ | awk '{print $2}'`;
found=1
seconds=`echo $time | awk -F':' '{print $3}'`;
seconds=$((59-seconds));
firsttime=`cat Data/*$date*.tab | grep -v \# | head -n 1 | awk '{print $2}'`
printf "$time\n$firsttime\n" | sort -u | tail -n 1 | grep "$firsttime"
if [ $? -eq  0 ]; 
then 
 time=$firsttime
else
 lasttime=`cat Data/*$date*.tab | grep -v \# | tail -n 1 | awk '{print $2}'`
fi
while [ $found -ge 1 ]; do 
 found=1;
 cat Data/*$date*.tab | grep "$time" > /dev/null
 if [ $? -eq 0 ] 
 then
  stats=`cat  Data/*$date*.tab | grep -v \# | sort -u  | awk  "BEGIN{flag=0;count=0} /$time/{flag=1}{if (flag > 0 ) { print; count+=1; } } " | tail -n 50`
  echo "${stats[@]}"
  found=0;
 else
  time=`date --date=${time}' seconds' +%T`
  echo $time $lasttime
  printf "$time\n$lasttime\n" | sort -u | tail -n 1 | grep "$time"
  if [ $? -eq  0 ]; 
  then 
   exit 1;
  fi
 fi
done
result="[";
while read -r line ; do
 timen=` echo $line | awk '{print $2}'`;
 cpu=`echo $line | awk '{print $11}'`;
 mem=`echo $line | awk '{print $25}'`;
 netrx=`echo $line | awk '{print $65}'`;
 nettotkb=`echo $line | awk '{print $66}'`;
 if [ $nettotkb -eq 0 ]; then nettotkb=0.00000001; fi
 netrxpercent=$((100*netrx/nettotkb));
 deskreadiops=`echo $line | awk '{print $72}'`;
 deskiops=`echo $line | awk '{print $74}'`;
 deskreadkb=`echo $line | awk '{print $75}'`;
 deskwritekb=`echo $line | awk '{print $76}'`;
 deskthrouput=`echo $line | awk '{print $77}'`;
 if [ $deskiops -eq 0 ]; then deskiops=0.00000001; fi
 deskiopavgkb=$((deskthrouput/deskiops))
 deskreadpercent=$((100*deskreadiops/deskiops))
 subres=`./jsonthis3.sh time $timen cpu $cpu mem $mem deskiops $deskiops deskiopavgkb $deskiopavgkb deskreadpercent $deskreadpercent deskthrouput $deskthrouput nettotkb $nettotkb netreadpercent $netrxpercent `;
 result=${result}${subres}','
done <<< "$(echo -e "${stats[@]}")"
result=`echo $result | rev | cut -c 2- | rev`']';
echo $result > Data/ctr.log;
resdate=`date +%s`;
res=` ./jsonthis3.sh updated $resdate`;
echo $res > Data/ctr.logupdated;
