import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { FormInput } from "../../../shared/components";
import { useFetcher } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

const UserIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type TCreatePostFormValues = {
  userId: number;
  title: string;
  body: string;
};

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const fetcher = useFetcher();
  const useFormAttributes = useForm<TCreatePostFormValues>({
    defaultValues: { body: "", title: "", userId: 1 },
  });

  return (
    <FormProvider {...useFormAttributes}>
      <fetcher.Form method="POST">
        <Card border="1px solid">
          <CardHeader>Write what's in your mind...</CardHeader>

          <CardBody>
            <Stack spacing="16px">
              <FormInput type="text" name="title" label="Post title" />
              <FormInput type="textarea" name="body" label="Post body" />
              <FormInput type="select" name="userId" label="User ID">
                {UserIds.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </FormInput>
            </Stack>
          </CardBody>

          <CardFooter>
            <Button type="submit" width="100%" colorScheme="blue">
              Post Now
            </Button>
          </CardFooter>
        </Card>
      </fetcher.Form>
    </FormProvider>
  );
};

export default CreatePost;
