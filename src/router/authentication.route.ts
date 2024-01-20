import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as authenticationController from "../useCases/Accounts/Controller/account.controller";
import { ValidateMiddleware } from "../middleware/validate.middleware";
import { LoginSchema, AccountActive } from "../schemas/account.schemas";
import { TokenMiddleware } from "../middleware/token.middleware";

export const authrouter = Router();

authrouter.post('/login', [limiter, ValidateMiddleware(LoginSchema)], authenticationController.Login);
authrouter.post('/verify', [TokenMiddleware], authenticationController.Verify);
authrouter.post('/active', [TokenMiddleware, ValidateMiddleware(AccountActive)], authenticationController.Active);