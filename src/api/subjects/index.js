import { overfetch } from "../client";
import { SUBJECTS_URL } from "../urls";

export const getSubjects = () =>
  overfetch(({ client }) => client.get(SUBJECTS_URL));

export const postSubject = (params) =>
  overfetch(({ client }) => client.post(SUBJECTS_URL, params));

export const patchSubject = (id, params) =>
  overfetch(({ client }) => client.patch(`${SUBJECTS_URL}/${id}`, params));

export const deleteSubject = (id) =>
  overfetch(({ client }) => client.delete(`${SUBJECTS_URL}/${id}`));
