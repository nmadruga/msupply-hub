import { decodeJWT, missingAuthHeaderOrJWT, UUIDNotRegistered, eventAdded } from './helpers';
import { checkSiteExists, addEvent } from '../database';

export default ({ config, db }) => async (req, res, next) => {
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
