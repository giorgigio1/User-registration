import axios from "axios";

export const baseApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
});
