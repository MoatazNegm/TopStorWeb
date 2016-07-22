#! /bin/sh
date=`echo $@ | awk '{print $1}'`
time=`echo $@ | awk '{print $2}'`
found=1
seconds=`echo $time | awk -F':' '{print $3}'`;
seconds=$((59-seconds));
echo $seconds
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
  cat  Data/*$date*.tab | grep -v \# | sort -u  | awk  "BEGIN{flag=0;count=0} /$time/{flag=1}{if (flag > 0 ) { print; count+=1; } } ";
  found=0;
 else
  time=`date --date=${time}' seconds' +%T`
#  seconds=$((seconds-1));
#  found=$((found+seconds));
  echo $time $lasttime
  printf "$time\n$lasttime\n" | sort -u | tail -n 1 | grep "$time"
  if [ $? -eq  0 ]; 
  then 
   exit 1;
  fi
 fi
done
