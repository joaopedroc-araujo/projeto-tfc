import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import TeamService from '../services/Teams.service';
import TeamsController from '../controllers/Teams.controller';
import { TeamMock } from './mocks/TeamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('TeamsController', () => {
  let teamsController: TeamsController;
  let teamServiceStub: sinon.SinonStubbedInstance<TeamService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    teamServiceStub = sinon.createStubInstance(TeamService);
    teamsController = new TeamsController(teamServiceStub as any);
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('cria uma instância TeamsController com o TeamService default', () => {
    const teamsController = new TeamsController();
    expect(teamsController).to.be.instanceOf(TeamsController);
  });

  it('getTeams retorna todos os times', async () => {
    const teams = TeamMock;
    teamServiceStub.getAllTeams.resolves({ status: 'SUCCESSFUL', data: teams });

    await teamsController.getTeams(req as Request, res as Response);

    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
    sinon.assert.calledWith(res.json as sinon.SinonStub, teams);
  });

  it('getTeamById retorna um time por id', async () => {
    const team = TeamMock[0];
    req.params = { id: '1' };
    teamServiceStub.getById.resolves({ status: 'SUCCESSFUL', data: team });

    await teamsController.getTeamById(req as Request, res as Response);

    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
    sinon.assert.calledWith(res.json as sinon.SinonStub, team);
  });


  it('getTeams chama o método getAllTeams do serviço', async () => {
    teamServiceStub.getAllTeams.resolves({ status: 'SUCCESSFUL', data: [] });

    await teamsController.getTeams(req as Request, res as Response);

    sinon.assert.calledOnce(teamServiceStub.getAllTeams);
  });

  it('getTeamById retorna 200 e um time por id', async () => {
    const team = TeamMock[0];
    req.params = { id: '1' };
    teamServiceStub.getById.resolves({ status: 'SUCCESSFUL', data: team });

    await teamsController.getTeamById(req as Request, res as Response);

    sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
    sinon.assert.calledWith(res.json as sinon.SinonStub, team);
  });

});
