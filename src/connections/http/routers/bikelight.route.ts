import {Router} from "express";
import {BikeLightWebhook} from "@http/schemas/bikelight.schemas";
import {ValidateMiddleware} from "@http/middlewares/validate.middleware";
import { limiter } from "../middlewares/ratelimit.middleware";

export const bikelightroute = Router();

bikelightroute.post('/',  [ValidateMiddleware(BikeLightWebhook)], (req, res) => {
    const embed= {
        "username": "BikeLight - Logs",
        "avatar_url": "https://i.imgur.com/4M34hi2.png",
        "content": "Nova avalição no site!",
        "embeds": [
            {

                "color": 15258703,
                "fields": [
                    {
                        "name": "Nome:",
                        "value": `${req.body.name}`,
                        "inline": false
                    },
                    {
                        "name": "Estrelas:",
                        "value": `${req.body.stars}`,
                        "inline": false
                    },
                    {
                        "name": "Texto:",
                        "value": `${req.body.text}`,
                        "inline": false
                    },
                ],
            }
        ]
    };

    fetch(process.env.BIKELIGHT_WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(embed)
    }).then(() => res.status(200).send('OK'));
});