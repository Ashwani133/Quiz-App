import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const quizSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: ObjectId, ref: "Admin", required: true },
  questions: [
    {
      _id: { type: ObjectId, auto: true },
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const answerSchema = new Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  quizId: { type: ObjectId, ref: "Quiz", required: true },
  answers: [
    {
      questionId: { type: ObjectId, required: true },
      selectedoption: { type: String, required: true },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

const resultSchema = new Schema({
  userId: { type: ObjectId, required: true },
  quizId: { type: ObjectId, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const leaderBoardSchema = new Schema({
  quizId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  score: { type: Number, required: Number },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const quizModel = mongoose.model("quizzes", quizSchema);
const answerModel = mongoose.model("answers", answerSchema);
const resultModel = mongoose.model("result", resultSchema);
const leaderBoardModel = mongoose.model("leaderBoard", leaderBoardSchema);

export {
  userModel,
  adminModel,
  quizModel,
  answerModel,
  resultModel,
  leaderBoardModel,
};
