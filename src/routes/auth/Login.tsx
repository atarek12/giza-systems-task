import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../../shared/components";
import { Link, Navigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { loginAction, useAppDispatch, useAppSelector } from "../../libs/redux";

export type TLoginFormValues = {
  email: string;
  password: string;
};

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required!"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("This field is required!"),
}).required();

interface LoginProps {}

const Component: React.FC<LoginProps> = ({}) => {
  const dispatch = useAppDispatch();
  const useFormAttributes = useForm<TLoginFormValues>({
    resolver: yupResolver<TLoginFormValues>(schema),
  });

  const { user, error, loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (values: TLoginFormValues) => {
    dispatch(loginAction(values));
  };

  if (user) {
    const pathname = localStorage.getItem("redirectTo");
    return <Navigate to={pathname || "/"} replace />;
  }

  return (
    <Container maxW="600" paddingY="100px">
      <FormProvider {...useFormAttributes}>
        <form onSubmit={useFormAttributes?.handleSubmit(handleSubmit)}>
          <Card border="1px solid">
            <CardHeader>
              <Heading>LOGIN</Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="16px">
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
                Login
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
        to="../signup"
      >
        Signup Instead
      </Button>
    </Container>
  );
};

Component.displayName = "Login";
export { Component };
