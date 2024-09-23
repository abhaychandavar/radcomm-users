import mongoose from "mongoose";

interface IWaitlist {
    _id?: string,
    id?: string,
    email?: string,
    phone?: string
}
interface IWaitlistMethods {
    toRawJson: () => IWaitlist
}

const waitlistSchema = new mongoose.Schema<IWaitlist, {}, IWaitlistMethods>({
    email: {
        type: String,
        unique: true,
        sparse: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        required: false
    }
},
{
    timestamps: true,
});

waitlistSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    obj.id = String(obj._id);
    delete obj._id;
    return obj;
}

waitlistSchema.methods.toRawJson = function () {
    const obj = this.toObject();
    obj.id = String(obj._id);
    delete (obj as IWaitlist)._id;
    return obj;
}

const Waitlist = mongoose.model('waitlists', waitlistSchema);

export default Waitlist;