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
    const { headers } = req;
    const { authorization } = headers;

    const decodedToken = decodeJWT(authorization, config);

    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const { params, body } = req;
    const { UUID: targetUUID } = params;
    const { machineUUID: targetMachineUUID } = body;

    const sites = await getSites(db);
    const site = sites.find(({ UUID: foundUUID }) => foundUUID === targetUUID);

    if (!site) return siteUUIDNotFound(res);

    const { machineUUID: foundMachineUUID } = site;

    // If machineUUID is empty that means it can be replaced.
    // Return that the site matches and update the machineUUID.
    if (foundMachineUUID === '') return siteMachineUUIDMatching(res);

    return foundMachineUUID === targetMachineUUID ?
        siteMachineUUIDMatching(res) : siteMachineUUIDNotMatching(res);
  } catch (e) {
    return next(e);
  }
};

export const postSite = ({ config, db }) => async (req, res, next) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const decodedToken = decodeJWT(authorization, config);

    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const { params, body } = req;
    const { UUID } = params;
    const { machineUUID } = body;

    const jwt = encodeJWT({ type: 'site', UUID, machineUUID }, config);

    if (!await addNewSite(db, UUID, machineUUID, jwt)) return siteUUIDAlreadyExists(res);

    return siteAdded(res, jwt);
  } catch (e) {
    return next(e);
  }
};

export const showSites = ({ config, db }) => async (req, res, next) => {
  try {
    const { headers } = req;
    const { authorization } = headers;

    const decodedToken = decodeJWT(authorization, config);

    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const foundSites = await getSites(db);

    return foundSites.length === 0 ? sitesNotFound(res) : sitesFound(res, foundSites);
  } catch (e) {
    return next(e);
  }
};

// TODO: add route to documentation
