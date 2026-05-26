// apis__routes
import express from "express";
import {
  createQuiz,
  createQuizFromAI,
  deleteQuiz,
  getSingleQuiz,
  listQuizzes,
  getMyQuizzes,
  getStats,
} from "../controllers/quiz.controller.js";

const quizRouter = express.Router();

quizRouter.get("/quizzes/stats", getStats);
quizRouter.get("/quizzes/my", getMyQuizzes);
quizRouter.delete("/quizzes/:quizId", deleteQuiz);
quizRouter.get("/quizzes/:quizId", getSingleQuiz);
quizRouter.get("/quizzes", listQuizzes);
quizRouter.post("/quizzes", createQuiz);
quizRouter.post("/quizzes/ai", createQuizFromAI);

export default quizRouter;
