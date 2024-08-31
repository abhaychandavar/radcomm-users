import errors, { errorsEnum } from './errors';
export class AppError extends Error {
    code: string;
    constructor ({ message, code }: { message: string, code: string }) {
        super(message);
        this.code = code;
    }
}

export const hydrateError = ({ key, message, code }: { key: errorsEnum, message?: string, code?: string }) => {
    const error = errors[key];
    if (message) {
        error.message = message;
    }
    if (code) {
        error.code = code;
    }
    return new AppError(error);
}