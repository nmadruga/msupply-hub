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
import { addEvent, addSiteMachine, checksSite, checksSiteAndMachine, getEvents, getSiteMachine, getTags } from '../database';

export const postEvent = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const UUID = decodedToken.UUID;
    const machineUUID = decodeJWT.machineUUID;
    const { type, eventType, triggerDate, ...otherInfo } = req.body;

    if (decodedToken.type !== 'site' || !(await checksSite(db, UUID)))
      return UUIDNotRegistered(res);

    if (!await checksSiteAndMachine(db, UUID, machineUUID)) // Error: Existing site UUID & machineUUID are not matching  
      return siteMachineUUIDNotMatching(res);

    // In the rare occasion that an existing site has a machine upgraded we should delete the old machineUUID from the database
    if (!await getSiteMachine(db, UUID)) // Will check if machineUUID is empty, update to the NEW machineUUID and continue
      await addSiteMachine(db, UUID, machineUUID)
      
    const typeToAdd = eventType ? eventType : type;
    await addEvent(db, UUID, typeToAdd, triggerDate, otherInfo); // Site and machine are correct, will add the new event
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
