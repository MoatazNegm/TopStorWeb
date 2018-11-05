#!/usr/bin/python3.6
import sys, datetime
from subprocess import check_output
readl=[]
datey=sys.argv[1]
count=sys.argv[2]
msgtype=sys.argv[3]
msglevel=sys.argv[4]
def file_read_from_head(fname,mydate,nlines,msglevel=0):
 alllines=[]
 with open('msgsglobal.txt') as f:
  valid=[y.split(':')[0] for y in f.readlines() if y.split(':')[1]>=msglevel];
 with open(fname) as f:
  x=int(nlines)
  if (x < 0):
   linelist=f
  else:
   linelist=reversed(list(f));
  mystamp=mydate.timestamp()
  for line in linelist: 
   ldate=int(line.split(" ")[6])
   if(x > 0):
    if (ldate <= mystamp and any(yy in str(line) for yy in valid)):
     line=line.replace("\n","").split(" ")
     if line[3] in msgtype:
      try:
       alllines.append({"Date":line[0],"time":line[1],"fromhost":line[2], "msg":line[3],"user":line[4],"code":line[5],"stamp":line[6]}) 
       x-=1
       if(x<0):
        break;
      except: 
       pass
   else:
    if (ldate >= mystamp):
     line=line.replace("\n","").split(" ")
     if line[3] in msgtype:
      try: 
       alllines.append({"Date":line[0],"time":line[1],"fromhost":line[2], "msg":line[3],"user":line[4],"code":line[5],"stamp":line[6]}) 
       x+=1
      except: 
       pass
     if(x>0):
      alllines=reversed(alllines)
      break;
 return list(alllines)
try:
 x=check_output(['pgrep','-c', 'readlog'])
 x=str(x).replace("b'","").replace("'","").split('\\n')
 if(x[0]!= '1'):
  print('readlogdisable')
  exit()
 else:
  mydate=datetime.datetime.strptime(datey,"%m/%d/%YT%H:%M:%S")
  readl=file_read_from_head('Data/TopStorglobal.log',mydate,count,msglevel)
  #print('Data/TopStorglobal.log',mydate,count,msglevel)
  jsondisk=str(readl).replace("\'","\"")
  jsondisk=jsondisk.replace(': "',':"')
  jsondisk=jsondisk.replace(', "',',"')
  jsondisk=jsondisk.replace(', {',',{')
  print(jsondisk)
except:
 pass
