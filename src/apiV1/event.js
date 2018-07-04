import { decodeJWT, missingAuthHeaderOrJWT, UUIDNotRegistered, eventAdded, eventsFound, eventsNotFound, tagsFound, tagsNotFound } from './helpers';
import { checkSiteExists, addEvent, getEvents, getTags } from '../database';

export const postEvent = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const UUID = decodedToken.UUID;
    const { type, triggerDate, ...otherInfo } = req.body;
    if (decodedToken.type !== 'site' || !await checkSiteExists(db, UUID)) return UUIDNotRegistered(res);

    await addEvent(db, UUID, type, triggerDate, otherInfo);
    return eventAdded(res);
  } catch (e) {
    return next(e);
  }
};

export const showEvents = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const foundEvents = await getEvents(db, req.query);
    if (foundEvents.length === 0) return eventsNotFound(res);
    return eventsFound(res, foundEvents);
  } catch (e) {
    return next(e);
  }
};

export const getEventTags = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const foundTagKeys = await getTags(db, req.query);
    if (foundTagKeys.length === 0) return tagsNotFound(res);
    return tagsFound(res, foundTagKeys);
  } catch (e) {
    return next(e);
  }
};

