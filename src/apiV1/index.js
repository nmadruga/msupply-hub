import { Router } from 'express';
import { getSite, postSite, showSites } from './site';
import { getEventTags, postEvent, showEvents } from './event';

export default opts => {
  const api = Router();

  api.post('/site/:UUID', postSite(opts));
  api.post('/event', postEvent(opts));

  api.get('/event', showEvents(opts));
  api.get('/tags', getEventTags(opts));

  api.get('/site', showSites(opts));
  api.get('/site/:UUID', getSite(opts));

  api.options('/', (opts) => opts.res.status(200))

  return api;
};