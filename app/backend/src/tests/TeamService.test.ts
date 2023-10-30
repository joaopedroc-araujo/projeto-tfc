import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../models/TeamModel';
import TeamService from '../services/Teams.service';
import { TeamMock } from './mocks/TeamsMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('TeamService', () => {
  let teamService: TeamService;
  let teamModelStub: sinon.SinonStubbedInstance<TeamModel>;

  beforeEach(() => {
    teamModelStub = sinon.createStubInstance(TeamModel);
    teamService = new TeamService(teamModelStub as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('cria uma instância TeamService com o TeamModel default', () => {
    const teamService = new TeamService();
    expect(teamService).to.be.instanceOf(TeamService);
  });

  it('getAllTeams retorna todos os times', async () => {
    const teams = TeamMock;
    teamModelStub.getAllTeams.resolves(teams);

    const result = await teamService.getAllTeams();

    expect(result.data).to.deep.equal(teams);
    expect(result.status).to.equal('SUCCESSFUL');
  });

  it('getById retorna um time por ID', async () => {
    const team = TeamMock[0];
    teamModelStub.getById.resolves(team);

    const result = await teamService.getById(1);

    expect(result.data).to.deep.equal(team);
    expect(result.status).to.equal('SUCCESSFUL');
  });
});
