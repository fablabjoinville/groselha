# Groselha

The Fab Lab's bot. By typing `/quem` at our Slack, Groselha tells who is at the Fab Lab given their mac addresses.

## Setup

### Database

`/bin/bash config_db.sh`

```py
>>> from app import db
>>> db.create_all()
```

### Flask server

Start the server with `FLASK DEBUG python app.py` at the root folder.

### Webpacker

Enter the `static` file and run `npm run watch`

`cd static`
(For the first time) `npm install`
`npm run watch`

## Running Heroku server

(First, make sure you have the credentials to access this app in Heroku).

`heroku run "python" -a fablabjoinville-bot`


## ARP Scan Setup

Use `scan.sh` script to scan the ARP table and send mac addresses to our servers:

```
./scan.sh eth0 host.com token
```
