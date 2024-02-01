import { Request, Response } from 'express';
import Match from '../database/models/MatchModels';
import Team from '../database/models/TeamsModel';
import leaderboardManipulations from '../utils/leaderboardManipulation';

export default class LeaderboardService {
  static async getHomeLeaderboard(_req: Request, _res: Response) {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });

    const leaderboard = teams.map((team) => leaderboardManipulations.calculateStats(team, matches, true));

    leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if ((a.goalsFavor - a.ownGoals) !== (b.goalsFavor - b.ownGoals)) {
        return (b.goalsFavor - b.ownGoals) - (a.goalsFavor - a.ownGoals);
      }
      return b.goalsFavor - a.goalsFavor;
    });

    return leaderboard;
  }

  static async getAwayLeaderboard(_req: Request, _res: Response) {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });

    const leaderboard = teams.map((team) => leaderboardManipulations.calculateStats(team, matches, false));

    leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if ((a.goalsFavor - a.ownGoals) !== (b.goalsFavor - b.ownGoals)) {
        return (b.goalsFavor - b.ownGoals) - (a.goalsFavor - a.ownGoals);
      }
      return b.goalsFavor - a.goalsFavor;
    });

    return leaderboard;
  }
}
