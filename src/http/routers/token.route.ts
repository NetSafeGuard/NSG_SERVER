import { Router } from "express";
import * as Controller from "../useCases/Tokens/Controller/token.controller";

export const tokenrouter = Router();

tokenrouter.get("/validate/:token", Controller.validateToken);
