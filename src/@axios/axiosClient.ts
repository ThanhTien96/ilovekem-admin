import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: {
    accessToken: import.meta.env.REACT_APP_ACCESS_TOKEN,
  },
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  return config;
});

export default instance;
