import { axiosInstance } from "./axiosConfig";

// Get all quizzes
export const getAllQuizzes = async () => {
  const response = await axiosInstance.get(`/quizzes`);
  return response.data;
};

// Get quizzes created by the logged-in user
export const getMyQuizzes = async () => {
  const response = await axiosInstance.get(`/quizzes/my`);
  return response.data;
};

// Get platform stats
export const getStats = async () => {
  const response = await axiosInstance.get(`/quizzes/stats`);
  return response.data;
};

// Generate quiz with AI
export const createQuizWithAI = async (aiData) => {
  const response = await axiosInstance.post(`/quizzes/ai`, aiData);
  return response.data;
};

// Create quiz manually
export const createQuiz = async (quizData) => {
  const response = await axiosInstance.post(`/quizzes`, quizData);
  return response.data;
};

// Load single quiz
export const getSingleQuiz = async (quizId) => {
  const response = await axiosInstance.get(`/quizzes/${quizId}`);
  return response.data;
};

// Delete a quiz
export const deleteQuiz = async (quizId) => {
  const response = await axiosInstance.delete(`/quizzes/${quizId}`);
  return response.data;
};
