import "dotenv/config";
import { ExpressServer } from "@/connections/http/models/server.model";
import { transporter } from "@/connections/http/services/nodeMailer.service";
import { SocketServer } from "@/connections/wss/models/server";
import { Role } from "@prisma/client";

export const server = new ExpressServer();
server.start();

export const wss = new SocketServer();
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
