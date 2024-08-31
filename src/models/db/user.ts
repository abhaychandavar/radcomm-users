import mongoose, { Schema } from "mongoose";

interface IUser {
    _id?: string,
    id?: string,
    name?: string,
    email?: string,
    phone?: string,
    picture?: string,
    password?: string,
    authMode: string,
    meta?: any
}
interface IUserMethods {
    toRawJson: () => IUser
}

const userSchema = new mongoose.Schema<IUser, {}, IUserMethods>({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    picture: {
        type: String
    },
    password: {
        type: String
    },
    authMode: {
        type: String
    },
    meta: {
        type: Schema.Types.Mixed
    }
},
{
    timestamps: true,
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    obj.id = String(obj._id);
    delete obj._id;
    return obj;
}

userSchema.methods.toRawJson = function () {
    const obj = this.toObject();
    obj.id = String(obj._id);
    delete (obj as IUser)._id;
    return obj;
}

const User = mongoose.model('users', userSchema);

export default User;