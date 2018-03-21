import { Router } from 'express';
import site from './site';
import event from './event';

export default opts => {
  const api = Router();

  api.post('/site/:UUID', site(opts));
  api.post('/event', event(opts));

  return api;
};
