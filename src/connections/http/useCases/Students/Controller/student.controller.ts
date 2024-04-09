import { Request, Response } from 'express';
import { CreateStudent } from '../Repository/student.repository';
import { getGroups } from '../../Groups/Repository/group.repository';
import { wss } from '@/index';

export const Create = async (req: Request, res: Response) => {
    CreateStudent(req.body.groupname, req.body.name, req.body.email, req.body.routerip, req.body.studentid).then(() => {
        res.status(200).json({status: 200});
        getGroups().then((groups) => {
            wss.io.emit("groups", groups)
        })
    }).catch((e) => {
        res.status(500).json({status: 500, message: "Erro interno do servidor"});
    });

}