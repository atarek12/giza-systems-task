import React from "react";
import { TPost } from "../../types";
import { Stack } from "@chakra-ui/react";
import { PostCard } from "./PostCard";

interface PostsListProps {
  posts: TPost[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <Stack>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export { PostsList };
