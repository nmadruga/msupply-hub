import { Router } from 'express';
import postVersion from './postVersion';
import getVersion from './getVersion';

export default opts => {
  const api = Router();

  api.get('/version/:servercode', getVersion(opts));
  api.post('/version', postVersion(opts));

  return api;
};
