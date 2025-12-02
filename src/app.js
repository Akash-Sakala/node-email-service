import express from "express";
import EmailRouter from "./routes/email.routes.js";

const app = express();
app.use(express.json());

app.use("/api/email", EmailRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
