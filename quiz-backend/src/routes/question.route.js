import express from "express";
import {
  createQuestion,
  getQuestionController,
  listQuestions,
} from "../controllers/question.controller.js";

const quesRouter = express.Router();

quesRouter.get("/questions/:questionId", getQuestionController);
quesRouter.post("/questions", createQuestion);
quesRouter.get("/questions", listQuestions);

export default quesRouter;
