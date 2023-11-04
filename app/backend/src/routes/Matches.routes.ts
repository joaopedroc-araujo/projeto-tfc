import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Matches.controller';
import { verifyToken } from '../middleware/Auth/AuthToken.middleware';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  //   verifyToken,
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

export default router;
