import { hydrateHttpError } from "../utils/httpError/httpError";
import User from "../models/db/user";
import { hydrateError } from "../utils/appError/appError";
import Waitlist from "../models/db/waitlist";

class userService {
    private static ERROR_CODE = 'radapp/app/auth';

    static createUser = async (
        { 
            name, 
            email,
            hashedPassword,
            phone, 
            picture, 
            authMode,
            meta 
        }: 
        { 
            name?: string, 
            email?: string, 
            phone?: string, 
            picture?: string, 
            hashedPassword?: string,
            authMode?: 'google' | 'emailPass', 
            meta?: Record<string, any> 
        }) => {
        if (!email && !phone) throw hydrateError({
            key: 'ERR_INTERNAL',
            code: `${this.ERROR_CODE}/required/identifier`,
            message: 'At-least one of the fields email or phone is required'
        });

        if (email && !hashedPassword && authMode === 'emailPass') throw hydrateError({
            key: 'ERR_BAD_REQUEST',
            code: `${this.ERROR_CODE}/required/password`,
            message: 'Hashed password is required'
        })

        const user = await User.create({
            name,
            email,
            phone,
            picture,
            authMode,
            password: hashedPassword,
            meta
        });

        return user.toJSON();
    }

    static getUser = async ({ email, phone, getRaw, userId }: { email?: string, phone?: string, userId?: string, getRaw?: boolean }) => {
        if (!email && !phone && !userId) throw hydrateError({
            key: 'ERR_INTERNAL',
            code: `${this.ERROR_CODE}/required/identifier`,
            message: 'At-least one of the fields user ID, email or phone is required'
        });
        const user = await User.findOne({ $or: [{ email }, { phone }, { _id: userId }] });
        if (!user) return null;
        if (getRaw) return user.toRawJson();
        return user.toJSON();
    }

    private static validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    static addUserToWaitlist = async ({ email, phone }: { email: string, phone?: string }) => {
        try {
            if (!email) {
                throw hydrateHttpError({
                    key: 'ERR_BAD_REQUEST',
                    code: `${this.ERROR_CODE}/required/email`,
                    message: 'Email is required'
                });
            }
            if (!this.validateEmail(email)) {
                throw hydrateHttpError({
                    key: 'ERR_BAD_REQUEST',
                    code: `${this.ERROR_CODE}/invalid/email`,
                    message: 'Invalid email'
                })
            }
            const waitlist = await Waitlist.create({
                email,
                phone
            });
            return waitlist.toJSON();
        }
        catch (error) {
            console.error('Could not add user to waitlist', error.errorResponse.code);
            if (error.errorResponse.code === 11000) {
                throw hydrateHttpError({
                    key: 'ERR_BAD_REQUEST',
                    code: `${this.ERROR_CODE}/already-in-waitlist`,
                    message: 'You\'ve already joined waitlist'
                });
            }
            throw error;
        }
    }
}

export default userService;