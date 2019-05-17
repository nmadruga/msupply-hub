import {
  decodeJWT,
  encodeJWT,
  missingAuthHeaderOrJWT,
  UUIDAlreadyExists,
  siteAdded,
  siteMachineUUIDMatching,
  siteMachineUUIDNotMatching,
  siteUUIDNotFound
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

export const getSite = ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) return missingAuthHeaderOrJWT(res);

    const findUUID = req.params.UUID;
    const findMachineUUID = req.body.machineUUID;

    const foundSites = await getSites(db);
    const matchingSite = foundSites.find(({ UUID }) => findUUID === UUID)

    if (matchingSite)
      return (matchingSite.machineUUID === "" || findMachineUUID === matchingSite.machineUUID)
        ? siteMachineUUIDMatching(res)
        : siteMachineUUIDNotMatching(res);
    else
      return siteUUIDNotFound(res);
  } catch (e) {
    return next(e);
  }
};

// TODO: add route to documentation
