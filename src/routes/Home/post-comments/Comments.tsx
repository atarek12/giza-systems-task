import React from "react";
import {
  ActionFunction,
  Link,
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

export const loader: LoaderFunction = async ({ params }) => {
  const comments = await api.getPostComments({ postId: params.postId! });
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
    navigate("/");
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
          <Button as={Link} to="/">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Comments;
