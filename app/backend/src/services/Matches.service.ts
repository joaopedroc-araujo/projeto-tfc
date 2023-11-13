import MatchesModel from '../models/MatchesModel';
import IMatchModel from '../Interfaces/Match/IMatchModel';
// import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/Match/IMatch';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<IMatch[]> {
    const matches = await this.matchesModel.getAllMatches();
    return matches;
  }

  public async getMatchesByProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.matchesModel.getMatchesByProgress(inProgress);
    return matches;
  }
}
