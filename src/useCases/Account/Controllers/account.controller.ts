import { Request, Response } from "express";
import { createUser, getAccount, getUserByEmailOrUsername } from "../Repository/account.repository";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
    const account = await getAccount(req.body.user)

    if(!account) return res.status(400).json({
        status: 400,
        message: "Conta não encontrada"
    })

    const isValidPassword = await bycrpt.compare(req.body.password,account.password);
    console.log(isValidPassword)

    if(!isValidPassword) return res.status(400).json({
        status: 400,
        message: "Palavra-passe inválida"
    })

    const finaluser = {
        ...account,
        password: undefined,
        id: undefined
    }

    const token = jwt.sign({ ...finaluser }, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });

    res.status(200).json({
        status: 200,
        message: "Login Success",
        data: {
            user: {
                ...finaluser
            },
            token
        }
    })
   
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
    const account = await getUserByEmailOrUsername(req.body.email, req.body.username);

    if(account) return res.status(400).json({
        status: 400,
        message: "Conta já existente!"
    });

    const newUser = await createUser(req.body.email, req.body.username, req.body.password);

    const finaluser = {
        ...newUser,
        password: undefined,
        id: undefined
    }

    const token = jwt.sign({ ...finaluser }, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });

    res.status(200).json({
        status: 200,
        message: "Create Success",
        data: {
            user: {
                ...finaluser
            },
            token
        }
    })
}