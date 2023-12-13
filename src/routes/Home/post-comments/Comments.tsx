import React from "react";
import {
  ActionFunction,
  LoaderFunction,
  json,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { api } from "../../../libs/axios";
import { TComment } from "../../../shared/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  Card,
  CardBody,
  Text,
  Avatar,
  Heading,
} from "@chakra-ui/react";

const FAKE_CACHE: Record<string, TComment[]> = {};

export const loader: LoaderFunction = async ({ params }) => {
  const postId = params.postId!;
  if (FAKE_CACHE[postId]) {
    return FAKE_CACHE[postId];
  }
  const comments = await api.getPostComments({ postId });
  FAKE_CACHE[postId] = comments;
  return comments;
};

export const action: ActionFunction = async () => {
  return json({});
};

interface CommentsProps {}

const Comments: React.FC<CommentsProps> = ({}) => {
  const comments = useLoaderData() as TComment[];
  const navigate = useNavigate();

  const onClose = () => {
    navigate("/", { preventScrollReset: true });
  };

  return (
    <Modal
      onClose={onClose}
      isOpen
      isCentered
      scrollBehavior="inside"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardBody>
                  <Stack direction="row">
                    <Avatar name={comment.name} />
                    <Stack>
                      <Heading size="sm">{comment.email}</Heading>
                      <Text>{comment.body}</Text>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Comments;
