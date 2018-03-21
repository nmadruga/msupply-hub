import { decodeJWT, encodeJWT } from './helpers';
import { checkAddNewSite } from '../database';

export default ({ config, db }) => async (req, res, next) => {
  try {
    const decodedToken = decodeJWT(req.headers.authorization, config);
    if (!decodedToken) {
      return res.status(401).send({
        authorized: false,
        message: 'authorization header missing or JWT token is invalid',
      });
    }
    const UUID = req.params.UUID;
    const newJWT = encodeJWT({
      type: 'site',
      UUID,
    }, config);

    if (!checkAddNewSite(db, UUID, req.body, newJWT)) {
      return res.status(401).send({
        authorized: false,
        message: 'UUID already registered',
      });
    }

    return res.send({
      authorized: true,
      token: newJWT,
    });
  } catch (e) {
    return next(e);
  }
};

// TODO: add route to documentation
