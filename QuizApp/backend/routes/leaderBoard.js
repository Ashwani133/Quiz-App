import { Router } from "express";
const leaderBoardRouter = Router();
import z from "zod";
import { leaderBoardModel } from "../models/db.js";
import { usermiddleware } from "../middlewares/user.js";

leaderBoardRouter.post("/leaderboard", usermiddleware, async (req, res) => {
  const { quizId, userId, score, rank } = req.body;

  const resultSchema = z.object({
    quizId: z.string(),
    userId: z.string(),
    score: z.number(),
    rank: z.number(),
  });

  const parsedResultData = resultSchema.safeParse({
    quizId: quizId,
    userId: userId,
    score: score,
    rank: rank,
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
    await leaderBoardModel.create({
      quizId: quizId,
      userId: userId,
      score: score,
      rank: rank,
    });
    res.status(201).json({
      message: "Data added to leaderboard!",
    });
  } catch (e) {
    res.status(500).json({
      message: "An internal error occured. Please try again later!",
    });
  }
});
