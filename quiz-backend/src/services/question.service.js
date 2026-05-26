//questions all reusable operations

import Question from "../models/question.model.js";

export const createQuestionService = async (question) => {
  //to create question
  const createdQuestion = await Question.create(question);
  return createdQuestion;
};

//get all questions service
export const getAllQuestionsService = async () => {
  return await Question.find();
};

//get single question
export async function getSingleQuestion(questionId) {
  return await Question.findOne({
    _id: questionId,
  });
}
