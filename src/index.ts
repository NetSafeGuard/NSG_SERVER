import "dotenv/config";
import { ExpressServer } from "./http/models/server.model";
import { transporter } from "./http/services/nodeMailer.service";

const server = new ExpressServer();
server.start();

transporter
  .verify()
  .then(() => {
    console.log("[📨] Ready to send emails!");
  })
  .catch((err) => {
    console.log(err);
  });

export default server.app;
