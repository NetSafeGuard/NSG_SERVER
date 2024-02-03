import {Router} from "express";
import {BikeLightWebhook} from "@http/schemas/bikelight.schemas";
import {ValidateMiddleware} from "@http/middlewares/validate.middleware";

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
                        "name": "Estrelas:",
                        "value": "5",
                        "inline": false
                    },
                    {
                        "name": "Texto:",
                        "value": "Gostei muito do site, muito bom!",
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