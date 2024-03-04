import { Request, Response } from 'express';
import { createGroup } from '../Repository/group.repository';

export const Create = (req: Request, res: Response) => {
    createGroup(req.body.name).then(() => {
        res.status(200).send("Grupo criado com sucesso");
    }
    ).catch((err) => {
        res.status(400).send("Erro ao criar grupo");
    });
}; 
    