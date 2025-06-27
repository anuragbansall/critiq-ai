import express from "express";
import dotenv from "dotenv";
import aiRouter from "./routes/ai.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Welcome to the Critiq AI Backend!");
});

app.use("/api/ai", aiRouter);

export default app;
