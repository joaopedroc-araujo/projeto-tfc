import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const matches = await this.matchesService.getAllMatches();
    return res.status(200).json(matches);
  }
}
