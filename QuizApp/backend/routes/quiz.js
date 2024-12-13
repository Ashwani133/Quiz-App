import { Router } from "express";
const quizRouter = Router();
import { z } from "zod";
import { quizModel } from "../models/db.js";
import { AdminMiddleware } from "../middlewares/admin.js";

quizRouter.post("/quiz", AdminMiddleware, async function (req, res) {
  const { title, description, createdBy, questions, createdAt } = req.body;

  const quizSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(100),
    createdBy: z.string().min(3).max(100),
    questions: z.string().array().min(1),
    createdAt: z.date(),
  });

  const parsedData = quizSchema.safeParse({
    title: title,
    description: description,
    createdBy: createdBy,
    questions: questions,
    createdAt: createdAt,
  });

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data!",
      error: parsedUserData.error.issues[0].message,
    });
    return;
  }

  try {
    await quizModel.create({
      title: title,
      description: description,
      createdBy: createdBy,
      questions: questions,
      createdAt: createdAt,
    });

    res.status(201).json({
      message: "New quiz created successfully!",
    });
  } catch (e) {
    res.status(500).json({
      message: "An internal error occured. Please try again later.",
    });
  }
});

export { quizRouter };
