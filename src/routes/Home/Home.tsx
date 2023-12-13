import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { api } from "../../libs/axios";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  json,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { TPost } from "../../shared/types";
import { PostsList } from "../../shared/components";
import {
  addPost,
  setPosts,
  useAppDispatch,
  useAppSelector,
} from "../../libs/redux";
import CreatePost, { TCreatePostFormValues } from "./components/CreatePost";

export const loader: LoaderFunction = async () => {
  const posts = await api.listPosts({});
  return posts;
};

export const action: ActionFunction = async ({ request }) => {
  const values: TCreatePostFormValues = await request.json();
  const newPost = await api.createPost(values);
  return json(newPost);
};

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const loaderPosts = useLoaderData() as TPost[];
  const dispatch = useAppDispatch();
  const fetcher = useFetcher();
  const posts = useAppSelector((state) => state.posts.items);

  useEffect(() => {
    if (!posts.length) {
      dispatch(setPosts(loaderPosts));
    }
  }, [dispatch, loaderPosts, posts.length]);

  const handleCreatePost = (values: TCreatePostFormValues) => {
    fetcher.submit(values, { method: "POST", encType: "application/json" });
    dispatch(addPost({ ...values, id: posts.length + 1 }));
  };

  return (
    <Container maxW="1400" paddingTop="60px">
      <Stack direction="row" spacing="160px">
        <Stack spacing="16px" flex="1">
          <Heading>What's new...</Heading>
          <PostsList posts={posts || loaderPosts} />
        </Stack>
        <Box flex="1">
          <CreatePost onSubmit={handleCreatePost} />
        </Box>
      </Stack>
      <Outlet />
    </Container>
  );
};

export default Home;
