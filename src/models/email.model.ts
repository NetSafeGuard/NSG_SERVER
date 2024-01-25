import { transporter } from "../services/nodeMailer.service";

export class EmailTemplate {
  public subject: string;
  public html: string;

  constructor() {
    this.subject = "";
    this.html = "";
  }

  public sendEmail = (email: string) => {
    transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: this.subject,
      html: this.html,
    });
  };
}
