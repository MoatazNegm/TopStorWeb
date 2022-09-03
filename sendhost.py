#!/bin/python3.6
import pika
from ast import literal_eval as mtuple

def sendhost(host, req, que, frmhst, port=5672):
 msg={'host': frmhst, 'req': req }
# creds=pika.PlainCredentials('rabb_'+frmhst,'YousefNadody')
 creds=pika.PlainCredentials('rabbmezo','HIHIHI')
 param=pika.ConnectionParameters(host, port, '/', creds)
 conn=pika.BlockingConnection(param)
 chann=conn.channel()
 try: 
  chann.basic_publish(exchange='',routing_key=que, body=str(msg))
  return 0
 except:
  return 1
if __name__ == "__main__":
 import sys
 sendhost(*sys.argv[1:])
 
