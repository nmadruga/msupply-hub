import { Router } from 'express';
import { postSite, showSites } from './site';
import { postEvent, showEvents } from './event';

export default opts => {
  const api = Router();

  api.post('/site/:UUID', postSite(opts));
  api.post('/event', postEvent(opts));

  api.get('/event', showEvents(opts));
  api.get('/site', showSites(opts));

  return api;
};
