import { Button } from '@chakra-ui/react'
import React from 'react'
interface buttonDetails{
 action: string
 isLoading?: any
 type: any
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

export default ReusableButton