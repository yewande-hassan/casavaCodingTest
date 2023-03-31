import Head from 'next/head'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Inter } from 'next/font/google'
import { Text, Box, Flex, FormControl,FormErrorMessage,Alert,AlertIcon,AlertTitle,CloseButton,} from "@chakra-ui/react"
import Inputs from '../components/input'
import ReusableButton from '../components/button'
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('')
  const [alertStatus, setAlertStatus] = React.useState('')
  const handleClick = () => setShowPassword(!showPassword);
  const handleClicked = () => setConfirmPassword(!confirmPassword);

  const onSubmit = handleSubmit(async (values) => {
    const {email,username,password}=values

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    })

    if (response.ok) {
      const user = await response.json()
      setAlertMessage('Registered user successfully')
      setAlertStatus('success')
      router.push('/login')
    } else {
      const error = await response.json()
      console.error(error.message)
      const { status, message } = await response.json()
      const statusMapping:any = {
        400: 'warning',
        401: 'error',
        500: 'error',
        default: 'error',
      }
      const defaultMessage = 'An error occurred. Please try again later.'
      setAlertMessage(message || defaultMessage)
      setAlertStatus(statusMapping[status] || statusMapping.default)

    }
  });
  return (
    <>
      <Head>
        <title>Casava Coding Test</title>
      </Head>
      <Flex
          h='100vh'
          m="auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
            <Box 
            boxShadow="2xl"
            rounded="md"
            bg="gray.50"
            p="6"
        >
          {alertMessage && (
        <Alert status={alertStatus} mt={4}>
          <AlertIcon />
          <AlertTitle>{alertMessage}</AlertTitle>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
          <Text as="b" fontSize="3xl" my="1rem">
            Register An Account
          </Text>
          <form onSubmit={onSubmit}>
            <FormControl
              id="username"
              isInvalid={!!errors.username}
              width="700px"
            >
              <Inputs
                type="text"
                placeHolder="Enter Username"
                values="username"
                title="Enter Username"
                register={register}
                errors={errors}
                rules={{
                  required: "Username is Required!!!",
                }}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
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
            <FormControl
              id="password"
              isInvalid={!!errors.password}
              width="700px"
            >
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
                rules={{
                  required: "Password is Required!!!",
                }}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="confirmPassword"
              isInvalid={!!errors.confirmPassword}
              width="700px"
            >
              <Inputs
                type={confirmPassword ? "text" : "password"}
                placeHolder="Enter Password"
                values="confirmPassword"
                title="Confirm Password"
                setConfirmPassword={setConfirmPassword}
                confirmPassword={confirmPassword}
                askPassword={true}
                onClick={handleClicked}
                register={register}
                errors={errors}
                rules={{
                  required: "Password is Required!!!",
                  validate: (val: string) => {
                    if (watch("password") !== "") {
                      if (watch("password") !== val) {
                        return "Password does not match";
                      }
                    }
                  },
                }}
              />
              <FormErrorMessage>
                {errors.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
            <ReusableButton action="Register" isLoading={isSubmitting} type="submit"/>
          </form>
        </Box>
        </Flex>
    </>
  );
}