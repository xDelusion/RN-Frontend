import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.8.176:5000",
});

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default instance;
