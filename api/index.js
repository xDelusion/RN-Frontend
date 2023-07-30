import axios from "axios";
import { getToken } from "./trips";

const BASE_URL = "http://localhost:8000";
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { BASE_URL };
export default instance;
