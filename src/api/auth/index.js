import { overfetch } from "../client";
import { LOGIN_URL, SIGNUP_URL } from "../urls";

const BASE_LOGIN_PARAMS = {
  email: "oleg_pidoras@gmail.com",
  password: "123123123",
};

export const login = (params = BASE_LOGIN_PARAMS) =>
  overfetch(({ client }) => client.post(LOGIN_URL, params));

const BASE_SIGNUP_PARAMS = {
  firstName: "",
  lastName: "",
  photo: "",
  birthDate: new Date(),
  description: "",
  email: "",
  password: "",
};

export const signup = (params = BASE_SIGNUP_PARAMS) =>
  overfetch(({ client }) => client.post(SIGNUP_URL, params));
