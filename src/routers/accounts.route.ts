import { Router } from "express";
import { limiter } from "../middlewares/ratelimit.middleware";
import * as Controller from "../useCases/Accounts/Controller/account.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { AccountSchema, AccountEdit } from "../schemas/account.schemas";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

export const accountsrouter = Router();
accountsrouter.post(
  "/",
  [
    limiter,
    TokenMiddleware,
    ValidateMiddleware(AccountSchema),
    PermissionMiddleware("ADMIN"),
  ],
  Controller.Create
);
accountsrouter.put(
  "/",
  [
    TokenMiddleware,
    ValidateMiddleware(AccountEdit),
    PermissionMiddleware("ADMIN"),
  ],
  Controller.Update
);
accountsrouter.delete(
  "/",
  [TokenMiddleware, PermissionMiddleware("ADMIN")],
  Controller.Delete
);
