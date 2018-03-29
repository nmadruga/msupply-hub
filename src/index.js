import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import initDB from './database';
import apiV1 from './apiV1';
import config from './config.json';

const app = express();
app.server = http.createServer(app);
// logger
app.use(morgan('dev'));

// limit max
app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  })
);

// api router
app.use('/api/v1', apiV1({ config, db: initDB(config) }));

// process.env.PORT as per run command PORT=XXXX npm run dev
app.server.listen(process.env.PORT || config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
