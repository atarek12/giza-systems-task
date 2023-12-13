import React from "react";
import { TPost } from "../../types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ChatIcon, ViewIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface PostCardProps {
  index: number;
  post: TPost;
  hideButtons?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ index, post, hideButtons }) => {
  return (
    <Card border="1px solid" borderColor="blue.100">
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center">
          <Avatar name={`${index + 1}`} />
          <Box>
            <Heading size="sm">{post.title}</Heading>
            <Text>
              POST ID: {post.id} - USER ID: {post.userId}
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{post.body}</Text>
      </CardBody>

      {!hideButtons && (
        <CardFooter>
          <Button
            flex="1"
            mr="10px"
            leftIcon={<ChatIcon />}
            as={Link}
            to={`posts/${post.id}/comments`}
          >
            See Comments
          </Button>
          <Button
            flex="1"
            colorScheme="blue"
            variant="outline"
            leftIcon={<ViewIcon />}
            as={Link}
            to={`users/${post.userId}`}
          >
            Open User Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export { PostCard };
