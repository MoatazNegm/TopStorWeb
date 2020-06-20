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
  mystamp=int(mydate.timestamp())
  for line in linelist: 
   linesplit=line.replace("\n","").split(" ")
   ldate=int(linesplit[-1])
   if(x > 0):
    if (ldate <= mystamp and linesplit[5].split('@')[0] in str(valid)):
     if linesplit[3] in msgtype:
      alllines.append({"msglevel":msglevel,"Date":linesplit[0],"time":linesplit[1],"fromhost":linesplit[2], "msg":linesplit[3],"user":linesplit[4],"code":linesplit[5],"stamp":linesplit[-1]}) 
      x-=1
      if(x<=0):
       return list(alllines)
   else:
    if (ldate >= mystamp and linesplit[5].split('@')[0] in str(valid)):
     if line[3] in msgtype:
      alllines.append({"msglevel":msglevel,"Date":linesplit[0],"time":linesplit[1],"fromhost":linesplit[2], "msg":linesplit[3],"user":linesplit[4],"code":linesplit[5],"stamp":linesplit[6]}) 
      x+=1
      if(x>0):
       alllines=reversed(alllines)
       return list(alllines)
 return list(alllines)

dont=1
#try:
# x=check_output(['pgrep','-c', 'readlog'])
# x=str(x).replace("b'","").replace("'","").split('\\n')
# if(x[0]!= '1'):
#  print('readlogdisable')
#  dont=0
#except:
 # pass
if(dont == 1):
 mydate=datetime.datetime.strptime(datey,"%m/%d/%YT%H:%M:%S")
 readl=file_read_from_head('Data/TopStorglobal.log',mydate,count,msglevel)
 #print('Data/TopStorglobal.log',mydate,count,msglevel)
 jsondisk=str(readl).replace("\'","\"")
 jsondisk=jsondisk.replace(': "',':"')
 jsondisk=jsondisk.replace(', "',',"')
 jsondisk=jsondisk.replace(', {',',{')
 print(jsondisk)
