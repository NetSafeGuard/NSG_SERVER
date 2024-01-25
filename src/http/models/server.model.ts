import express, { Request, Response } from "express";
import { authrouter } from "../routers/authentication.route";
import { accountsrouter } from "../routers/accounts.route";
import { inforouter } from "../routers/infos.route";
import { LogsMiddleware } from "../middlewares/logs.middleware";
import cors from "cors";
import { examsrouter } from "../routers/exams.route";

export class ExpressServer {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  start() {
    const corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };

    this.app.use(cors(corsOptions));

    if (process.env.DEV) {
      this.app.use(LogsMiddleware);
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/api/v1/auth", authrouter);
    this.app.use("/api/v1/account", accountsrouter);
    this.app.use("/api/v1/infos", inforouter);
    this.app.use("/api/v1/exams", examsrouter);

    this.app.all("/*", this.notfound);

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
        txt: "Not Found",
      },
    });
  }
}
