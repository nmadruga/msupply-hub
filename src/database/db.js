import PgWrapper from './PgWrapper';

export default (config, callback) => {
  // connect to a database if needed, then pass it to `callback`:
  callback(new PgWrapper(config));
};
