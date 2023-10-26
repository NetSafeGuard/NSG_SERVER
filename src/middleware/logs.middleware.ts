import { Request, Response, NextFunction } from 'express';

export const LogsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${req.method}] - ${req.path} from ${req.ip} at ${new Date().toLocaleString()}`);
    next();
}