import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: {
    accessToken: import.meta.env.REACT_APP_ACCESS_TOKEN,
  },
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFub255bW91c3N1cHBlcmFkbWluIiwiaWF0IjoxNjk1ODA0MDk1LCJleHAiOjMzOTQyMDAxODZ9.BFDauxQWvd1LAwlFPZYvxKhU6FuDtFUm4j8eq4Amkts"
  return config;
});

export default instance;
