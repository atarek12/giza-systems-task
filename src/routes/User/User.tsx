import React from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { api } from "../../libs/axios";
import { TPost, TUser } from "../../shared/types";
import { Container, Stack } from "@chakra-ui/react";
import UserInfo from "./components/UserInfo";
import { PostsList } from "../../shared/components";

export const loader: LoaderFunction = async ({ params }) => {
  const posts = await api.listPosts({ forUserId: params.userId! });
  const info = await api.userInfo({ userId: params.userId! });
  return { posts, info };
};

interface UserProps {}

const User: React.FC<UserProps> = ({}) => {
  const user = useLoaderData() as { posts: TPost[]; info: TUser };

  return (
    <Container maxW="1400" paddingTop="60px">
      <Stack spacing="40px">
        <UserInfo user={user.info} />
        <PostsList posts={user.posts} hideButtons />
      </Stack>
    </Container>
  );
};

export default User;
