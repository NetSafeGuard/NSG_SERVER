import { server as express_server } from "@/index";
import { Server } from "socket.io";
import { createServer, type Server as serverType } from "node:http";
import { identify } from "../middlewares/identify.middleware";
import { getUsers } from "@/connections/http/useCases/Accounts/Repository/account.repository";
import {getGroups} from "@http/useCases/Groups/Repository/group.repository";
import { getActivities } from "@/connections/http/useCases/Activities/Repository/activity.repository";

export class SocketServer {
  public io: Server;
  public server: serverType

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
        Promise.all([getUsers(), getGroups(), getActivities()]).then(([users, groups, activities]) => {
          socket.emit("users", users);
          socket.emit("groups", groups);
          socket.emit("activities", activities);
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
