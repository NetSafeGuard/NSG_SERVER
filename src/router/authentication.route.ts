import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as authenticationController from "../controllers/authentication.controller";
import { Validate } from "../middleware/validate.middleware";
import { LoginSchema } from "../schemas/authentication.schema";

export const authrouter = Router();

authrouter.post('/login', [limiter, Validate(LoginSchema)], authenticationController.Login);