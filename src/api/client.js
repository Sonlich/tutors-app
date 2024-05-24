import axios from "axios";
import { BASE_URL } from "./urls";

const TOKEN_KEY = "auth-token";

export const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: localStorage.getItem(TOKEN_KEY)
          ? `Bearer ${localStorage.getItem(TOKEN_KEY)}`
          : undefined,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const overfetch = (request) => {
  request({ client })
    .then((response) => {
      return response;
    })
    .catch(({ response }) => {
      return response.data.message || "Unknown error";
    });
};
