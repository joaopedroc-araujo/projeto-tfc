import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import UserModel from '../../models/UserModel';

const emailPassMessage = 'Invalid email or password';

interface User {
  email: string;
  password: string;
}

export default class Validation {
  static userModel = new UserModel();

  static async validateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const user = req.body;

    const notFoundKey = Validation.checkRequiredFields(user);
    if (notFoundKey) {
      return Validation.sendErrorResponse(res, 'All fields must be filled');
    }

    if (!Validation.validateEmail(user.email)) {
      return Validation.sendErrorResponse(res, emailPassMessage);
    }

    if (user.password && !Validation.validatePasswordLength(user.password)) {
      return Validation.sendErrorResponse(res, emailPassMessage);
    }

    return Validation.checkUserInDb(user, res, next);
  }

  static sendErrorResponse(res: Response, message: string): Response {
    return res.status(400).json({ message });
  }

  static checkRequiredFields(user: User): string | undefined {
    const requiredKeys = ['email', 'password'];
    return requiredKeys.find((key) => !(key in user));
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  }

  static validatePasswordLength(password: string): boolean {
    return password.length >= 6;
  }

  static comparePassword(
    password: string,
    hashedPassword: string,
    res: Response,
    next: NextFunction,
  ) {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (!isMatch) {
        return res.status(401).json({ message: emailPassMessage });
      }
      next();
    });
  }

  static async checkUserInDb(user: User, res: Response, next: NextFunction) {
    const userInDb = await Validation.userModel.findUserByEmail(user.email);
    if (!userInDb) {
      return Validation.sendErrorResponse(res, emailPassMessage);
    }

    Validation.comparePassword(user.password, userInDb.password, res, next);
  }
}
