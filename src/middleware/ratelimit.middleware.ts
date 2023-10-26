import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: {
        status: 'fail',
        message: 'Too many requests from this IP, please try again in 15 minutes!'
    },
});