import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as Controller from "../useCases/Account/Controller/account.controller";
import { ValidateMiddleware } from "../middleware/validate.middleware";
import { LoginSchema } from "../schemas/authentication.schema";
import { TokenMiddleware } from "../middleware/token.middleware";
import { AccountSchema } from "../schemas/accountdata.schema";

export const accountsrouter = Router();

accountsrouter.get('/', [TokenMiddleware], Controller.getAccounts);
accountsrouter.post('/', [limiter, ValidateMiddleware(AccountSchema)], Controller.Create)