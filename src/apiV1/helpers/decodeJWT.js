import jwt from 'jsonwebtoken';

export default (authorizationHeader, { jwtSecret }) => {
  try {
    return jwt.verify(authorizationHeader.replace(/Bearer /, '').trim(), jwtSecret);
  } catch (e) {
    return null;
  }
};
