import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/user.js";
import { quizRouter } from "./routes/quiz.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/quiz", quizRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  const PORT = process.env.PORT;
  app.listen(PORT || 3000);
  console.log(`Listening on port ${PORT} `);
}

main();
