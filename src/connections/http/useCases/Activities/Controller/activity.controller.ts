import { Request, Response } from 'express';
import * as Repo from '../Repository/activity.repository';

export const Create = async (req: Request, res: Response) => {
    const activity = {
        title: req.body.title,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        redirectUrl: req.body.redirectUrl || "",
        groups: req.body.groups,
    }

    Repo.createActivity(activity, req.body.user)
}