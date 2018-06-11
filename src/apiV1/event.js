import { decodeJWT, missingAuthHeaderOrJWT, UUIDNotRegistered, eventAdded, eventsFound, eventsNotFound } from './helpers';
import { checkSiteExists, addEvent, getEvents } from '../database';

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

// TODO: check if type is allowed and otherInfo is not null and is json

// TODO: Allow filtering by: siteUUID, type, and created. 
export const showEvents = ({ config,db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const foundEvents = await getEvents(db); 
    if(foundEvents.length === 0) return eventsNotFound(res); 
    return eventsFound(res, foundEvents); 
  } catch (e) {
    return next (e); 
  }
};

