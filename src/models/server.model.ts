import express from 'express';
import { authrouter } from '../router/authentication.route';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';

export class ExpressServer {
    private app: express.Application;

    constructor() {
        this.app = express();
    }

    start() {
        this.app.use(bodyParser.json());
        this.app.use('/api/v1/auth', authrouter);

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