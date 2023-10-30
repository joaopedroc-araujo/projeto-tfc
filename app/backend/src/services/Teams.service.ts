import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/TeamModel';
// import { newTeam } from '../Interfaces';
import ITeam from '../Interfaces/Team';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.getAllTeams();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getById(teamId: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.getById(teamId);
    return { status: 'SUCCESSFUL', data: team };
  }
}
