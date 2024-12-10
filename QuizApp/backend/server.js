import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/user.js";
const app = express();

app.use("/api/v1/user", userRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  const PORT = process.env.PORT;
  app.listen(PORT || 3000);
  console.log(`Listening on port ${PORT} `);
}

main();
