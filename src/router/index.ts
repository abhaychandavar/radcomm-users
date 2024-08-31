import { Router } from 'express';
import userRouter from './internal/userRouter';
import userInternalRouter from './internal/userRouter';

const appRouter = Router();

appRouter.get('/test', (_, res) => {
    res.send('Hello from Users service!');
});
appRouter.use('/internal', userInternalRouter);
appRouter.use('/', userRouter);

export default appRouter;