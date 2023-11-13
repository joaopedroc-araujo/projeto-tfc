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

router.post(
  '/',
  verifyToken,
  (req: Request, res: Response) => matchesController.newMatch(req, res),
);

router.patch(
  '/:id/finish',
  verifyToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  verifyToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
