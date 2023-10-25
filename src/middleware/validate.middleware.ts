import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export const ValidateMiddleware = (schema: yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error: yup.ValidationError | any) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
};
