import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import appConfig from './config/appConfig';
import appRouter from './router';
import MongoHelpers from './utils/mongoHelper/mongoHelper';
const app = express();

const init = async () => {
    app.use(express.json());
    const mongoHelper = new MongoHelpers({
        mongooseConfig: {
            uri: appConfig.mongo.uri
        }
    });
    await mongoHelper.init();
    app.use(appRouter);

    app.listen(appConfig.port, () => {
        console.log(`Users service listening on ${appConfig.port}`);
    })
}

init();