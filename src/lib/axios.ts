import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: any) => response,
  (error: unknown) => {
    console.error("API Error: ", error);
    return Promise.reject(error);
  }
);

export default api;
