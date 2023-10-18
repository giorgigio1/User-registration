import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://user-management-backend-navy.vercel.app/",
});
