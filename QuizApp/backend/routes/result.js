import { Router } from "express";
const resultRouter = Router();
import z from "zod";
import { resultModel } from "../models/db.js";
import { usermiddleware } from "../middlewares/user.js";

resultRouter.post("/result", usermiddleware, async function (req, res) {
  const { userId, quizId, score, totalQuestions, correctAnswers } = req.body;

  const resultSchema = z.object({
    userId: z.string(),
    quizId: z.string(),
    score: z.number(),
    totalQuestions: z.number(),
    correctAnswers: z.number(),
  });

  const parsedResultData = resultSchema.safeParse({
    userId: userId,
    quizId: quizId,
    score: score,
    totalQuestions: totalQuestions,
    correctAnswers: correctAnswers,
  });

  if (!parsedResultData.success) {
    res.status(400).json({
      message: "Invalid data!",
      error: parsedResultData.error.issues[0].message,
      path: parsedResultData.error.issues[0].path[0],
    });
    return;
  }

  try {
    await resultModel.create({
      userId: userId,
      quizId: quizId,
      score: score,
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
    });
    res.status(201).json({
      message: "New result added!",
    });
  } catch (e) {
    res.status(500).json({
      message: "An internal error occured. Please try again later!",
    });
  }
});

export { resultRouter };
