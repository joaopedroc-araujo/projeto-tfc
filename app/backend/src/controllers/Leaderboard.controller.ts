import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderBoard.service';

export default class LeaderboardController {

  public static async getLeaderboard(req: Request, res: Response) {
    try {
      const leaderboardData = await LeaderboardService.getLeaderboard(req, res);
      res.json(leaderboardData);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the leaderboard.' });
    }
  }

  public static async getHomeLeaderboard(req: Request, res: Response) {
    try {
      const leaderboardData = await LeaderboardService.getHomeLeaderboard(req, res);
      // console.log(leaderboardData);
      res.json(leaderboardData);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the leaderboard.' });
    }
  }

  public static async getAwayLeaderboard(req: Request, res: Response) {
    try {
      const leaderboardData = await LeaderboardService.getAwayLeaderboard(req, res);
      res.json(leaderboardData);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the leaderboard.' });
    }
  }

}
