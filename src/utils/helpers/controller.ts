import { Request, Response, NextFunction } from "express"
import httpResponseHandler from "../httpError/httpError";

class controllerHelper {
    static http = async ({req, res, next, handler, onError, successMessage, dataExtractor}: {req: Request, res: Response, next: NextFunction, handler: (data?: Record<string, any>) => Record<string, any> | Promise<Record<string, any>>, onError?: (error: any) => void | Promise<void>, successMessage?: string, dataExtractor?: (req: Request, res: Response, next: NextFunction) => Record<string, any>}) => {
        try {
            const data = dataExtractor ? await handler(dataExtractor(req, res, next)) : await handler();
            return httpResponseHandler.sendSuccessResponse({ data, res, message: successMessage });
        }
        catch (error) {
            console.error(error);
            if (onError) {
                await onError(error);
            }
            return await httpResponseHandler.sendErrorResponse({ error, res });
        }
    }
}

export default controllerHelper;