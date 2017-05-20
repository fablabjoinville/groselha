#!/bin/sh

INTERFACE=$1
HOST=$2
TOKEN=$3

while :
do
  sudo arp-scan --interface $INTERFACE -l | \
    egrep -o ..:..:..:..:..:.. | \
    tr '\n' ',' | \
    sed 's/^/"/' | \
    sed 's/.$/"/' | \
    sed 's/,/","/g' | \
    awk -v host=$HOST -v token=$TOKEN '{print "curl -XPOST http://"host"/macs -H '\''Content-Type: application/json'\'' -d '\''{\"macs\": ["$1"], \"token\": \""token"\"}'\''"}' | \
    xargs -0 bash -c

  sleep 10
done
