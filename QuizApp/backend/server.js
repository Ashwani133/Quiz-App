import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/user.js";
import { quizRouter } from "./routes/quiz.js";
import { adminRouter } from "./routes/admin.js";
import { answerRouter } from "./routes/answer.js";
import { resultRouter } from "./routes/result.js";
const app = express();
import cors from "cors";
const corsoption = { origin: ["http://localhost:5173"] };
app.use(cors(corsoption));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/user/quiz", answerRouter);
app.use("/api/v1/user/quiz", resultRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  const PORT = process.env.PORT;
  app.listen(PORT || 3000);
  console.log(`Listening on port ${PORT} `);
}

main();
