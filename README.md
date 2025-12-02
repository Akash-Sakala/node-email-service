
# 📬 Node Email Service (Reusable Email Plugin for Node.js)

A lightweight, plug‑and‑play **Email Service Plugin** built with Nodemailer and Gmail App Passwords.  
Works in **any Node.js application** — Express, Fastify, NestJS, or plain Node.

Use it in two ways:

- **Approach 1:** Call EmailService directly inside backend code  
- **Approach 2:** Use the built‑in Express API route `/api/email/send`

---

## 🚀 Features

- ✉ Send emails using Gmail + Nodemailer  
- 🔌 Drop‑in service for any app  
- 🧱 Service‑based clean architecture  
- 🔐 Secrets stored in `.env`  
- 🌐 Optional Express API  
- ⚙ Ready for GitHub, production, or template use  

---

## 📁 Folder Structure

```
node-email-service/
│
├── src/
│   ├── services/
│   │   └── email.service.js
│   ├── routes/
│   │   └── email.routes.js
│   └── app.js
│
├── .env.example
├── package.json
└── README.md
```

---

## 🔧 Setup

### 1. Install dependencies
```
npm install
```

### 2. Copy `.env.example` → `.env`
```
APP_EMAIL=yourgmail@gmail.com
APP_PASSWORD=your-gmail-app-password
```

> ⚠ You MUST use a Gmail **App Password**, not your regular password.  
> Generate it here: https://myaccount.google.com/apppasswords

---

## 🧩 Approach 1 — Use EmailService Directly

Recommended when your **backend wants to send emails internally**  
(e.g., OTPs, notifications, welcome mails, alerts)

```js
import EmailService from "./src/services/email.service.js";

await EmailService.send(
  "receiver@gmail.com",
  "Hello!",
  "<h1>This is a test email</h1>"
);
```

---

## 🌐 Approach 2 — Use Express API Endpoint

Perfect for **frontend**, **mobile apps**, or external services.

### Register route in `app.js`

```js
import express from "express";
import EmailRouter from "./src/routes/email.routes.js";

const app = express();
app.use(express.json());

app.use("/api/email", EmailRouter);

app.listen(3000, () => console.log("Server running on 3000"));
```

### Send email using REST API

```
POST http://localhost:3000/api/email/send
```

**Body:**
```json
{
  "to": "test@gmail.com",
  "subject": "Hello",
  "message": "<h1>Hello World</h1>"
}
```

---

## 🛠 Code Included

### `src/services/email.service.js`

```js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async send(to, subject, html) {
    const mailOptions = {
      from: process.env.APP_EMAIL,
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
```

---

### `src/routes/email.routes.js`

```js
import express from "express";
import EmailService from "../services/email.service.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await EmailService.send(to, subject, message);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
```

---

## 🧪 Test the Service

### Run server:
```
npm start
```

### Test with Postman:
```
POST http://localhost:3000/api/email/send
```



