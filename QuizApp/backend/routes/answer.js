import { Router } from "express";
const answerRouter = Router();
import { z } from "zod";
import { answerModel } from "../models/db.js";
import { usermiddleware } from "../middlewares/user.js";

answerRouter.post("/answer", usermiddleware, async function (req, res) {
  const { userId, quizId, answers } = req.body;

  const answerSchema = z.object({
    userId: z.string(),
    quizId: z.string(),
    answers: z.array(
      z.object({
        questionId: z.string(),
        selectedOption: z.string(),
      })
    ),
  });

  const parsedAnswerSchema = answerSchema.safeParse({
    userId: userId,
    quizId: quizId,
    answers: answers,
  });

  if (!parsedAnswerSchema.success) {
    res.status(400).json({
      message: "Invalid data!",
      error: parsedAnswerSchema.error.issues[0].message,
      path: parsedAnswerSchema.error.issues[0].path[0],
    });
    return;
  }

  try {
    await answerModel.create({
      userId: userId,
      quizId: quizId,
      answers: answers,
    });

    res.status(201).json({
      message: `Answers added to `,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "An internal error occured. Please try again later.",
    });
  }
});

export { answerRouter };
