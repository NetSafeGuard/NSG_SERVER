import express, { Request, Response } from "express";
import { authrouter } from "../routers/authentication.route";
import { accountsrouter } from "../routers/accounts.route";
import { inforouter } from "../routers/infos.route";
import cors from "cors";
import { examsrouter } from "../routers/exams.route";
import { tokenrouter } from "../routers/token.route";
import { createServer } from "http";
import { Server } from "socket.io";

export class ExpressServer {
  public app: express.Application;
  public server: any;

  constructor() {
    this.app = express();

    this.server = createServer(this.app);
  }

  start() {
    const corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };

    this.app.use(cors(corsOptions));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set("view engine", "ejs");
    this.app.set("views", "./src/http/views");

    this.app.use("/api/v1/auth", authrouter);
    this.app.use("/api/v1/account", accountsrouter);
    this.app.use("/api/v1/infos", inforouter);
    this.app.use("/api/v1/exams", examsrouter);
    this.app.use("/token/", tokenrouter);

    this.app.all("/*", this.notfound);

    this.server.listen(process.env.PORT, () => {
      console.log(`[🧠] HTTP server is running on port ${process.env.PORT}`);
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
