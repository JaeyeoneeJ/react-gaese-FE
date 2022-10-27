import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  // baseURL: "http://3.34.143.16/",
  baseURL: "http://localhost:4000",
});