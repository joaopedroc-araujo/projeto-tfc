import Team from './Team';

export interface ITeamModel {
  getAllTeams(): Promise<Team[]>,
  getById(id: Team['id']): Promise<Team | null>,
}
