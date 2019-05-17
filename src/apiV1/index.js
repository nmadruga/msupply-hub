import { Router } from 'express';
import { postSite, getSite } from './site';
import { getEventTags, postEvent, showEvents } from './event';

export default opts => {
  const api = Router();

  api.post('/site/:UUID', postSite(opts));
  api.post('/event', postEvent(opts));

  api.get('/event', showEvents(opts));
  api.get('/tags', getEventTags(opts));
  api.get('/site/:UUID', getSite(opts));

  return api;
};
