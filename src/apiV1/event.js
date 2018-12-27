import {
  decodeJWT,
  missingAuthHeaderOrJWT,
  UUIDNotRegistered,
  eventAdded,
  eventsFound,
  eventsNotFound,
  tagsFound,
  tagsNotFound,
  siteMachineUUIDNotMatching,
} from './helpers';
import { addEvent, addMachineToSite, checkSiteExists, checkSiteMatchesMachine, getEvents, getSiteMachine, getTags } from '../database';

export const postEvent = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const UUID = decodedToken.UUID;
    const machineUUID = decodeJWT.machineUUID;
    const { type, triggerDate, ...otherInfo } = req.body;
    if (decodedToken.type !== 'site' || !(await checkSiteExists(db, UUID)))
      return UUIDNotRegistered(res);

    if (!await getSiteMachine(db, UUID)) // Checks if there is no machine UUID associatedn with this site
      await addMachineToSite(db, UUID, machineUUID)

    if (!await checkSiteMatchesMachine(db, UUID, machineUUID)) // If existing site & machine are not matching return error
      return siteMachineUUIDNotMatching(res);

    await addEvent(db, UUID, type, triggerDate, otherInfo); // Or if site and machine are correct, add the event
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
    return foundEvents.length === 0
      ? eventsNotFound(res)
      : eventsFound(res, foundEvents);

  } catch (e) {
    return next(e);
  }
};

export const getEventTags = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const foundTagKeys = await getTags(db);
    return foundTagKeys.length === 0
      ? tagsNotFound(res)
      : tagsFound(res, foundTagKeys);

  } catch (e) {
    return next(e);
  }
};
