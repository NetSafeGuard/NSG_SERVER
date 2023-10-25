import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const TokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if(!token) return res.json(400).json({
            status: 400,
            message: "Missing Token"
        })

        jwt.verify(token, process.env.JWT_SECRET || "SCR_2023", (err, user) => {
            if (err) return res.status(403).json({
                status: 403,
                message: "Invalid Token"
            })

            req.body.user = user;
            next();
        })
    } else {
        res.status(401).json({
            status: 401,
            message: "Missing Token"
        })
    }
}