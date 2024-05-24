import { overfetch } from "../client";
import { LESSONS_URL } from "../urls";

export const getLessons = () =>
  overfetch(({ client }) => client.get(LESSONS_URL));

export const postLessons = (params) =>
  overfetch(({ client }) => client.post(LESSONS_URL, params));

export const patchLessons = (id, params) =>
  overfetch(({ client }) => client.patch(`${LESSONS_URL}/${id}`, params));

export const deleteLessons = (id) =>
  overfetch(({ client }) => client.delete(`${LESSONS_URL}/${id}`));
