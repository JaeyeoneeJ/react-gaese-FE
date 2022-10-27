import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  baseURL: "http://52.78.244.135/",
});
