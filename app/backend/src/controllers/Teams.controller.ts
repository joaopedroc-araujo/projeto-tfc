import { Request, Response } from 'express';
import TeamService from '../services/Teams.service';

export default class TeamsController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getTeams(req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    if (serviceResponse.status === 'SUCCESSFUL') {
      return res.status(200).json(serviceResponse.data);
    }
  }

  public async getTeamById(req: Request, res: Response) {
    const teamId = Number(req.params.id);
    const serviceResponse = await this.teamService.getById(teamId);
    if (serviceResponse.status === 'SUCCESSFUL') {
      return res.status(200).json(serviceResponse.data);
    }
  }
}
