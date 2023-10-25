import { Router } from "express";
import { limiter } from "../middleware/ratelimit.middleware";

export const router = Router();

router.get('/', limiter, (req, res) => {
    res.send('User check');
});