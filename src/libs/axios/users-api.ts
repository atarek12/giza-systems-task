import { TUser } from "../../shared/types";
import { axios } from "./axios";

export type TGetUserVariables = {
  userId: string;
};
export async function userInfo(variables: TGetUserVariables) {
  const { userId } = variables;
  const res = await axios<TUser>({
    method: "GET",
    url: `/users/${userId}`,
  });
  return res.data;
}
