import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        status: 'fail',
        message: 'Muitas requisições, tente novamente em 5 minutos!'
    },
});