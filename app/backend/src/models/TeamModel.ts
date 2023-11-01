import { ITeamModel } from '../Interfaces/Teams/TeamModel';
import Team from '../database/models/TeamsModel';
import ITeam from '../Interfaces/Teams/Team';

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
