#!/bin/sh

HOST=$1
TOKEN=$2

while :
do
  sudo arp-scan --interface en0 -l | egrep -o ..:..:..:..:..:.. | tr '\n' ',' | sed 's/^/"/' | sed 's/.$/"/' | sed 's/,/","/g' | awk -v host=$HOST -v token=$TOKEN '{print "curl -XPOST http://"host"/macs -H '\''Content-Type: application/json'\'' -d '\''{\"macs\": ["$1"], \"token\": \""token"\"}'\''"}' | xargs -0 bash -c
  sleep 10
done
