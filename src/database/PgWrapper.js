import pg from 'pg';

export default class {
  constructor(config) {
    this.connection = new pg.Pool(config.pg);
    pg.on('error', (err, client) => {
      if (err) throw new Error('PG CONNECTION FAILED');
    });
  }

  query(next, query, callBack) {
    console.log(query);

    this.connection.query(query, (err, result) => {
      if (err) next(new Error(`ERROR DURING QUERY ${query}`));
      else callBack(result);
    });
  }

  createVersionRecord(next, versionData, callBack) {
    const { version, servercode } = versionData;
    const date = new Date();
    const formatedDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    this.query(next, `INSERT INTO "version" (version, servercode, timestamp) values ('${version}', '${servercode}', '${formatedDate}')`,
    () => callBack(formatedDate));
  }

  getVersionRecord(next, servercode, callBack) {
    this.query(next, `SELECT version, timestamp from version where servercode = '${servercode}' order by timestamp asc`,
    callBack);
  }
}
