import axios from "axios";

export const axiosProductInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});
