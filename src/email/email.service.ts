import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // Configuração do host SMTP
      port: Number(process.env.EMAIL_PORT),
      secure: false, // Use SSL ou TLS (para ambientes de produção, certifique-se de usar ture se o SMTP suportar SSL)
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: `"No Reply" <${process.env.EMAIL_FROM}>`, // Remetente
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return "Email sent successfully!";
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
