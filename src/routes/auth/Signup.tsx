import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../../shared/components";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link, Navigate } from "react-router-dom";
import { signupAction, useAppDispatch, useAppSelector } from "../../libs/redux";

export type TSignupFormValues = {
  name: string;
  email: string;
  password: string;
};

const schema = Yup.object({
  name: Yup.string().required("This field is required!"),
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required!"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("This field is required!"),
}).required();

interface SignupProps {}

const Component: React.FC<SignupProps> = ({}) => {
  const dispatch = useAppDispatch();
  const useFormAttributes = useForm<TSignupFormValues>({
    resolver: yupResolver<TSignupFormValues>(schema),
  });

  const { user, error, loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (values: TSignupFormValues) => {
    dispatch(signupAction(values));
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxW="600" paddingY="100px">
      <FormProvider {...useFormAttributes}>
        <form onSubmit={useFormAttributes?.handleSubmit(handleSubmit)}>
          <Card border="1px solid">
            <CardHeader>
              <Heading>SIGNUP</Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="16px">
                <FormInput type="text" name="name" label="Name" />
                <FormInput type="email" name="email" label="Email" />
                <FormInput type="password" name="password" label="Password" />
                {!!error && <Text color="red">{error}</Text>}
              </Stack>
            </CardBody>

            <CardFooter>
              <Button
                type="submit"
                width="100%"
                colorScheme="blue"
                isLoading={loading}
              >
                Signup
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
      <br />
      <Button
        width="full"
        variant="link"
        rightIcon={<ArrowForwardIcon />}
        as={Link}
        to="../login"
      >
        Login Instead
      </Button>
    </Container>
  );
};

Component.displayName = "Signup";
export { Component };
