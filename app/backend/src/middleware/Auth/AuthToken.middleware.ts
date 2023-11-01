import { NextFunction, Request, Response } from 'express';
import { IJwt } from '../../Interfaces/JWT/IJwt';
import JsonWebTokenAdapter from './JsonWebTokenAdapter';
import { DecodedToken } from '../../Interfaces/JWT/DecodedToken';

export default class AuthMiddleware {
  static jwt: IJwt = new JsonWebTokenAdapter();

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ auth: false, message: 'No token provided.' });
    }

    const [token] = authorization.split(' ');
    if (!token) {
      return res.status(401).json({ auth: false, message: 'No token provided.' });
    }

    try {
      const decoded = AuthMiddleware.jwt.verify(token) as DecodedToken;
      req.body.userId = decoded.id;
      next();
    } catch (err) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
  }
}
