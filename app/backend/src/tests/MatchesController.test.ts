// import * as sinon from 'sinon';
// import { SinonStub } from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');
// import { app } from '../app';
// import MatchesService from '../services/Matches.service';
// import MatchesController from '../controllers/Matches.controller';

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('MatchesController', () => {
//     let matchesController: MatchesController;
//     let matchesService: MatchesService;
//     let getAllMatchesStub: SinonStub;
//     let getMatchesByProgressStub: SinonStub;
//     let req: Partial<Request>;
//     let res: Partial<Response>;
  
//     beforeEach(() => {
//       matchesService = new MatchesService();
//       matchesController = new MatchesController(matchesService);
//       getAllMatchesStub = sinon.stub(matchesService, 'getAllMatches');
//       getMatchesByProgressStub = sinon.stub(matchesService, 'getMatchesByProgress');
//       req = {};
//       res = {
//         status: sinon.stub().returnsThis(),
//         json: sinon.stub().returnsThis(),
//       };
//     });
  
//     afterEach(() => {
//       getAllMatchesStub.restore();
//       getMatchesByProgressStub.restore();
//     });
  
//     it('retorna todas as partidas', async () => {
//       const expectedMatches = [{ id: 1 }, { id: 2 }];
//       getAllMatchesStub.resolves(expectedMatches);
  
//       await matchesController.getAllMatches(req as Request, res as Response);
  
//       sinon.assert.calledOnce(getAllMatchesStub);
//       sinon.assert.calledWith(res.status as SinonStub, 200);
//       sinon.assert.calledWith(res.json as SinonStub, expectedMatches);
//     });
  
//     it('filtra partidas por progresso', async () => {
//       const expectedMatches = [{ id: 1, inProgress: true }];
//       getMatchesByProgressStub.resolves(expectedMatches);
//       req.query = { inProgress: 'true' };
  
//       await matchesController.getMatchesByProgress(req as Request, res as Response);
  
//       sinon.assert.calledOnce(getMatchesByProgressStub);
//       sinon.assert.calledWith(getMatchesByProgressStub, true);
//       sinon.assert.calledWith(res.status as sinon.SinonStub, 200);
//       sinon.assert.calledWith(res.json as sinon.SinonStub, expectedMatches);
//     });
//   });