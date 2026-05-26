import { axiosInstance } from "./axiosConfig";

// Submit feedback
export const submitFeedback = async (feedbackData) => {
  const response = await axiosInstance.post(`/feedback`, feedbackData);
  return response.data;
};

// Get my recent feedbacks
export const getMyFeedbacks = async () => {
  const response = await axiosInstance.get(`/feedback/my`);
  return response.data;
};

// Update user profile
export const updateProfile = async (data) => {
  const response = await axiosInstance.put(`/users/me`, data);
  return response.data;
};
