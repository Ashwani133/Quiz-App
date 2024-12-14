import { Router } from "express";
const quizRouter = Router();
import { z } from "zod";
import { quizModel } from "../models/db.js";
import { AdminMiddleware } from "../middlewares/admin.js";

quizRouter.post("/", AdminMiddleware, async function (req, res) {
  const { title, description, createdBy, questions, createdAt } = req.body;

  const quizSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(100),
    createdBy: z.string().min(3).max(100),
    questions: z
      .array(
        z.object({
          questionText: z.string().min(3), // Each question must have a `questionText`
          options: z.array(z.string()).min(2).max(6), // Options must be an array of strings (2-6 items)
          selectedAnswer: z.string(), // Correct answer must be a string
        })
      )
      .min(1),
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
      error: parsedData.error.issues[0].message,
      path: parsedData.error.issues[0].path[0],
    });
    console.log(parsedData.error);
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
