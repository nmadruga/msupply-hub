import { decodeJWT } from './helpers';
import { checkSiteExists, addEvent } from '../database';

export default ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) {
      return res.status(401).send({
        authorized: false,
        message: 'authorization header missing or JWT token is invalid',
      });
    }
    const UUID = decodedToken.UUID;
    const { type, triggerDate, ...otherInfo } = req.body;
    if (decodedToken.type !== 'site' || !checkSiteExists(db, UUID)) {
      return res.status(401).send({
        authorized: false,
        message: 'UUID is not registered',
      });
    }
    addEvent(db, UUID, type, triggerDate, otherInfo);
    return res.send({
      success: true,
      message: 'event added',
    });
  } catch (e) {
    return next(e);
  }
};

// TODO: add event to documentation
// TODO: check if type is allowed and otherInfo is not null and is json
