import { overfetch } from "../client";
import { IMAGE_URL } from "../urls";

export const getFile = (name = "") =>
  overfetch(({ client }) => client.get(`${IMAGE_URL}/${name}`));

const BASE_FILE = new File();

export const uploadFile = (file = BASE_FILE) =>
  overfetch(({ client }) => client.post(IMAGE_URL, file));
