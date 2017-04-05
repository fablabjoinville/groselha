import datetime
import os
import sys
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
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


@app.route('/macs', methods=['POST'])
def save_macs():
    macs = request.get_json()['macs']
    users = User.query.filter(User.mac_address.in_(macs)).all()

    for user in users:
        user.last_online_at = datetime.datetime.utcnow()
        db.session.add(user)
    db.session.commit()

    return('', 200)


@app.route('/who', methods=['GET'])
def who_is_in_the_room():
    online_users = User.online_users()
    names = "\n".join([user.first_name + ' ' + user.last_name for user in online_users])

    return("Há " + len(online_users) + " pessoa(s) no Fab Lab:\n\n" + names)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
