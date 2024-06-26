import type { Request, Response } from 'express';
import * as Repo from '../Repository/activity.repository';
import {wss} from "@/index";

export const Create = async (req: Request, res: Response) => {
    const activity = {
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        redirectUrl: req.body.redirectUrl || "",
        groups: req.body.groups,
    }

    Repo.createActivity(activity, req.body.user).then(() => {
        Repo.getActivities().then((activities) => {
            wss.io.emit("activities", activities)
        })

        res.status(200).json({status: 200, message: "Atividade criada com sucesso"});
    }).catch((err) => {
        res.status(500).json({status: 500, message: "Erro interno do servidor [Code: 1]"});
    });
}

export const Delete = async (req: Request, res: Response) => {
    Repo.DeleteActivity(req.body.id).then(() => {
        res.status(200).json({status: 200, message: "Atividade apagada com sucesso"});
        Repo.getActivities().then((activities) => {
            wss.io.emit("activities", activities)
        })
    }).catch((err) => {
        res.status(500).json({status: 500, message: "Erro interno do servidor [Code: 2]"});
    });
}


export const AddDomain = async (req: Request, res: Response) => {
    const data = await Repo.getActivity(req.body.activity_id);

    if (!data) {
        res.status(404).json({status: 404, message: "Atividade não encontrada"});
        return;
    }

    if(data.activityDomains.find((data) => data.domain.name === req.body.name)){
        res.status(400).json({status: 400, message: "Domínio já adicionado"});
        return;
    }

    Repo.AddDomainToActivity({activity_id: req.body.activity_id,name: req.body.name}).then(() => {
        res.status(200).json({status: 200, message: "Domínio adicionado com sucesso"});
        Repo.getActivities().then((activities) => {
            wss.io.emit("activities", activities)
        })
    }).catch((err) => {
        res.status(500).json({status: 500, message: "Erro interno do servidor [Code: 3]"});
    });
}

export const EditDomain = async (req: Request, res: Response) => {

    Repo.EditDomainFromActivity(req.body.domain_id, req.body.name).then(() => {
        res.status(200).json({status: 200, message: "Domínio editado com sucesso"});
        Repo.getActivities().then((activities) => {
            wss.io.emit("activities", activities)
        })
    }).catch((err) => {
        res.status(500).json({status: 500, message: "Erro interno do servidor [Code: 4]"});
    });
};

export const DeleteDomain = async (req: Request, res: Response) => {
    Repo.DeleteDomainFromActivity(req.body.domain_id).then(() => {
        res.status(200).json({status: 200, message: "Domínio apagado com sucesso"});
        Repo.getActivities().then((activities) => {
            wss.io.emit("activities", activities)
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({status: 500, message: "Erro interno do servidor [Code: 5]"});
    });
}