import type { Request, Response } from 'express';
import { deleteToken, getToken } from '../Repository/token.repository';
import { recoverUser } from '../../Accounts/Repository/account.repository';

export const validateToken = async (req: Request, res: Response) => {
    const { token } = req.params;

    if (!token)
        return res.status(400).json({
            status: 400,
            message: 'Token não encontrada',
        });

    const data = await getToken(token);

    if (!data)
        return res.status(404).json({
            status: 404,
            message: 'Token não encontrada',
        });

    const newpass = await recoverUser(data.email);

    const renderdata = {
        temporaryPassword: newpass
    }

    res.render('recovery', renderdata);

    await deleteToken(data.email);
}