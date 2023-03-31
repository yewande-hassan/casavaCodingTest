import { Text,Box, Button,Alert, AlertIcon, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, FormErrorMessage, Flex, CloseButton, AlertTitle } from '@chakra-ui/react'
import React from 'react'
import { useForm } from "react-hook-form";
import ReusableButton from '../components/button';
import Inputs from '../components/input';
import { useRouter } from "next/router";


function Login() {

  type FormData = {
    email: string;
    password: string;
  };  

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormData>({
    mode: "onBlur",
  });
  const router = useRouter()
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertStatus, setAlertStatus] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const resetAlert = () => {
    setAlertMessage("");
    setAlertStatus("");
  };

  const onSubmit = handleSubmit(async (values) => {
    const { email, password } = values;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      setAlertMessage(`Login successful with your email`);
      setAlertStatus("success");
      router.push('/home')

    } else {
      const { status, message } = await response.json();

      const statusMapping:any = {
        400: 'warning',
        401: 'error',
        default: 'error',
      }
      setAlertMessage(message || 'An error occurred')
      setAlertStatus(statusMapping[status] || statusMapping.default)
    }
  });
  return (
    <>
      <Flex
        h="100vh"
        m="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box boxShadow="2xl" rounded="md" bg="gray.50" p="6">
          {alertMessage && (
            <Alert status={alertStatus} mb={4}>
              <AlertIcon />
              <AlertTitle>{alertMessage}</AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          )}
          <form onSubmit={onSubmit}>
            <Text as="b" fontSize="3xl" my="1rem">
              Login
            </Text>
            <FormControl id="email" isInvalid={!!errors.email} width="700px">
              <Inputs
                type={"email"}
                placeHolder="Enter Email Address"
                values="email"
                title="Enter Email Address"
                register={register}
                errors={errors}
                rules={{
                  required: "Email is Required!!!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <Inputs
                type={showPassword ? "text" : "password"}
                placeHolder="Enter Password"
                values="password"
                title="Enter Password"
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                askPassword={true}
                onClick={handleClick}
                register={register}
                errors={errors}
                rules={{ required: "Password is Required!!!" }}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <ReusableButton
              action="Login"
              isLoading={isSubmitting}
              type="submit"
            />
          </form>
        </Box>
      </Flex>
    </>
  );
}

export default Login