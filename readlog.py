#!/bin/python3.6
import sys, datetime
readl=[]
datey=sys.argv[1]
count=sys.argv[2]
msgtype=sys.argv[3]
def file_read_from_head(fname,fromd,nlines):
 alllines=[]
 with open(fname) as f:
  x=int(nlines)
  if (x < 0):
   linelist=f
  else:
   linelist=reversed(list(f));
  for line in linelist: 
   ldate1=line.split(" ")[0]+"T"+line.split(" ")[1]
   ldate=datetime.datetime.strptime(ldate1,"%m/%d/%YT%H:%M:%S")
   if(x > 0):
    if (ldate <= mydate):
     line=line.replace("\n","").split(" ")
     if line[2] in msgtype:
      alllines.append({"Date":line[0],"time":line[1],"msg":line[2],"user":line[3],"code":line[4],"stamp":line[5]}) 
      x-=1
     if(x<0):
      break;
   else:
    if (ldate >= mydate):
     line=line.replace("\n","").split(" ")
     if line[2] in msgtype:
      alllines.append({"Date":line[0],"time":line[1],"msg":line[2],"user":line[3],"code":line[4],"stamp":line[5]}) 
      x+=1
     if(x>0):
      alllines=reversed(alllines)
      break;
 return list(alllines)

mydate=datetime.datetime.strptime(datey,"%m/%d/%YT%H:%M:%S")
readl=file_read_from_head('Data/TopStor.log',mydate,count)
jsondisk=str(readl).replace("\'","\"")
jsondisk=jsondisk.replace(': "',':"')
jsondisk=jsondisk.replace(', "',',"')
jsondisk=jsondisk.replace(', {',',{')
print(jsondisk)
