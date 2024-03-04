import { Router } from "express";
import { limiter } from "../middlewares/ratelimit.middleware";
import { Create } from "../useCases/Groups/Controller/group.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { AccountSchema, AccountEdit } from "../schemas/account.schemas";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

export const groupsrouter = Router();

groupsrouter.get("/", Create);