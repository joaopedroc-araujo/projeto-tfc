import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Matches.controller';
import { verifyToken } from '../middleware/Auth/AuthToken.middleware';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => {
    if (req.query.inProgress !== undefined) {
      return matchesController.getMatchesByProgress(req, res);
    }
    return matchesController.getAllMatches(req, res);
  },
);

router.patch(
  '/:id/finish',
  verifyToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default router;
