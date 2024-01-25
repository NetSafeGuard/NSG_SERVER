import { transporter } from "../services/nodeMailer.service";

export class EmailTemplate {
  public subject: string;
  public html: string;

  constructor(subject: string, html: string) {
    this.subject = subject;
    this.html = html;
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
