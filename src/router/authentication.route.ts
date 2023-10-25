import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";
import * as authenticationController from "../controllers/authentication.controller";

export const router = Router();

router.post('/login', limiter, authenticationController.Login);