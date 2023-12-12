import { TComment, TPost } from "../../shared/types";
import { axios } from "./axios";

export type TGetPostsVariables = {
  forUserId?: string;
};
export async function listPosts(variables: TGetPostsVariables) {
  const { forUserId: userId } = variables;
  const res = await axios<TPost[]>({
    method: "GET",
    url: `/posts${userId ? `userId=${userId}` : ""}`,
  });
  return res.data;
}

export type TGetPostVariables = {
  postId: string;
};
export async function getPost(variables: TGetPostVariables) {
  const { postId } = variables;
  const res = await axios<TPost>({ method: "GET", url: `/posts/${postId}` });
  return res.data;
}

export type TGetPostCommentsVariables = {
  postId: string;
};
export async function getPostComments(variables: TGetPostVariables) {
  const { postId } = variables;
  const res = await axios<TComment[]>({
    method: "GET",
    url: `/posts/${postId}/comments`,
  });
  return res.data;
}

export type TCreatePostVariables = {
  title: string;
  body: string;
  userId: string;
};
export async function createPost(variables: TCreatePostVariables) {
  const { ...data } = variables;
  const res = await axios<TPost>({ method: "POST", url: `/posts`, data });
  return res.data;
}

export type TUpdatePostVariables = {
  title: string;
  body: string;
  userId: string;
  postId: string;
};
export async function updatePost(variables: TUpdatePostVariables) {
  const { postId, ...data } = variables;
  const res = await axios<TPost>({
    method: "POST",
    url: `/posts/${postId}`,
    data,
  });
  return res.data;
}

export type TDeletePostVariables = {
  postId: string;
};
export async function deletePost(variables: TDeletePostVariables) {
  const { postId } = variables;
  const res = await axios<void>({
    method: "DELETE",
    url: `/posts/${postId}`,
  });
  return res.data;
}
