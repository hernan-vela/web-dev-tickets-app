import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

/**
 * Here, no need to define the Interface for this function, because 'PropsWithChildren' already takes care of this task 
 */

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if(!children) return null;
  
  return(
    <Text color='red' as='p' className='pb-3'>{children}</Text>
  )
}

export default ErrorMessage;