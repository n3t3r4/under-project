import axios from "axios";
import { getAuthToken } from "./auth";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export const apiOop = axios.create({
  baseURL: "http://localhost:8081/",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
