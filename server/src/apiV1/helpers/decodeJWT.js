import jwt from 'jsonwebtoken';

export default (authorizationHeader, { secret }) => {
  try {
    return jwt.verify(authorizationHeader.replace(/Bearer /, '').trim(), secret);
  } catch (e) {
    return null;
  }
};
