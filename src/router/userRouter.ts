import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/waitlist', userController.addUserToWaitlist);

export default userRouter;