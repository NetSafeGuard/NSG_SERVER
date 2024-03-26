import { Router } from "express";
import { limiter } from "../middlewares/ratelimit.middleware";
import {Create, Get} from "../useCases/Groups/Controller/group.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { CreateGroupSchema } from "../schemas/group.schema";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

export const groupsrouter = Router();

groupsrouter.post("/", [TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateGroupSchema)], Create);
groupsrouter.get("/", [TokenMiddleware, PermissionMiddleware(["USER", "ADMIN"])], Get);