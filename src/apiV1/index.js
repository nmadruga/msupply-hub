import { Router } from 'express';
import site from './site';

export default opts => {
  const api = Router();

  api.post('/site/:UUID', site(opts));

  return api;
};
