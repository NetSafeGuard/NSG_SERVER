import express from 'express';
import { router } from '../router/user.route';
import { Request, Response } from 'express';

export class ExpressServer {
    private app: express.Application;

    constructor() {
        this.app = express();
    }

    start() {
        this.app.use('/api/v1/user', router);

        this.app.all("/*", this.notfound)
        
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

    notfound(req: Request, res: Response) {
        res.status(404).json({
            status: 404,
            message: `Route [${req.method}] ${req.url} Not Found!]`
        })
    }
}