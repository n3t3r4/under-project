import axios from "axios";
import { getAuthToken } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
