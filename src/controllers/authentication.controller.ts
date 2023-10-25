import { Request, Response } from "express";
import { validateAccount } from "../repositorys/user.repository";

export const Login = (req: Request, res: Response) => {
    const user = validateAccount(req.body.email, req.body.password).then((user) => {
        res.status(200).json({
            status: 200,
            message: "Login Success",
            data: user
        })
    }).catch((err) => {
        res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    })
}