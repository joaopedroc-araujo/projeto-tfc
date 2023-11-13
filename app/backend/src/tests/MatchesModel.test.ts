import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchesModel from '../models/MatchesModel';
import Match from '../database/models/MatchModels';
import Team from '../database/models/TeamsModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('MatchesModel', () => {
  let matchesModel: MatchesModel;
  let findAllStub: SinonStub;

  beforeEach(() => {
    matchesModel = new MatchesModel();
    findAllStub = sinon.stub(Match, 'findAll');
  });

  afterEach(() => {
    findAllStub.restore();
  });

  it('retorna todas as partidas', async () => {
    const expectedMatches = [{ id: 1 }, { id: 2 }];
    findAllStub.resolves(expectedMatches);

    const matches = await matchesModel.getAllMatches();

    expect(matches).to.deep.equal(expectedMatches);
    expect(findAllStub.calledOnce).to.be.true;
    expect(findAllStub.firstCall.args[0]).to.deep.equal({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  });

  it('filtra partidas por progresso', async () => {
    const expectedMatches = [{ id: 1, inProgress: true }];
    findAllStub.resolves(expectedMatches);

    const matches = await matchesModel.getMatchesByProgress(true);

    expect(matches).to.deep.equal(expectedMatches);
    expect(findAllStub.calledOnce).to.be.true;
    expect(findAllStub.firstCall.args[0]).to.deep.equal({
      where: {
        inProgress: true,
      },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  });
});
