import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './database';
import apiV1 from './apiV1';
import config from './config.json';
import Base64 from 'base-64';

const app = express();
app.server = http.createServer(app);
// logger
app.use(morgan('dev'));
app.use((req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    return res.status(401).send({ status: 'Authorization Header Missing ' });
  }
  if (authorization !== `Basic ${Base64.encode(`${config.username}:${config.password}`)}`) {
    return res.status(401).send({ status: 'Invalid Cridentials' });
  }
  return next();
});

// limit max
app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  })
);

initializeDb(config, db => {
  // api router
  app.use('/api/v1', apiV1({ config, db }));

  // process.env.PORT as per run command PORT=XXXX npm run dev
  app.server.listen(process.env.PORT || config.port);
  console.log(`Started on port ${app.server.address().port}`);
});


export default app;
