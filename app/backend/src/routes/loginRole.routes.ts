import { Request, Router, Response } from 'express';
import UserController from '../controllers/User.controller';
import { verifyToken } from '../middleware/Auth/AuthToken.middleware';

const userController = new UserController();

const router = Router();

router.get(
  '/',
  verifyToken,
  (req: Request, res: Response) => userController.findUserById(req, res),
);

export default router;
