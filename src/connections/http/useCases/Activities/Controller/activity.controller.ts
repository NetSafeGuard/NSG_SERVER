import { Request, Response } from 'express';

export const Create = async (req: Request, res: Response) => {
    console.log(req.body)
}