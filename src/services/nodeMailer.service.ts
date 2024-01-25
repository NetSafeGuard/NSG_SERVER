import nodemailer from "nodemailer";

export let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  secure: true,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
