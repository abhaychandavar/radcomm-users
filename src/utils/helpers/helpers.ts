import { AppError, hydrateError } from "../appError/appError";

class helpers {
    static handleError = async ({error, code, message}:{ error: any, code?: string, message?: string }) => {
        console.error(error);
        if (error instanceof AppError) {
            return error;
        }
        return hydrateError({
            key: 'ERR_INTERNAL',
            code: code || 'app/errors/internal',
            message: message || 'Something went wrong'
        })
    }
}

export default helpers;