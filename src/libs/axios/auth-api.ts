import { TUser, TAuth } from "../../shared/types";
import { axios } from "./axios";

export type TMeVariables = {
  userId: string;
};
export async function me(variables: TMeVariables) {
  const { userId } = variables;
  const res = await axios<TUser>({
    method: "GET",
    url: `/users/${userId}`,
  });
  return res.data;
}

export type TSignupVariables = {
  name: string;
  email: string;
  password: string;
};
export async function signup(variables: TSignupVariables) {
  const { ...data } = variables;
  try {
    const res = await axios<TAuth>({ method: "POST", url: `/signup`, data });
    return res.data.user;
  } catch (error: any) {
    throw error.response.data || error.message;
  }
}

export type TLoginVariables = {
  email: string;
  password: string;
};
export async function login(variables: TLoginVariables) {
  const { ...data } = variables;
  try {
    const res = await axios<TAuth>({ method: "POST", url: `/login`, data });
    return res.data.user;
  } catch (error: any) {
    throw error.response.data || error.message;
  }
}
