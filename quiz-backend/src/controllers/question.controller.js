import {
  createQuestionService,
  getAllQuestionsService,
  getSingleQuestion,
} from "../services/question.service.js";

export const createQuestion = async (req, resp) => {
  const { question, option1, option2, option3, option4, correctAnswer } =
    req.body;

  const result = await createQuestionService({
    question,
    option1,
    option2,
    option3,
    option4,
    correctAnswer,
  });

  return resp.status(201).json(result);
};

//get all questions

export const listQuestions = async (req, resp) => {
  const questions = await getAllQuestionsService();
  return resp.json(questions);
};

// get single
export const getQuestionController = async (req, resp) => {
  const { questionId } = req.params;
  const q = await getSingleQuestion(questionId);
  return resp.json(q);
};
