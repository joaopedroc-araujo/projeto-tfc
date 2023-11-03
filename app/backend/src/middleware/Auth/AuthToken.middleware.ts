import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { RequestWithUserId } from '../../Interfaces/RequestWithUserId';
import { DecodedToken } from '../../Interfaces/JWT/DecodedToken';

const JWT_SECRET = process.env.JWT_SECRET || 'paralelepipedo';

const validTokenDeclaration = 'Token must be a valid token';

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET);
}

export async function verifyToken(req: RequestWithUserId, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const [scheme, token] = authorization.split(' ');
  if (!/^Bearer$/i.test(scheme) || !token) {
    return res.status(401).json({ message: validTokenDeclaration });
  }

  try {
    const result = jwt.verify(token, JWT_SECRET);

    if (typeof result === 'string' || !result.id) {
      return res.status(401).json({ message: validTokenDeclaration });
    }

    const payload: DecodedToken = result as DecodedToken;

    req.userId = payload.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: validTokenDeclaration });
  }
}
