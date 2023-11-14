import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

// const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => LeaderboardController.getHomeLeaderboard(req, res),
);

export default router;
