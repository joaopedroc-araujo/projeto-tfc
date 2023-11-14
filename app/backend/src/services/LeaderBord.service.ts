import { Request, Response } from 'express';
import ITeam from '../Interfaces/Teams/Team';
import IMatch from '../Interfaces/Match/IMatch';
// import ILeaderboard from '../Interfaces/Leaderboard/ILeaderboard';
import Match from '../database/models/MatchModels';
import Team from '../database/models/TeamsModel';

export default class LeaderboardService {
  static async getHomeLeaderboard(_req: Request, _res: Response) {
    const teams = await Team.findAll();
    const matches = await Match.findAll({ where: { inProgress: false } });

    return teams.map((team) => LeaderboardService.calculateStats(team, matches));
  }

  static calculateStats(team: Partial<ITeam>, matches: IMatch[]) {
    const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
    const totalGames = homeMatches.length;
    const totalVictories = LeaderboardService.calculateVictories(homeMatches);
    const totalDraws = LeaderboardService.calculateDraws(homeMatches);
    const totalLosses = totalGames - totalVictories - totalDraws;
    const goalsFavor = LeaderboardService.calculateGoalsFavor(homeMatches);
    const goalsOwn = LeaderboardService.calculateGoalsOwn(homeMatches);
    const totalPoints = totalVictories * 3 + totalDraws;
    // console.log(
    //   team.teamName,
    //   homeMatches,
    //   totalPoints,
    //   totalGames,
    //   totalVictories,
    //   totalDraws,
    //   totalLosses,
    //   goalsFavor,
    //   goalsOwn,
    // );
    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
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
