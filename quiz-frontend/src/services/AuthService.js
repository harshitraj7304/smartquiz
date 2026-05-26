import { axiosInstance } from "./axiosConfig";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post(`/signup`, userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(`/login`, loginData);
  return response.data;
};
