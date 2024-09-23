import type { Response } from "express";
import { AppError, hydrateError } from "../appError/appError";
import httpErrors, { type httpErrorsEnum } from "./httpErrors";

const ERROR_CODE = 'app/errors/http';
class HttpResponseHandler {
    sendErrorResponse = async ({ error, res }: { error: any, res: Response }) => {
        let appError: HttpError;
        if (error instanceof HttpError) {
            appError = error;
        }
        else if (error instanceof AppError) {
            appError = new HttpError({ statusCode: 500, error });
        }
        else if (error instanceof HttpError) {
            appError = error;
        }
        else if (error instanceof Error) {
            appError = new HttpError({ 
                error: hydrateError({
                    key: 'ERR_INTERNAL',
                    message: error.message ? error.message : 'Something went wrong',
                }), 
                statusCode: 500 
            });
        }
        else {
            appError = hydrateHttpError({
                key: 'ERR_HTTP_SERVER',
            });
        }
        return res.status(appError.statusCode).send({
            code: appError.code,
            message: appError.message
        });
    }

    sendSuccessResponse = async ({ statusCode = 200, data = {}, message = 'Request successfully handled', res }: { statusCode?: number, data?: any, message?: string, res: Response }) => {
        return res.status(statusCode).send({
            code: 'radapp/http/success',
            message,
            data
        })
    }
}

const httpResponseHandler = new HttpResponseHandler();
export default httpResponseHandler;

export class HttpError extends Error {
    statusCode = 500;
    code: string = `${ERROR_CODE}/internal`;
    constructor ({ statusCode, error }: { statusCode: number, error: AppError | { message: string, code: string } }) {
        super();
        this.statusCode = statusCode;
        this.message = error.message;
        this.code = error.code;
    }
}

export const hydrateHttpError = ({ key, message, code }: { key: httpErrorsEnum, message?: string, code?: string }) => {
    const error = httpErrors[key];
    error.message = message || error.message;
    error.code = code || error.code;
    return new HttpError({ statusCode: 500, error });
}