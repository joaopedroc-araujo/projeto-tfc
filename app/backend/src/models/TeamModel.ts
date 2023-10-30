import { ITeamModel } from '../Interfaces/TeamModel';
// import { newTeam } from '../Interfaces';
import Team from '../database/models/TeamsModel';
import ITeam from '../Interfaces/Team';

export default class TeamModel implements ITeamModel {
  private model = Team;

  async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
