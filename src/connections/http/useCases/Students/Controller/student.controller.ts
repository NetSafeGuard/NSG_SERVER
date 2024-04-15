import { Request, Response } from 'express';
import { CreateStudent,EditStudent } from '../Repository/student.repository';
import { getGroups } from '../../Groups/Repository/group.repository';
import { wss } from '@/index';

export const Create = async (req: Request, res: Response) => {
    CreateStudent(req.body.groupname, req.body.name, req.body.email, req.body.routerip, req.body.studentid).then(() => {
        res.status(200).json({status: 200});
        getGroups().then((groups) => {
            wss.io.emit("groups", groups)
        })
    }).catch((e) => {
        console.log(e.code)
        if(e.code == "P2002") return res.status(400).json({status: 400, message: "Esse estudante já está inserido!"});

        res.status(500).json({status: 500, message: "Erro interno do servidor"});
    });

}

export const Update = async (req: Request, res: Response) => {
    EditStudent(req.body.editedInputs, req.body.email).then(() => {
        res.status(200).json({status: 200});
        getGroups().then((groups) => {
            wss.io.emit("groups", groups)
        })
    }).catch((e) => {
        if(e.code == "P2002") return res.status(400).json({status: 400, message: "Esse estudante já está inserido!"});

        res.status(500).json({status: 500, message: "Erro interno do servidor"});
    });
}