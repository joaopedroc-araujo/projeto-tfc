import * as sinon from 'sinon';
import { SinonStub } from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesService from '../services/Matches.service';
import MatchesModel from '../models/MatchesModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('MatchesService', () => {
    let matchesService: MatchesService;
    let matchesModel: MatchesModel;
    let getAllMatchesStub: SinonStub;
    let getMatchesByProgressStub: SinonStub;
  
    beforeEach(() => {
      matchesModel = new MatchesModel();
      matchesService = new MatchesService(matchesModel);
      getAllMatchesStub = sinon.stub(matchesModel, 'getAllMatches');
      getMatchesByProgressStub = sinon.stub(matchesModel, 'getMatchesByProgress');
    });
  
    afterEach(() => {
      getAllMatchesStub.restore();
      getMatchesByProgressStub.restore();
    });
  
    it('retorna todas as partidas', async () => {
      const expectedMatches = [{ id: 1 }, { id: 2 }];
      getAllMatchesStub.resolves(expectedMatches);
  
      const matches = await matchesService.getAllMatches();
  
      expect(matches).to.deep.equal(expectedMatches);
      expect(getAllMatchesStub.calledOnce).to.be.true;
    });
  
    it('filtra as partidas por progresso', async () => {
      const expectedMatches = [{ id: 1, inProgress: true }];
      getMatchesByProgressStub.resolves(expectedMatches);
  
      const matches = await matchesService.getMatchesByProgress(true);
  
      expect(matches).to.deep.equal(expectedMatches);
      expect(getMatchesByProgressStub.calledOnceWith(true)).to.be.true;
    });
  });