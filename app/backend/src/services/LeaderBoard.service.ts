import { Request, Response } from 'express';
import ITeam from '../Interfaces/Teams/Team';
import IMatch from '../Interfaces/Match/IMatch';
import Match from '../database/models/MatchModels';
import Team from '../database/models/TeamsModel';

export default class LeaderboardService {
  static async getHomeLeaderboard(_req: Request, _res: Response) {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });
  
    const leaderboard = teams.map((team) => LeaderboardService.calculateStats(team, matches));
  
    leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if ((a.goalsFavor - a.goalsOwn) !== (b.goalsFavor - b.goalsOwn)) {
        return (b.goalsFavor - b.goalsOwn) - (a.goalsFavor - a.goalsOwn);
      }
      return b.goalsFavor - a.goalsFavor;
    });
  
    return leaderboard;
  }

  static calculateTeamStats(homeMatches: IMatch[]) {
    const totalGames = homeMatches.length;
    const totalVictories = LeaderboardService.calculateVictories(homeMatches);
    const totalDraws = LeaderboardService.calculateDraws(homeMatches);
    const goalsFavor = LeaderboardService.calculateGoalsFavor(homeMatches);
    const goalsOwn = LeaderboardService.calculateGoalsOwn(homeMatches);

    return {
      totalPoints: totalVictories * 3 + totalDraws,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: totalGames - totalVictories - totalDraws,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Math
        .round(((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100 * 100) / 100,
    };
  }

  static calculateStats(team: Partial<ITeam>, matches: IMatch[]) {
    const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
    const teamStats = LeaderboardService.calculateTeamStats(homeMatches);

    return {
      name: team.teamName,
      ...teamStats,
    };
  }

  static calculateVictories(matches: IMatch[]) {
    return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  static calculateDraws(matches: IMatch[]) {
    return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  static calculateGoalsFavor(matches: IMatch[]) {
    return matches.reduce((total, match) => total + match.homeTeamGoals, 0);
  }

  static calculateGoalsOwn(matches: IMatch[]) {
    return matches.reduce((total, match) => total + match.awayTeamGoals, 0);
  }
}
