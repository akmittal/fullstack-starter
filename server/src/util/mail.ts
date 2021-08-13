import nodemailer, { SentMessageInfo } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export function sendMail(mailOptions: Options): Promise<SentMessageInfo> {
  return transporter.sendMail(mailOptions);
}
