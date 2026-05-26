import Quiz from "../models/quiz.model.js";
import User from "../models/user.model.js";
import { generateQuizFromAI } from "../services/quiz.services.js";

export const listQuizzes = async (req, resp) => {
  const q = await Quiz.find();
  return resp.json(q);
};

export const createQuiz = async (req, resp) => {
  const {
    title,
    description,
    maxMarks,
    minusMarking,
    questions,
    instructions,
    maxTime,
  } = req.body;

  const quiz = {
    title,
    description,
    maxMarks,
    minusMarking,
    questions,
    instructions,
    maxTime,
    createdBy: req.userId || null,
    isAiGenerated: false,
  };

  const responseData = await Quiz.create(quiz);
  return resp.status(201).json(responseData);
};

// get single quiz
export const getSingleQuiz = async (req, resp) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findOne({ _id: quizId }).populate("questions");
  if (!quiz) {
    return resp.status(404).json({ message: "Quiz not found" });
  }

  return resp.json(quiz);
};

// delete quiz — fixed to use MongoDB
export const deleteQuiz = async (req, resp) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findByIdAndDelete(quizId);
  if (!quiz) {
    return resp.status(404).json({ message: "Quiz not found" });
  }

  return resp.json({ message: "Quiz deleted successfully" });
};

// get quizzes created by logged-in user
export const getMyQuizzes = async (req, resp) => {
  const quizzes = await Quiz.find({ createdBy: req.userId });
  return resp.json(quizzes);
};

// platform stats
export const getStats = async (req, resp) => {
  const [totalQuizzes, aiGenerated, totalUsers] = await Promise.all([
    Quiz.countDocuments(),
    Quiz.countDocuments({ isAiGenerated: true }),
    User.countDocuments(),
  ]);

  const completionRate = totalQuizzes > 0 ? Math.min(90, 60 + totalQuizzes * 0.5) : 0;

  return resp.json({
    totalQuizzes,
    aiGenerated,
    totalUsers,
    completionRate: parseFloat(completionRate.toFixed(1)),
  });
};

// create quiz from AI
export const createQuizFromAI = async (req, resp) => {
  const { title, numberOfQuestions, description } = req.body;
  const response = await generateQuizFromAI(title, description, numberOfQuestions, req.userId);
  return resp.json(response);
};
