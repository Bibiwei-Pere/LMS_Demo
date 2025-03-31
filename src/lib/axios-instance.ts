import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lassod-learning-server.vercel.app",
  // baseURL: "http://localhost:3500",
  timeout: 15000 * 1000,
});

export const useAxiosInstance = (token: string) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
