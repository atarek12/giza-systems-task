import { Box, Container, Heading, Stack } from "@chakra-ui/react";
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
import CreatePost, { TCreatePostFormValues } from "./components/CreatePost";

export const loader: LoaderFunction = async () => {
  const posts = await api.listPosts({});
  return posts.reverse();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values: TCreatePostFormValues = [...(formData as any).entries()].reduce(
    (acc, curr) => ({ ...acc, [curr[0]]: curr[1] }),
    {},
  );
  const newPost = await api.createPost(values);
  return json(newPost);
};

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const posts = useLoaderData() as TPost[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCount(posts.length));
  }, [dispatch, posts]);

  return (
    <Container maxW="1400" paddingTop="60px">
      <Stack direction="row" spacing="160px">
        <Stack spacing="16px" flex="1">
          <Heading>What's new...</Heading>
          <PostsList posts={posts} />
        </Stack>
        <Box flex="1">
          <CreatePost />
        </Box>
      </Stack>
      <Outlet />
    </Container>
  );
};

export default Home;
