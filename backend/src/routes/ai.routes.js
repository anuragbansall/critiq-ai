import express from "express";
import generateContent from "../services/ai.service.js";

const aiRouter = express.Router();

aiRouter.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const responseText = await generateContent(prompt);

    return res.status(200).json({ content: responseText });
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: "Failed to generate content" });
  }
});

export default aiRouter;
