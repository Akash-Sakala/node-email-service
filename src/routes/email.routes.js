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
