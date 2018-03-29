import pgPromise from 'pg-promise';

export default config => pgPromise()(config.pg);
