import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ErrorModel } from 'models';
import { INVALID_AUTH, JET_SECRET_ERROR } from '../constants';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const urlWithoutLastSlash = req.originalUrl.endsWith('/') ? req.originalUrl.slice(0, -1) : req.originalUrl;

    const nonSecurePaths = ['/users/login', '/users/register'];
    if (nonSecurePaths.includes(urlWithoutLastSlash)) {
      next();
      return;
    }

    const nonSecurePathParts = ['doc', 'orders/code'];
    const firstPathPart = urlWithoutLastSlash?.split('/')?.length > 0 ? urlWithoutLastSlash?.split('/')?.[1] : undefined;
    const secondPathPart = urlWithoutLastSlash?.split('/')?.length > 1 ? urlWithoutLastSlash?.split('/')?.[2] : undefined;
    if (nonSecurePathParts.includes(firstPathPart) || nonSecurePathParts.includes(`${firstPathPart}/${secondPathPart}`)) {
      next();
      return;
    }

    const secret: string = process.env.JWT_SECRET;

    if (!secret || secret === '' || secret?.length === 0) {
      throw JET_SECRET_ERROR;
    }

    let authorization = req.header('authorization') ? req.header('authorization') : '';
    if (authorization?.length > 0) {
      try {
        jwt.verify(authorization.replace('Bearer ', ''), secret, { ignoreExpiration: true });
      } catch (error) {
        throw INVALID_AUTH;
      }
    } else {
      throw INVALID_AUTH;
    }

    // COMPANY_ADMIN ROUTES
    const decodedToken = decodeToken(authorization.replace('Bearer ', ''));
    if (['POST', 'PUT'].includes(req.method) && ['/orders'].includes(urlWithoutLastSlash) && decodedToken.role !== 'COMPANY_ADMIN') {
      throw INVALID_AUTH;
    }

    next();
  } catch (err) {
    res.status(err.status).send(err.data);
    return;
  }
}

function generateAccessToken(email: string, role: string): string {
  const secret: string = process.env.JWT_SECRET;
  if (!secret || secret === '' || secret?.length === 0) {
    const err: ErrorModel = JET_SECRET_ERROR;
    throw err;
  }

  return jwt.sign(JSON.stringify({ email: email, role: role }), secret);
}

function decodeToken(token: string) {
  return token ? jwt.decode(token.includes('Bearer') ? token.replace('Bearer ', '') : token, { json: true }) : undefined;
}

export { authMiddleware, generateAccessToken, decodeToken };
