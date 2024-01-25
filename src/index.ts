import "dotenv/config";
import { ExpressServer } from "./models/server.model";
import { transporter } from "./services/nodeMailer.service";

const server = new ExpressServer();
server.start();

transporter
  .verify()
  .then(() => {
    console.log("[Email Service] Ready for send emails!");
  })
  .catch((err) => {
    console.log(err);
  });

export default server.app;
