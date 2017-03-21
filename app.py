from flask import Flask, render_template
import os
import sys
import logging

app = Flask(__name__)

@app.route('/')
def webprint():
    return(render_template('index.html'))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)


app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)
