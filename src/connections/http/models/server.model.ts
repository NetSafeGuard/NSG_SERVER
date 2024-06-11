import express, { type Request, type Response } from "express";
import { authrouter } from "../routers/authentication.route";
import { accountsrouter } from "../routers/accounts.route";
import cors from "cors";
import { activityrouter } from "../routers/activities.route";
import { tokenrouter } from "../routers/token.route";
import { createServer } from "node:http";
import {bikelightroute} from "@http/routers/bikelight.route";
import { groupsrouter } from "../routers/groups.route";
import { updaterouter } from "../routers/update.route";

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
    this.app.set("views", "./src/connections/http/views");

    this.app.use("/api/v1/update", updaterouter);
    this.app.use("/api/v1/auth", authrouter);
    this.app.use("/api/v1/account", accountsrouter);
    this.app.use("/api/v1/activities", activityrouter);
    this.app.use("/api/v1/group", groupsrouter);
    this.app.use("/api/v1/bikelight/webhook", bikelightroute)
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