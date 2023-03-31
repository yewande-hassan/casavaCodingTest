import { Text,Box,Alert, AlertIcon, FormControl, FormErrorMessage, Flex, CloseButton, AlertTitle } from '@chakra-ui/react'
import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import {ReusableButton, Inputs} from '../components';
import { useRouter } from "next/router";
import { authService } from '../service';

function Login() {
  type FormData = {
    email: string;
    password: string;
  };  

  const {
    formState: { errors},
    handleSubmit,
    register,
  } = useForm<FormData>({
    mode: "onBlur",
  });
  const router = useRouter()
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<any>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [disabled, setDisabled] =useState<boolean>(false)
  const handleClick = () => setShowPassword(!showPassword);

  const resetAlert = () => {
    setAlertMessage("");
    setAlertStatus("");
  };

  const onSubmit = handleSubmit(async (values) => {
    setDisabled(true)
    const { email, password } = values;

    authService.login(email,password)
    .then((res)=>{
      if(res.status >= 400){
        throw new Error("Unable to Login user");
      }
      return res.json()
    }).then((user)=>{
      setAlertMessage('Login user successfully')
      setAlertStatus('success')
      router.push('/home')
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
              isLoading={disabled}
              type="submit"
            />
          </form>
        </Box>
      </Flex>
    </>
  );
}

export default Login