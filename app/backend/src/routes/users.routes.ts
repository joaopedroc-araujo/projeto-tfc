import { Request, Router, Response } from 'express';
// import AuthMiddleware from '../middleware/Auth/AuthToken.middleware';
import UserController from '../controllers/User.controller';
import EmailValidation from '../middleware/Validation/EmailValidation';
import PasswordValidation from '../middleware/Validation/PasswordValidation';
// import AuthMiddleware from '../middleware/Auth/AuthToken.middleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  EmailValidation.validateEmail,
  PasswordValidation.validatePassword,
  (req: Request, res: Response) => userController.authenticateUser(req, res),
);

export default router;
