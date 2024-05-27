import { server as express_server } from "@/index";
import { Server } from "socket.io";
import { createServer } from "http";
import { identify } from "../middlewares/identify.middleware";
import { getUsers } from "@/connections/http/useCases/Accounts/Repository/account.repository";
import {getGroups} from "@http/useCases/Groups/Repository/group.repository";

export class SocketServer {
  public io: Server;
  public server: any;

  constructor() {
    this.server = createServer(express_server.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  start() {
    this.io.use(identify);

    this.io.on("connection", async (socket) => {
      console.log("[🙌] Socket client connected");

      socket.on("getData", () => {
        Promise.all([getUsers(), getGroups()]).then(([users, groups]) => {
          socket.emit("users", users);
          socket.emit("groups", groups);
        });
      });

      socket.on("disconnect", () => {
        console.log("[🙌] Socket client disconnected");
      });
    });

    this.server.listen(3001, () => {
      console.log("[🔮] Socket server is running on port 3001");
    });
  }
}
