import { Request, Response } from "express";
import { getUsers } from "../../Account/Repository/account.repository";

export const getInfos = async (req: Request, res: Response) => {
  const users = await getUsers();

  res.status(200).json({
    status: 200,
    data: {
      users,
    },
  });
};
