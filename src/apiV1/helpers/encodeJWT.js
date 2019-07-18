import jwt from 'jsonwebtoken';

export default (payload, { jwtSecret }) => jwt.sign(payload, jwtSecret);

