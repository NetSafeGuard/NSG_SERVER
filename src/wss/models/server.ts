import { server as express_server } from "../../index";
import { Server } from "socket.io";
import { createServer } from "http";

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

    this.server.listen(3001, () => {
      console.log("Socket server is running on port 3001");
    });
  }
}
