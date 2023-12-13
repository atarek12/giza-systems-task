import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  Textarea,
  Select,
  InputProps,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";

const InputMapper = {
  text: ChakraInput,
  textarea: Textarea,
  select: Select,
} as any;

type FormInputType = React.HTMLInputTypeAttribute | "textarea";

interface FormInputProps extends Omit<InputProps, "placeholder"> {
  type?: FormInputType;
  label?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { label, ...inputProps } = props;

  const { control } = useFormContext();

  const Input = InputMapper[props.type!] || ChakraInput;

  return (
    <Controller
      control={control}
      name={props.name || "unnamed"}
      render={({ fieldState, field }) => {
        const { invalid, error } = fieldState;
        const { ref, value, disabled, onBlur, onChange } = field;
        return (
          <FormControl
            isInvalid={invalid}
            isDisabled={props.isDisabled || disabled}
            isRequired={props.isRequired}
            isReadOnly={props.isReadOnly}
          >
            {label && <FormLabel>{label}</FormLabel>}
            <Input
              ref={ref}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              {...inputProps}
            />
            {error?.message && invalid ? (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        );
      }}
    />
  );
};

export { FormInput };
