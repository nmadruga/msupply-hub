import {
  decodeJWT,
  eventAdded,
  eventsFound,
  eventsNotFound,
  missingAuthHeaderOrJWT,
  siteMachineUUIDNotMatching,
  siteUUIDNotRegistered,
  tagsFound,
  tagsNotFound,
} from './helpers';
import { addNewEvent, addSiteInfo, addSiteMachine, checkSite, checkSiteAndMachine, getEvents, getSiteMachine, getTags } from '../database';

export const postEvent = ({ config, db }) => async (req, res, next) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const decodedToken = decodeJWT(authorization, config);

    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const { UUID, type: jwtType } = decodedToken;

    if (jwtType !== 'site' || !(await checkSite(db, UUID))) return siteUUIDNotRegistered(res);

    const { body } = req;
    const { type, eventType, machineUUID, triggerDate, ...otherInfo } = body;

    if (!await checkSiteAndMachine(db, UUID, machineUUID)) return siteMachineUUIDNotMatching(res);

    // If an existing site machine has been upgraded, delete the old machineUUID.
    if (!await getSiteMachine(db, UUID)) await addSiteMachine(db, UUID, machineUUID);

    const event = type || eventType;

    await addNewEvent(db, UUID, event, triggerDate, otherInfo);

    // If the event is of type "info", add the latest data to the database.
    if (event === 'info') addSiteInfo(db, UUID, otherInfo);

    return eventAdded(res);
  } catch (e) {
    return next(e);
  }
};

export const showEvents = ({ config, db }) => async (req, res, next) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const decodedToken = decodeJWT(authorization, config);

    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const { query } = req;
    const events = await getEvents(db, query);

    return events.length === 0 ? eventsNotFound(res) : eventsFound(res, events);
  } catch (e) {
    return next(e);
  }
};

export const getEventTags = ({ config, db }) => async (req, res, next) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const decodedToken = decodeJWT(authorization, config);

    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const tagKeys = await getTags(db);

    return tagKeys.length === 0 ? tagsNotFound(res) : tagsFound(res, tagKeys);
  } catch (e) {
    return next(e);
  }
};
