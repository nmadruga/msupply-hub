import { Router } from 'express';
import { postSite, showSites } from './site';
import { getEventTags, postEvent, showEvents } from './event';

export default opts => {
  const api = Router();

  api.post('/site/:UUID', postSite(opts));
  api.post('/event', postEvent(opts));

  api.get('/event', showEvents(opts));
  api.get('/site', showSites(opts));
  api.get('/tags', getEventTags(opts));

  return api;
};
