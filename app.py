from flask import Flask, render_template, request
import os


app = Flask(__name__)

@app.route('/')
def webprint():
    return render_template('index.html')

@app.route('/macs', methods=['POST'])
def save_macs():
	r = request.get_json()
	return str(r)

@app.route('/who', methods=['GET'])
def who_is_in_the_room():
	return 'WHO'

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
