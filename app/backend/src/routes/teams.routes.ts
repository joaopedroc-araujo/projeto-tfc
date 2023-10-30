import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamController = new TeamsController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.getTeams(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => teamController.getTeamById(req, res),
);

export default router;
