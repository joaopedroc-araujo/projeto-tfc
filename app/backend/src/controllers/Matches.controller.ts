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

  public async getMatchesByProgress(req: Request, res: Response) {
    const inProgress = req.query.inProgress === 'true';
    const matches = await this.matchesService.getMatchesByProgress(inProgress);
    return res.status(200).json(matches);
  }

  public async finishMatch(req: Request, res: Response) {
    const matchId = Number(req.params.id);
    const match = { inProgress: false };
    await this.matchesService.finishMatch(matchId, match);
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const matchId = Number(req.params.id);
    const match = req.body;
    await this.matchesService.updateMatch(matchId, match);
    return res.status(200).json({ message: 'Updated' });
  }

  // public async newMatch(req: Request, res: Response) {
  //   const match = req.body;
  //   const newMatch = await this.matchesService.newMatch(match);
  //   return res.status(201).json(newMatch);
  // }
}
