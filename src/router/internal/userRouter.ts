import { Router } from 'express';
import userController from '../../controllers/userController';

const userInternalRouter = Router();

userInternalRouter.post('/', userController.createUser);
userInternalRouter.get('/', userController.getRawUser);

export default userInternalRouter;