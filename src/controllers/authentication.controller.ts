import { Request, Response } from "express";
import { validateAccount, createUser } from "../repositorys/user.repository";

export const Login = async (req: Request, res: Response) => {
    const user = await validateAccount(req.body.user, req.body.password)

    if(user) {
        res.status(200).json({
            status: 200,
            message: "Login Success",
            data: user
        })
    } 
    else {
        res.status(400).json({
            status: 400,
            message: "Login Error"
        })
    }
}

export const Verify = (req: Request, res: Response) => {
    res.status(200).json({
        status: 200,
        message: "Verify Success",
        data: {
            user: {
                email: req.body.user.email,
            }
        },
    })
}

export const Create = async (req: Request, res: Response) => {
    const user = await createUser(req.body.user.email, req.body.user.username, req.body.user.password)

    if(user) {
        res.status(200).json({
            status: 200,
            message: "Create Success",
            data: user
        })
    } 
    else {
        res.status(400).json({
            status: 400,
            message: "Create Error"
        })
    }
}