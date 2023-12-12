import React, { useEffect } from "react";
import { TPost } from "../../types";
import { Box, Stack } from "@chakra-ui/react";
import { PostCard } from "./PostCard";
import { loadMore, useAppDispatch, useAppSelector } from "../../../libs/redux";
import { useIntersectionObserver } from "../../hooks";

interface PostsListProps {
  posts: TPost[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  const { isIntersecting, ref } = useIntersectionObserver({ once: true });
  const dispatch = useAppDispatch();
  const postsState = useAppSelector((state) => state.posts);
  const start = 0;
  const end = postsState.pageNumber * postsState.itemsPerPage;

  useEffect(() => {
    if (isIntersecting) {
      dispatch(loadMore());
    }
  }, [dispatch, isIntersecting]);

  return (
    <Stack spacing="20px">
      {posts.slice(start, end).map((post, index) => (
        <Box>
          <PostCard key={post.id} post={post} />
          {index === end - 1 && <Box ref={ref} h="1px" />}
        </Box>
      ))}
    </Stack>
  );
};

export { PostsList };
