#! /bin/sh
cd /var/www/html/des20/
if [ -f Data/Getstatspid ]; 
then
 exit 0;
else
echo hi > Data/ctr.log
touch Data/Getstatspid
echo $@ > Data/tmpGet
date=`echo $@ | awk '{print $1}'`
time=`echo $@ | awk '{print $2}'`;
found=1
ls  Data/*  | grep $date &>/dev/null
if [ $? -ne 0 ];
then 
 nothing='['`./jsonthis3.sh nothing 0`']' 
 echo $nothing > Data/ctr.log
 resdate=`date +%s`;
 res=` ./jsonthis3.sh updated $resdate`;
 echo $res > Data/ctr.logupdated;
 rm -rf Data/Getstatspid; echo notfound; exit;
fi
if [ $time -eq 0 ]; then
  stats=`cat  Data/*$date*.tab | grep -v \# | sort -u  | awk  "BEGIN{flag=0;count=0} /$time/{flag=1}{if (flag > 0 ) { print; count+=1; } } " | tail -n 50`
  statsnet=`cat  Data/*$date*.net | grep -v \# | sort -u  | awk  "BEGIN{flag=0;count=0} /$time/{flag=1}{if (flag > 0 ) { print; count+=1; } } " | tail -n 50`
else
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
   statsnet=`cat  Data/*$date*.net | grep -v \# | sort -u  | awk  "BEGIN{flag=0;count=0} /$time/{flag=1}{if (flag > 0 ) { print; count+=1; } } " | tail -n 50`
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
fi
result="[";
while read -r line ; do
 daten=` echo $line | awk '{print $1}'`;
 timen=` echo $line | awk '{print $2}'`;
 cpu=`echo $line | awk '{print $11}'`;
 memused=`echo $line | awk '{print $25}'`;
 memtot=`echo $line | awk '{print $24}'`;
 mem=$((100*memused/(memtot+1)));
 netline=`echo "${statsnet[@]}" | grep "$daten" | grep "$timen"`
	 l=`echo $netline | awk '{$1=$2="";print $0}'`;
	 n=`echo $l | awk '{print NF}'`;
	 p=$(((n/19)-1));
         netrx=0;
	 nettx=0;
	for ((i = 0; i < $p; i++ )); 
	do 
		rx=$((($i*19)+4)); 
		tx=$((($i*19)+5)); 
		subrx=`echo $l | awk -v s=$rx '{print $s}'`; 
		subtx=`echo $l | awk -v s=$tx '{print $s}'`; 
		netrx=$((netrx+subrx));
		nettx=$((nettx+subtx));
	 done
#netrx=`echo $line | awk '{print $65}'`;
#nettx=`echo $line | awk '{print $66}'`;
 nettotkb=$((netrx+nettx));
 if [ $nettotkb -eq 0 ]; then nettotkb=1; fi
 netrxpercent=$((100*netrx/(netrx+nettotkb)));
 deskreadiops=`echo $line | awk '{print $72}'`;
 deskiops=`echo $line | awk '{print $74}'`;
 deskreadkb=`echo $line | awk '{print $75}'`;
 deskwritekb=`echo $line | awk '{print $76}'`;
 deskthrouput=`echo $line | awk '{print $77}'`;
 if [ $deskiops -eq 0 ]; then deskiops=1; fi
 deskiopavgkb=$((deskthrouput/deskiops))
 deskreadpercent=$((100*deskreadiops/deskiops))
 subres=`./jsonthis3.sh date $daten time $timen cpu $cpu mem $mem deskiops $deskiops deskiopavgkb $deskiopavgkb deskreadpercent $deskreadpercent deskthrouput $deskthrouput nettotkb $nettotkb netreadpercent $netrxpercent `;
 result=${result}${subres}','
done <<< "$(echo -e "${stats[@]}")"
result=`echo $result | rev | cut -c 2- | rev`']';
if [ `echo $result | wc -c ` -ge 5 ];
then
 echo done
 echo $result > Data/ctr.log;
 resdate=`date +%s`;
 res=` ./jsonthis3.sh updated $resdate`;
 echo $res > Data/ctr.logupdated;
else
 rm -rf Data/ctr.log;
 echo wrong
fi
rm -rf Data/Getstatspid
fi
