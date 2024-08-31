import jwt from 'jsonwebtoken';
import { hydrateError } from '../appError/appError';

class jwtProvider {
    private static ERROR_CODE = 'app/token';
    static generateToken = ({ payload, secretKey, expiresIn }: { payload: object, secretKey: string, expiresIn: string}) => {
        const token = jwt.sign(payload, secretKey, { expiresIn });
        return token;
    }
    static verifyToken = ({ token, secretKey }: { token: string, secretKey: string}) => {
        try {
            const payload = jwt.verify(token, secretKey);
            return typeof payload === 'string' ? JSON.parse(payload) : payload;
        }
        catch (error) {
            throw hydrateError({
                key: 'ERR_INTERNAL',
                code: `${this.ERROR_CODE}/invalid`,
                message: 'Invalid token'
            })
        }
    }
}

export default jwtProvider;