import {
  decodeJWT,
  encodeJWT,
  missingAuthHeaderOrJWT,
  UUIDAlreadyExists,
  siteAdded,
  sitesFound,
  sitesNotFound,
} from './helpers';
import { checkAddNewSite, getSites } from '../database';

export const postSite = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const UUID = req.params.UUID;
    const newJWT = encodeJWT(
      {
        type: 'site',
        UUID,
      },
      config
    );
    if (!await checkAddNewSite(db, UUID, req.body, newJWT)) return UUIDAlreadyExists(res);

    return siteAdded(res, newJWT);
  } catch (e) {
    return next(e);
  }
};

export const showSites = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const foundSites = await getSites(db);
    if (foundSites.length === 0) return sitesNotFound(res);
    return sitesFound(res, foundSites);
  } catch (e) {
    return next(e);
  }
};

// TODO: add route to documentation
