import { Container, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { api } from "../../libs/axios";
import {
  ActionFunction,
  LoaderFunction,
  json,
  useLoaderData,
} from "react-router-dom";
import { TPost } from "../../shared/types";
import { PostsList } from "../../shared/components";

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
  return (
    <Container>
      <Stack spacing="16px">
        <Heading>What's new...</Heading>
        <PostsList posts={posts} />
      </Stack>
    </Container>
  );
};

export default Home;
