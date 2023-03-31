import Head from 'next/head'
import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Text, Box, Flex, FormControl,FormErrorMessage,Alert,AlertIcon,AlertTitle,CloseButton,} from "@chakra-ui/react"
import {ReusableButton,Inputs} from '../components'
import { useRouter } from "next/router";
import { authService } from '../service';


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
    formState: { errors},
  } = useForm<RegisterFormData>();

  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertStatus, setAlertStatus] = useState<any>()
  const handleClick = () => setShowPassword(!showPassword);
  const handleClicked = () => setConfirmPassword(!confirmPassword);
  const [disabled, setDisabled] =useState<boolean>(false)
  const resetAlert = () => {
    setAlertMessage("");
    setAlertStatus("");
  };
  const onSubmit = handleSubmit((values) => {
    setDisabled(true)
    const {email,username,password}=values
    authService.register(username,email,password)
    .then((res)=>{
        if(res.status >= 400){
          throw new Error("Unable to register user");
        }
        return res.json()
      }).then((user)=>{
        setAlertMessage('Registered user successfully')
        setAlertStatus('success')
        router.push('/login')
      })
      .catch((e)=>{
        const defaultMessage = 'An error occurred. Please try again later.'
        setAlertMessage(e.message || defaultMessage)
        setAlertStatus("error")
        setTimeout(() => {
          resetAlert()
        }, 2000);
      })
       .finally(()=>
      setDisabled(false)
      )
  });
  return (
    <>
      <Head>
        <title>Casava Coding Test</title>
      </Head>
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
            <ReusableButton
              action="Register"
              isLoading={disabled}
              type="submit"
            />
          </form>
        </Box>
      </Flex>
    </>
  );
}