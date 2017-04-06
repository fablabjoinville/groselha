# groselha

The Fab Lab's bot.

## Setup

Setup the database by running the following in your python shell:

```
>>> from app import db
>>> db.create_all()
```

Create news users with:

```
>>> from app import db, User
>>> user = User('first_name', 'last_name', 'kind', 'mac_address', 'last_online_at')
>>> db.session.add(user)
>>> db.session.commit()
```

## ARP Scan Setup

Use `scan.sh` script to scan the ARP table and send mac addresses to our servers:

```
./scan.sh eth0 host.com token
```
