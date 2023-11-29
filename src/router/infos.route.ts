import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as Controller from "../useCases/Infos/Controller";
import { ValidateMiddleware } from "../middleware/validate.middleware";
import { LoginSchema } from "../schemas/authentication.schema";
import { TokenMiddleware } from "../middleware/token.middleware";

export const inforouter = Router();

inforouter.get('/', [TokenMiddleware], Controller.getInfos);