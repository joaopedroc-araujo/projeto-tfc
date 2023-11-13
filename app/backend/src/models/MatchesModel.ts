import Team from '../database/models/TeamsModel';
import IMatch from '../Interfaces/Match/IMatch';
import IMatchModel from '../Interfaces/Match/IMatchModel';
import Match from '../database/models/MatchModels';

export default class MatchesModel implements IMatchModel {
  private model = Match;

  async getAllMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getMatchesByProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async finishMatch(matchId: number, match: Partial<IMatch>): Promise<IMatch | null> {
    await this.model.update(match, {
      where: {
        id: matchId,
      },
    });

    const updatedMatch = await this.model.findOne({
      where: {
        id: matchId,
      },
    });

    return updatedMatch;
  }
}
