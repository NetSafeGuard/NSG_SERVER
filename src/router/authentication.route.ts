import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as authenticationController from "../useCases/Account/Controller/account.controller";
import { ValidateMiddleware } from "../middleware/validate.middleware";
import { LoginSchema } from "../schemas/account.schemas";
import { TokenMiddleware } from "../middleware/token.middleware";

export const authrouter = Router();

authrouter.post('/login', [limiter, ValidateMiddleware(LoginSchema)], authenticationController.Login);
authrouter.post('/verify', [TokenMiddleware], authenticationController.Verify);