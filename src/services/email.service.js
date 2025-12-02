import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_GMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async send(to, subject, html) {
    const mailOptions = {
      from: process.env.SENDER_GMAIL,
      to,
      subject,
      html,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", result.messageId);
      return result;
    } catch (err) {
      console.error("Email error:", err);
      throw err;
    }
  }
}

export default new EmailService();
