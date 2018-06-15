#!/usr/bin/python3.6
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
     if line[3] in msgtype:
      try:
       alllines.append({"Date":line[0],"time":line[1],"fromhost":line[2], "msg":line[3],"user":line[4],"code":line[5],"stamp":line[6]}) 
       x-=1
      except: 
       pass
     if(x<0):
      break;
   else:
    if (ldate >= mydate):
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

mydate=datetime.datetime.strptime(datey,"%m/%d/%YT%H:%M:%S")
readl=file_read_from_head('Data/TopStorglobal.log',mydate,count)
jsondisk=str(readl).replace("\'","\"")
jsondisk=jsondisk.replace(': "',':"')
jsondisk=jsondisk.replace(', "',',"')
jsondisk=jsondisk.replace(', {',',{')
print(jsondisk)
