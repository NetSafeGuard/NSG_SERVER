import "dotenv/config";
import { ExpressServer } from "./http/models/server.model";
import { transporter } from "./http/services/nodeMailer.service";
import { SocketServer } from "./wss/models/server";

export const server = new ExpressServer();
server.start();

const wss = new SocketServer();
wss.start();

transporter
  .verify()
  .then(() => {
    console.log("[📨] Ready to send emails!");
  })
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
}); 

