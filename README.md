# mSupply Information Server

`npm install`

### Postgress database

#### Start docker to run the database:

* You need to have docker installed and running!

`./pgSql/pg-start.sh -r`

#### Confirm to reload database:

`y`

### Check entries in database

#### Open another tab on the terminal

CMD + t

#### Find your docker instances running:

`docker ps`

E.g. result:
```
CONTAINER ID        IMAGE                      COMMAND                  CREATED             STATUS              PORTS                    NAMES
5b39956803b4        postgres:latest            "docker-entrypoint..."   21 seconds ago      Up 20 seconds       0.0.0.0:5433->5432/tcp   mSupplyHub
```

#### Enter the docker instance using the container ID:
`docker exec -it 5b39956803b4 bash`

#### Enter postgres:
`psql -U postgres`

#### Connect to mSupplyHub database:
`\c mSupplyHub`

#### Now you can use queries to check the 2 tables: sites and events:
`SELECT * FROM sites;`
`SELECT * FROM events;`

### Start mSupplyHub server on port 4000

`npm run dev` 

The default port listed in `./src/config.json` 

or `PORT=portNumber npm run dev` start server on port `portNumber`

### Inital DB Structure

`pgSql/initsqldb/initialiseDatabase.sql`

[API Endpoints](https://github.com/sussol/msupply-hub/blob/master/src/apiV1/Documentation/index.md)

[DB table description](https://github.com/sussol/msupply-hub/tree/master/src/database/Documentation/database.md)
