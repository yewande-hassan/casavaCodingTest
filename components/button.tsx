import { Button } from '@chakra-ui/react'
import React from 'react'
type ButtonType = "button" | "submit" | "reset";
interface buttonDetails{
 action: string;
 isLoading?: any;
 type: ButtonType;
}
function ReusableButton({action,isLoading,type}:buttonDetails) {
  return (
    <Button
    mt={4}
    mr={4}
    colorScheme="teal"
    isLoading={isLoading}
    type={type}
  >
    {action}
  </Button>
  )
}

export {ReusableButton}