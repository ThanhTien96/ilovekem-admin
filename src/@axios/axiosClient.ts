import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: {
    accessToken: import.meta.env.REACT_APP_ACCESS_TOKEN,
  },
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imlsb3Zla2Vtc3VwcGVyYWRtaW4iLCJpYXQiOjE2OTUzMDY1MTIsImV4cCI6MzM5MzIwNTAyMX0.8oeHD2Em7n1NeT9dEoiBqWYJFFeo8OBH0Zhhs40Cdy4"
  return config;
});

export default instance;
