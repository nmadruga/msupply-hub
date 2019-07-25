# msupply-hub

## Server 

### Installation

Install node dependencies:

`npm install`

The hub database is run from within a docker container. To start the container:
 
`./pgSql/pg-start.sh -r`

Navigate to another terminal and run `docker ps` to see running docker instances. E.g.:
  
```
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
5b39956803b4 postgres:latest "docker-entrypoint..." 21 seconds ago Up 20 seconds 0.0.0.0:5433->5432/tcp mSupplyHub
```  

Enter the docker instance using the container ID:  

`docker exec -it 5b39956803b4 bash`

Initialise the database with:

`pgSql/initsqldb/initialiseDatabase.sql`

Login and connect to the hub database:

```
psql -U postgres`
\c mSupplyHub
```

From here you can verify the database schema and/or data, e.g.:

```
SELECT * FROM sites;
SELECT * FROM events;
```

### Running the server
  
Start the server with `npm`:

`npm run dev`

The default port is listed in `./src/config.json` and can be optionally specified using environment variable `PORT`.

### More information 

[API Endpoints](https://github.com/sussol/msupply-hub/blob/master/src/apiV1/Documentation/index.md)  

[DB table description](https://github.com/sussol/msupply-hub/tree/master/src/database/Documentation/database.md)

## Web app

### Installation

Install node dependencies:
  
```
curl -o- -L https://yarnpkg.com/install.sh | bash
yarn install
```

## Usage
  
Start the web app:

`yarn start`

By default, the web app is hosted at `localhost` port `3000`.

To access the web page in your browser, visit  `http://localhost:3000/`