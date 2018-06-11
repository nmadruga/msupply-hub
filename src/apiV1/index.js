import { Router } from 'express';
import site from './site';
import { postEvent, showEvents } from './event';

export default opts => {
  const api = Router();

  api.post('/site/:UUID', site(opts));
  api.post('/event', postEvent(opts));

  api.get('/event', showEvents(opts));
  return api;
};
