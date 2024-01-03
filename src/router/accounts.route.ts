import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as Controller from "../useCases/Account/Controller/account.controller";
import { ValidateMiddleware } from "../middleware/validate.middleware";
import { LoginSchema } from "../schemas/account.schemas";
import { TokenMiddleware } from "../middleware/token.middleware";
import { AccountSchema, AccountEdit } from "../schemas/account.schemas";

export const accountsrouter = Router();

accountsrouter.get('/', [TokenMiddleware], Controller.getAccounts);
accountsrouter.post('/', [limiter, ValidateMiddleware(AccountSchema)], Controller.Create)
accountsrouter.put('/', [TokenMiddleware, ValidateMiddleware(AccountEdit)], Controller.Update)