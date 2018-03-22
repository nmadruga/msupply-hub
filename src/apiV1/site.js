import {
  decodeJWT,
  encodeJWT,
  missingAuthHeaderOrJWT,
  UUIDAlreadyExists,
  siteAdded,
 } from './helpers';
import { checkAddNewSite } from '../database';

export default ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const UUID = req.params.UUID;
    const newJWT = encodeJWT({
      type: 'site',
      UUID,
    }, config);
    if (!await checkAddNewSite(db, UUID, req.body, newJWT)) return UUIDAlreadyExists(res);

    return setAdded(newJWT);
  } catch (e) {
    return next(e);
  }
};

// TODO: add route to documentation
