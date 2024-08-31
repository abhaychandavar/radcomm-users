import mongoose from 'mongoose';

export type mongooseConfigType = {
    uri: string,
    options?: mongoose.ConnectOptions
}
class MongoHelpers {
    private mongooseConfig: mongooseConfigType;
    constructor ({ mongooseConfig }: { mongooseConfig: mongooseConfigType}) {
        this.mongooseConfig = mongooseConfig;
    }
    init = async () => {
        try {
            await mongoose.connect(this.mongooseConfig.uri, this.mongooseConfig.options);
            console.log('Connected to Mongodb');
            return true;
        }
        catch (error) {
            console.error('Mongoose connection error', error);
            throw error;
        }
    }
}

export default MongoHelpers;