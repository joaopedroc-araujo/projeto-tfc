// EmailValidation.ts
import { Request, Response, NextFunction } from 'express';
import UserModel from '../../models/UserModel';

interface User {
  email: string;
}

export default class EmailValidation {
  static userModel = new UserModel();

  static async validateEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const user = req.body as User;

    if (!user.email) {
      return EmailValidation.sendErrorResponse(res, 'All fields must be filled', 400);
    }

    if (!EmailValidation.validateEmailRegEx(user.email)) {
      return EmailValidation.sendErrorResponse(res, 'Invalid email or password', 401);
    }

    return EmailValidation.checkUserInDb(req, res, next);
  }

  static sendErrorResponse(res: Response, message: string, status: number): Response {
    return res.status(status).json({ message });
  }

  static validateEmailRegEx(email: string): boolean {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  }

  static async checkUserInDb(req: Request, res: Response, next: NextFunction) {
    const user = req.body as User;
    const userInDb = await EmailValidation.userModel.findUserByEmail(user.email);

    if (!userInDb) {
      return EmailValidation.sendErrorResponse(res, 'Invalid email or password', 401);
    }

    req.body.userInDb = userInDb;
    next();
  }
}
