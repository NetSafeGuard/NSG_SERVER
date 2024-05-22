import { Router } from "express";
import { limiter } from "../middlewares/ratelimit.middleware";
import * as authenticationController from "../useCases/Accounts/Controller/account.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import {
  LoginSchema,
  AccountActive,
  AccountRecover,
} from "../schemas/account.schema";
import { TokenMiddleware } from "../middlewares/token.middleware";

export const authrouter = Router();

authrouter.post(
  "/login",
  [limiter(7, 60000), ValidateMiddleware(LoginSchema)],
  authenticationController.Login
);
authrouter.post("/verify", [TokenMiddleware], authenticationController.Verify);
authrouter.post(
  "/active",
  [TokenMiddleware, ValidateMiddleware(AccountActive)],
  authenticationController.Active
);

authrouter.post(
  "/recover",
  [limiter(1, 30000), ValidateMiddleware(AccountRecover)],
  authenticationController.Recover
);