import TeamService from '../services/Teams.service';
import IMatch from '../Interfaces/Match/IMatch';

export default class ValidateMatch {
  constructor(
    private teamsService = new TeamService(),
  ) { }

  public async validateMatch(match: IMatch): Promise<{
    error: true,
    status: number,
    message: string
  } | null> {
    if (match.homeTeamId === match.awayTeamId) {
      return {
        error: true,
        status: 422,
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const homeTeam = await this.teamsService.getById(match.homeTeamId);
    const awayTeam = await this.teamsService.getById(match.awayTeamId);

    if (homeTeam.data === null || awayTeam.data === null) {
      return { error: true, status: 404, message: 'There is no team with such id!' };
    }
    return null;
  }
}
