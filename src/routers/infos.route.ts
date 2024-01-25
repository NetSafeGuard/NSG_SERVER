import { Router } from "express";
import * as Controller from "../useCases/Infos/Controller";
import { LoginSchema } from "../schemas/account.schemas";
import { TokenMiddleware } from "../middlewares/token.middleware";

export const inforouter = Router();

inforouter.get("/", [TokenMiddleware], Controller.getInfos);