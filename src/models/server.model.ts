import express from "express";
import { authrouter } from "../router/authentication.route";
import { accountsrouter } from "../router/accounts.route";
import { inforouter } from "../router/infos.route";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { LogsMiddleware } from "../middleware/logs.middleware";
import cors from "cors";

export class ExpressServer {
    public app: express.Application;

    constructor() {
        this.app = express();
    }

    start() {
        const corsOptions = {
            origin: process.env.CLIENT_URL,
            optionsSuccessStatus: 200
        }

        this.app.use(cors(corsOptions))
        
        if(process.env.DEV) {
            this.app.use(LogsMiddleware);
        }

        this.app.use(bodyParser.json());
        this.app.use("/api/v1/auth", authrouter);
        this.app.use("/api/v1/account", accountsrouter);
        this.app.use("/api/v1/info", inforouter);

        this.app.all("/*", this.notfound)
        
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

    notfound(req: Request, res: Response) {
        res.status(404).json({
            status: 404,
            message: {
                method: req.method,
                path: req.path,
                txt: "Not Found"
            }
        })
    }
}