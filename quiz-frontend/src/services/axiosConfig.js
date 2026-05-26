import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8181/api",
});

axiosInstance.interceptors.request.use(function (config) {
  console.log("requesting...");
  const token = localStorage.getItem("token");
  if (token) {
    console.log("token ", token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
