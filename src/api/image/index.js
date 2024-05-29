import { overfetch } from "../client";
import { IMAGE_URL } from "../urls";

export const getFile = (name = "") =>
  overfetch(({ client }) => client.get(`${IMAGE_URL}/${name}`));

export const uploadFile = (file) =>
  overfetch(({ client }) => client.post(IMAGE_URL, file));
