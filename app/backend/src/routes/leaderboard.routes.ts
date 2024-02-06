import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();

router.get(
  '/',
  async (req: Request, res: Response) => await LeaderboardController.getLeaderboard(req, res),
);

router.get(
  '/home',
  async (req: Request, res: Response) => await LeaderboardController.getHomeLeaderboard(req, res),
);

router.get(
  '/away',
  async (req: Request, res: Response) => await LeaderboardController.getAwayLeaderboard(req, res),
)

export default router;
