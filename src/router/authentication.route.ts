import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";

export const router = Router();

router.post('/login', limiter);