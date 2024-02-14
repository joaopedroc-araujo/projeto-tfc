import { Request, Response } from 'express';
import Match from '../database/models/MatchModels';
import Team from '../database/models/TeamsModel';
import leaderboardManipulations from '../utils/leaderboardManipulation';

export default class LeaderboardService {
  static async getLeaderboard(_req: Request, _res: Response) {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });

    const leaderboard = leaderboardManipulations.calculateAndSortLeaderboard(teams, matches, 'total');
    return leaderboard;
  }

  static async getHomeLeaderboard(_req: Request, _res: Response) {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });

    const leaderboard = leaderboardManipulations.calculateAndSortLeaderboard(teams, matches, 'home');
    
    return leaderboard;
  }

  static async getAwayLeaderboard(_req: Request, _res: Response) {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });

    const leaderboard = leaderboardManipulations.calculateAndSortLeaderboard(teams, matches, 'away');

    return leaderboard;
  }
}
