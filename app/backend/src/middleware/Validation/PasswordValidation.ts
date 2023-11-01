// PasswordValidation.ts
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';

interface User {
  password: string;
}

export default class PasswordValidation {
  static validatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void | Response {
    const user = req.body as User;

    if (!user.password) {
      return PasswordValidation.sendErrorResponse(res, 'All fields must be filled', 400);
    }

    if (!PasswordValidation.validatePasswordLength(user.password)) {
      return PasswordValidation.sendErrorResponse(res, 'Invalid email or password', 401);
    }

    PasswordValidation.comparePassword(user.password, req.body.userInDb.password, res, next);
  }

  static sendErrorResponse(res: Response, message: string, status: number): Response {
    return res.status(status).json({ message });
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
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      next();
    });
  }
}
