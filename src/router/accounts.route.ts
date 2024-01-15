import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as Controller from "../useCases/Account/Controller/account.controller";
import { ValidateMiddleware } from "../middleware/validate.middleware";
import { TokenMiddleware } from "../middleware/token.middleware";
import { AccountSchema, AccountEdit } from "../schemas/account.schemas";
import { PermissionMiddleware } from "../middleware/permission.middleware";

export const accountsrouter = Router();

accountsrouter.get('/', [TokenMiddleware, PermissionMiddleware("ADMIN")], Controller.getAccounts);
accountsrouter.post('/', [limiter, TokenMiddleware, ValidateMiddleware(AccountSchema), PermissionMiddleware("ADMIN")], Controller.Create)
accountsrouter.put('/', [TokenMiddleware, ValidateMiddleware(AccountEdit), PermissionMiddleware("ADMIN")], Controller.Update)
accountsrouter.delete('/', [TokenMiddleware, PermissionMiddleware("ADMIN")], Controller.Delete)