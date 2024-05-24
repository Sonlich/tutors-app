import { overfetch } from "../client";
import { USERS_URL } from "../urls";

export const getAllUsers = () =>
  overfetch(({ client }) => client.get(USERS_URL));

export const getUsersTutors = () =>
  overfetch(({ client }) => client.get(`${USERS_URL}/tutors`));

export const getUserByID = (id = "") =>
  overfetch(({ client }) => client.get(`${USERS_URL}/${id}`));

export const getCurrentUser = () =>
  overfetch(({ client }) => client.get(`${USERS_URL}/me`));

const BASE_CREATE_USER_PARAMS = {
  firstName: "",
  lastName: "",
  photo: "",
  birthDate: "",
  description: "",
  email: "",
  password: "",
  //roles: "ANY" |'STUDENT' | 'TUTOR'
  roles: [],
};

export const createUser = (params = BASE_CREATE_USER_PARAMS) =>
  overfetch(({ client }) => client.post(USERS_URL, params));

export const deleteUserByID = (id = "") =>
  overfetch(({ client }) => client.delete(`${USERS_URL}/${id}`));

export const pathProfile = (params) =>
  overfetch(({ client }) => client.post(USERS_URL, params));
