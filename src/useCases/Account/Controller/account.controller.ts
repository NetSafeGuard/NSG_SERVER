import { Request, Response } from "express";
import { createUser, getAccount, getUserByEmailOrUsername, getUsers, updateUser } from "../Repository/account.repository";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
    const account = await getAccount(req.body.username)
    
    if(!account) return res.status(400).json({
        status: 400,
        message: "Conta não encontrada"
    })

    const isValidPassword = await bycrpt.compare(req.body.password,account.password);

    if(!isValidPassword) return res.status(400).json({
        status: 400,
        message: "Palavra-passe inválida"
    })

    const token = jwt.sign({ email: account.email }, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });

    res.status(200).json({
        status: 200,
        message: "Login Success",
        data: {
            user: {
                email: account.email
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
                ...req.body.user
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

    const newUser = await createUser(req.body.email, req.body.username, req.body.password ?? 'admin');

    const token = jwt.sign({email: newUser}, process.env.JWT_SECRET ?? 'SCR_2023', { expiresIn: "1d" });

    res.status(200).json({
        status: 200,
        message: "Create Success",
        data: {
            user: {
                email: newUser
            },
            token
        }
    })
}

export const Update = async (req: Request, res: Response) => {
    const account = await getUserByEmailOrUsername(req.body.email, req.body.username);

    if(!account) return res.status(400).json({
        status: 400,
        message: "Conta não existente!"
    });

    const newUser = await updateUser(req.body.email, req.body.username);

    res.status(200).json({
        status: 200,
        message: "Update Success",
        data: {
            user: {
                email: newUser
            }
        }
    })
   
}

export const getAccounts = async (req: Request, res: Response) => {
    const users = await getUsers();

    res.status(200).json({
        status: 200,
        data: {
            users
        }
    })
}