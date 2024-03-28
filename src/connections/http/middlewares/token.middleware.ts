import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getAccount } from "../useCases/Accounts/Repository/account.repository";

export const TokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(400).json({
        status: 400,
        message: "Missing Token",
      });

    jwt.verify(
      token,
      process.env.JWT_SECRET || "SCR_2023",
      async (err, user) => {
        if (err)
          return res.status(403).json({
            status: 403,
            message: "Invalid Token",
          });

        const newuser = await getAccount((user as any).email);

        if (!newuser)
          return res.status(403).json({
            status: 403,
            message: "Account token was not found",
          });

        req.body.user = {
          email: newuser.email,
          role: newuser.role,
          avatar: newuser.avatar,
          username: newuser.username,
          activated: newuser.activated,
        };
        next();
      }
    );
  } else {
    res.status(401).json({
      status: 401,
      message: "Token expired/not found",
    });
  }
};
