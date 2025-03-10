import jwt from 'jsonwebtoken';
import config from '@core/config';
import { Unauthorized } from 'http-errors';

export function authenticate(req, res, next) {
  // 1. Retrieve token
  console.log('header', req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Unauthorized();
  }
  const token = authHeader.replace(/^Bearer\s+/, '');

  // 2. Verify token
  let identity;
  try {
    identity = jwt.verify(token, config.auth.secret);
  } catch (err) {
    throw new Unauthorized('Invalid Token');
  }
  // 3. Set req.user to identity
  req.user = identity;
  next();
}
