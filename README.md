# Groselha

The Fab Lab's bot. By typing `/quem` at our Slack, Groselha tells who is at the Fab Lab given their mac addresses.

## Setup

### Flask server

Start the server with `FLASK DEBUG python app.py` at the root folder.

### Webpacker

Enter the `static` file and run `npm run watch`

`cd static`
(For the first time) `npm install`
`npm run watch`

### Console

#### Localy

Setup the database by running the following in your python shell:

```py
>>> from app import db
>>> db.create_all()
```

Create news users with:

```py
>>> from app import db, User
>>> user = User('first_name', 'last_name', 'kind', 'mac_address', 'last_online_at')
>>> db.session.add(user)
>>> db.session.commit()
```

#### Server (Remote - Heroku)

(First, make sure you have the credentials to access this app in Heroku).

`heroku run "python" -a fablabjoinville-bot`

The commands are the same as the ones in local env.


## ARP Scan Setup

Use `scan.sh` script to scan the ARP table and send mac addresses to our servers:

```
./scan.sh eth0 host.com token
```
