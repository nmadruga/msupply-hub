import {
  decodeJWT,
  encodeJWT,
  missingAuthHeaderOrJWT,
  siteAdded,
  sitesFound,
  sitesNotFound,
  siteMachineUUIDMatching,
  siteMachineUUIDNotMatching,
  siteUUIDAlreadyExists,
  siteUUIDNotFound,
} from './helpers';
import { addNewSite, getSites } from '../database';

export const getSite = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const findUUID = req.params.UUID;
    const findMachineUUID = req.body.machineUUID;

    const foundSites = await getSites(db);
    const matchingSite = foundSites.find(({ UUID }) => findUUID === UUID);

    if (matchingSite) {
      // If machineUUID is empty that means it can be replaced
      // will return that the site matches and update the machineUUID
      return matchingSite.machineUUID === '' ||
      findMachineUUID === matchingSite.machineUUID
        ? siteMachineUUIDMatching(res)
        : siteMachineUUIDNotMatching(res);
    }
    return siteUUIDNotFound(res);
  } catch (e) {
    return next(e);
  }
};

export const postSite = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const UUID = req.params.UUID;
    const machineUUID = req.body.machineUUID;
    const newJWT = encodeJWT(
      {
        type: 'site',
        UUID,
        machineUUID,
      },
      config
    );
    if (!await addNewSite(db, UUID, machineUUID, newJWT)) return siteUUIDAlreadyExists(res);

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
    return foundSites.length === 0 ? sitesNotFound(res) : sitesFound(res, foundSites);
  } catch (e) {
    return next(e);
  }
};

// TODO: add route to documentation
