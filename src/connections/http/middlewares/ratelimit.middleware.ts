import { rateLimit } from 'express-rate-limit';

export const limiter = (ratelimit: number, time: number) => rateLimit({
    windowMs: time,
    max: ratelimit,
    message: {
        status: 429,
        message: "Muitas requisições, tente novamente em " + formatNumberToTime(time),
    },
    headers: true,
});

function formatNumberToTime(number: number) {
    number = number / 1000;

    const minutes = Math.floor(number % 60);
    const hours = Math.floor(number / 60);
    
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
  
    return `${formattedHours}:${formattedMinutes}`;
  }
  