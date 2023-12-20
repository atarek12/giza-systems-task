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
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
  code: Yup.string().required("This field is required!"),
  date: Yup.string().required("This field is required!"),
  capacity: Yup.number().required("This field is required!"),
}).required();

export type TCreateFlightFormValues = {
  code: string;
  date: string;
  capacity: number;
};

interface CreateFlightProps {
  onSubmit: (values: TCreateFlightFormValues) => void;
}

const CreateFlight: React.FC<CreateFlightProps> = ({ onSubmit }) => {
  const useFormAttributes = useForm<TCreateFlightFormValues>({
    defaultValues: { code: "", capacity: 200, date: "" },
    resolver: yupResolver<TCreateFlightFormValues>(schema),
  });

  return (
    <FormProvider {...useFormAttributes}>
      <form onSubmit={useFormAttributes?.handleSubmit(onSubmit)}>
        <Card border="1px solid">
          <CardHeader>Create a new flight</CardHeader>

          <CardBody>
            <Stack spacing="16px">
              <FormInput type="text" name="code" label="Flight Code" />
              <FormInput type="date" name="date" label="Flight Date" />
              <FormInput
                type="number"
                name="capacity"
                label="Flight Capacity"
              />
            </Stack>
          </CardBody>

          <CardFooter>
            <Button type="submit" width="100%" colorScheme="blue">
              Create
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default CreateFlight;
