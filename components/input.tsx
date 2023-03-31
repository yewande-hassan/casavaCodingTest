import { Button, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
interface inputDetails {
  type: string;
  placeHolder: string;
  values: string;
  title: any;
  askPassword?: boolean;
  showPassword?: boolean;
  confirmPassword?: boolean;
  setConfirmPassword?: any;
  setShowPassword?: any;
  onClick?: any;
  register: any;
  errors?: any;
  rules?: any;
}

function Inputs({
  type,
  placeHolder,
  values,
  title,
  register,
  rules,
  errors,
  askPassword = false,
  showPassword,
  onClick,
  confirmPassword,
}: inputDetails) {
  return (
    <>
      <FormLabel fontSize="md" my="1rem">
        {title}
      </FormLabel>
      <InputGroup size="sm">
        <Input
          size="lg"
          pr="4.5rem"
          type={type}
          placeholder={placeHolder}
          {...(register && register(values, rules))}
        />
        {askPassword ? (
          <InputRightElement width="4rem">
            <Button h="3rem" width='4rem' size="sm" onClick={onClick}>
              {showPassword || confirmPassword ? < AiOutlineEye/> : <AiOutlineEyeInvisible/>}
            </Button>
          </InputRightElement>
        ) : null}
      </InputGroup>
      <FormErrorMessage>
        {errors.value && errors.value.message}
      </FormErrorMessage>
    </>
  );
}

export default Inputs