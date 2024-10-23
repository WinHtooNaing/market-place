import axios from "axios";
const getFreshLocalStorage = () => {
  return localStorage.getItem("token");
};
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  headers: {
    Authorization: `Bearer ${getFreshLocalStorage()}`,
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFreshLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
