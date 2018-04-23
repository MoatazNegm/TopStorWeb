#! /bin/sh
echo $@  > Data/pump2.txt;
echo $@ > /tmp/msgfile;
read ack < /tmp/ackmsg;
