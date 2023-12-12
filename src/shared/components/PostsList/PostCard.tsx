import React from "react";
import { TPost } from "../../types";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

interface PostCardProps {
  index: number;
  post: TPost;
}

const PostCard: React.FC<PostCardProps> = ({ index, post }) => {
  return (
    <Card maxW="md" border="1px solid" borderColor="blue.100">
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center">
          <Avatar name={`${index + 1}`} />
          <Link to={`user/${post.userId}`}>
            <Heading size="sm" _hover={{ textDecor: "underline" }}>
              {post.title}
            </Heading>
            <Text>POST ID: {post.id}</Text>
          </Link>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{post.body}</Text>
      </CardBody>

      <CardFooter>
        <Button
          flex="1"
          leftIcon={<ChatIcon />}
          as={Link}
          to={`posts/${post.id}`}
        >
          See Comments
        </Button>
      </CardFooter>
    </Card>
  );
};

export { PostCard };
