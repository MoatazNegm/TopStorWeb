#! /bin/sh
echo $@  > Data/pump.txt;
echo $@ > /tmp/msgfile;
read ack < /tmp/ackmsg;
