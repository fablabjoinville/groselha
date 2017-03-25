import os
import sys
import csv
from flask import Flask, render_template

macs_names = []

def get_macs(macs_names):

	macs = [] 

	for i in range(5):
		mac_add = os.popen('sudo arp-scan --interface wlp6s0 -l | egrep -o ..:..:..:..:..:..').read()
		mac_add = mac_add.split('\n')
		mac_add = mac_add[:-1] 
		for i in mac_add:
			macs.append(i)

	macs_1 = list(set(macs))

	with open(sys.argv[1]) as csvfile:
		readCSV = csv.reader(csvfile, delimiter=',')
		for row in readCSV:
			if row[1] in macs_1:
				macs_names.append(row[0])

	file_object = open("index.html", "w")
	file_object.seek(0)
	file_object.truncate()

	for i in macs_names:
		file_object.write("<h3>"+i+"</h3>"+"\n")


get_macs(macs_names)

app = Flask(__name__)
 
@app.route('/')
def index():
    return(render_template("index.html"))


if __name__ == ('__main__'):
    app.run(host = '0.0.0.0', port = 5000)
