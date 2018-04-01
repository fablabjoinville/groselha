# Groselha

The Fab Lab's bot. By typing `/quem` at our Slack, Groselha tells who is at the Fab Lab given their mac addresses.

## Setup

### Database

```sh
/bin/bash config_db.sh
```

```py
>>> from app import db
>>> db.create_all()
```

### Flask server

Start the server with `FLASK_DEBUG=true python app.py` at the root folder.

### Webpack

```sh
(Only for the first time) npm install
npm run watch
```

## Running Heroku server

(First, make sure you have the credentials to access this app in Heroku).

`heroku run "python" -a fablabjoinville-bot`


## Registering a new user

Go to `/register-macs` and fill in the form.

## ARP Scan Setup

Use `scan.sh` script to scan the ARP table and send mac addresses to our servers:

```
./scan.sh eth0 host.com token
```
