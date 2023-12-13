import { Container, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { api } from "../../libs/axios";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  json,
  useLoaderData,
} from "react-router-dom";
import { TPost } from "../../shared/types";
import { PostsList } from "../../shared/components";
import { setCount, useAppDispatch } from "../../libs/redux";

export const loader: LoaderFunction = async () => {
  const posts = await api.listPosts({});
  return posts;
};

export const action: ActionFunction = async ({ request }) => {
  return json({});
};

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const posts = useLoaderData() as TPost[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCount(posts.length));
  }, [dispatch, posts]);

  return (
    <Container>
      <Stack spacing="16px">
        <Heading>What's new...</Heading>
        <PostsList posts={posts} />
      </Stack>
      <Outlet />
    </Container>
  );
};

export default Home;
