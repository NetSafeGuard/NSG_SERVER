import { Request, Response } from 'express';
import { createGroup, getGroups } from '../Repository/group.repository';
import {wss} from "@/index";

export const Create = (req: Request, res: Response) => {
    createGroup(req.body.name).then(() => {
        res.status(200).json({status: 200, message: "Grupo criado com sucesso"});
            getGroups().then((groups) => {
                wss.io.emit("groups", groups)
            })
    }
    ).catch((err) => {
        if (err.code === "P2002") return res.status(400).json({status: 400, message: "Já existe esse grupo!"});
        res.status(500).json({status: 500, message: "Erro interno do servidor"});
    });
}; 

export const Get = (req: Request, res: Response) => {
    getGroups().then((groups) => {
        res.status(200).json({status: 200, groups});
    }).catch(() => {
        res.status(500).json({status: 500, message: "Erro interno do servidor"});
    });
}