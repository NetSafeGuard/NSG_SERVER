import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

export const PermissionMiddleware = (permission: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.user)
      return res.status(400).json({
        message:
          "[Permissão Negada] Parece que a sua conta não tem permissão para isso :(",
      });

    if (req.body.user.role !== permission) {
      return res.status(405).json({
        message:
          "[Permissão Negada] Parece que a sua conta não tem permissão para isso :(",
      });
    }

    next();
  };
};
