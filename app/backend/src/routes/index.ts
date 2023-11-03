import { Router } from 'express';
import teamsRouter from './teams.routes';
import userRouter from './users.routes';
import loginRoleRouter from './loginRole.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/login/role', loginRoleRouter);

export default router;
