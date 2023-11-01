import { expect } from 'chai';
import * as sinon from 'sinon';
import Team  from '../database/models/TeamsModel';
import TeamModel from '../models/TeamModel';


describe('TeamModel', () => {
  let teamModel: TeamModel;
  let teamStub: sinon.SinonStub;

  beforeEach(() => {
    teamStub = sinon.stub(Team, 'findAll');
    teamModel = new TeamModel();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('getAllTeams retorna todos os times', async () => {
    const mockTeams = [{ id: 1, name: 'Time 1' }, { id: 2, name: 'Time 2' }];
    teamStub.resolves(mockTeams);

    const teams = await teamModel.getAllTeams();

    expect(teams).to.deep.equal(mockTeams);
    sinon.assert.calledOnce(teamStub);
  });

});
