import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './users.routes';
import loginRoleRouter from './loginRole.routes';
import MatchesRouter from './Matches.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/login/role', loginRoleRouter);
router.use('/matches', MatchesRouter);

export default router;
