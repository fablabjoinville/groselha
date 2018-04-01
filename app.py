# -*- coding: utf-8 -*-
import datetime
import os
from random import randint
import sys

from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests

TOKEN = os.environ.get('TOKEN', None)
# SLACK_WEBHOOK_URL = 'https://hooks.slack.com/' + os.environ.get('SLACK_WEBHOOK_PATH')

COFFEE_GIFS = [
  'oZEBLugoTthxS',
  'DrJm6F9poo4aA',
  'GhNCif5GnFBYY',
  '687qS11pXwjCM',
  'zJ8ldRaGLnHTa',
  '3oFyDpRagf96Uz9rzO',
  '5Ztn33chuvutW'
]

app = Flask(__name__, static_folder='static/dist', template_folder='static')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://localhost/groselha_dev')
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    kind = db.Column(db.String(10), nullable=False)
    mac_address = db.Column(db.String(20), nullable=False, unique=True)
    last_online_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, first_name, last_name, kind, mac_address, last_online_at):
        self.first_name = first_name
        self.last_name = last_name
        self.kind = kind
        self.mac_address = mac_address
        self.last_online_at = last_online_at

    def __repr__(self):
        return '<User %r %r >' % (self.first_name, self.last_name)

    @classmethod
    def online_users(cls):
        query = User.last_online_at > datetime.datetime.utcnow() - datetime.timedelta(minutes=2)
        users = cls \
           .query \
           .with_entities(User.first_name, User.last_name) \
           .distinct(User.first_name, User.last_name) \
           .filter(query) \
           .all()

        return(users)


@app.route('/register-macs', methods=['GET', 'POST'])
def register_macs():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        args = request.get_json()
        new_user = User(
            first_name=args['firstName'],
            last_name=args['lastName'],
            mac_address=args['macAddress'],
            kind=args['kind'],
            last_online_at=datetime.datetime.utcnow()
        )
        db.session.add(new_user)
        db.session.commit()

        return('ok', 200)


@app.route('/macs', methods=['POST'])
def save_macs():
    if request.get_json()['token'] != TOKEN: return('', 401)

    macs = request.get_json()['macs']
    users = User.query.filter(User.mac_address.in_(macs)).all()

    for user in users:
        user.last_online_at = datetime.datetime.utcnow()
        db.session.add(user)
    db.session.commit()

    return('', 200)


@app.route('/who', methods=['GET'])
def who_is_in_the_room():
    if request.args.get('token') != TOKEN: return('', 401)

    online_users = User.online_users()

    if len(online_users) == 0:
        return('Não há ninguém no laboratório :(')
    elif len(online_users) == 1:
        name = online_users[0].first_name + ' ' + online_users[0].last_name
        return("Só o " + name + " está no laboratório. Tadinho :(")
    else:
        names = "\n".join([user.first_name + ' ' + user.last_name for user in online_users])
        return("Há " + str(len(online_users)) + " pessoas no laboratório:\n\n" + names)


@app.route('/coffee_gifs', methods=['GET'])
def get_coffee_gifs():
    if request.get_json()['token'] != TOKEN: return('', 401)

    gif_id = randint(0,6)

    gif_url = 'https://media.giphy.com/media/' + COFFEE_GIFS[gif_id] + '/giphy.gif'
    gif_data = {'image_url': gif_url}

    r = requests.post(SLACK_WEBHOOK_URL,
                      json={"text": "<!here> Café quentinho na cafeteira!",
                            "link_names": 1,
                            "attachments": [gif_data]})
    return('', 200)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
