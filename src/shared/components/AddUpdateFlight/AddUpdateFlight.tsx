import React from "react";
import { TFlight } from "../../types";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "..";

export type TFlightFormValues = {
  code: string;
  date: string;
  capacity: number;
};

const schema = Yup.object({
  code: Yup.string().required("This field is required!"),
  date: Yup.string().required("This field is required!"),
  capacity: Yup.number().required("This field is required!"),
}).required();

interface AddUpdateFlightProps {
  flight?: TFlight;
  onSubmit: (values: TFlightFormValues) => void;
}

const AddUpdateFlight: React.FC<AddUpdateFlightProps> = ({
  flight,
  onSubmit,
}) => {
  const isAdding = !flight;

  const useFormAttributes = useForm<TFlightFormValues>({
    defaultValues: {
      code: flight?.code,
      capacity: flight?.capacity,
      date: flight?.date,
    },
    resolver: yupResolver<TFlightFormValues>(schema),
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
              {isAdding ? "Create" : "Update"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export { AddUpdateFlight };
