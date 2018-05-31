
# mSupply Information Server

`npm install`

`./pgSql/pg-start.sh -r` start docker mysql and confirm reload db

`npm run dev` start server on default port listed in `./src/config.json` or `PORT=portNumber npm run dev` start server on port `portNumber` 

### Inital DB Structure

`pgSql/initsqldb/initialiseDatabase.sql`

[API Endpoints](https://github.com/sussol/msupply-hub/blob/master/src/apiV1/Documentation/index.md)
[DB table description](https://github.com/sussol/msupply-hub/tree/master/src/database/Documentation/database.md)
