import type { Request, Response } from 'express';
import { createGroup, getGroups, deleteGroups } from '../Repository/group.repository';
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

export const Update = async (req: Request, res: Response) => {
  
    // update function
};

export const Delete = (req: Request, res: Response) => {
    deleteGroups(req.body.name).then(() => {
        res.status(200).json({status: 200});
        getGroups().then((groups) => {
            wss.io.emit("groups", groups)
        })
    }).catch((e) => {
        res.status(500).json({status: 500, message: "Erro interno do servidor"});
    });
}