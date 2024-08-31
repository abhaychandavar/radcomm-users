import type { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import controllerHelper from "../utils/helpers/controller";
class userController {
    static createUser = async (req: Request, res: Response, next: NextFunction) => await controllerHelper.http({
        req,
        res,
        next,
        handler: async (data) => await userService.createUser({
            email: data!.email,
            hashedPassword: data!.hashedPassword,
            phone: data?.phone,
            picture: data?.picture,
            meta: data?.meta,
            authMode: data?.authMode || 'emailPass'
        }),
        successMessage: 'User created successfully',
        dataExtractor: req => req.body,
    });

    static getUser = async (req: Request, res: Response, next: NextFunction) => await controllerHelper.http({
        req,
        res,
        next,
        handler: async (data) => await userService.createUser({
            email: data!.email,
            hashedPassword: data!.password
        }),
        successMessage: 'User fetched successfully',
        dataExtractor: req => {
            const { email, phone } = req.query
            return ({
                email,
                phone
            })
        },
    });

    static getRawUser = async (req: Request, res: Response, next: NextFunction) => await controllerHelper.http({
        req,
        res,
        next,
        handler: async (data) => await userService.getUser({
            email: data!.email,
            phone: data!.phone,
            userId: data!.userId,
            getRaw: true
        }),
        successMessage: 'Raw user fetched successfully',
        dataExtractor: req => {
            const { email, phone, userId } = req.query
            return ({
                email,
                phone,
                userId
            })
        },
    });
}

export default userController;