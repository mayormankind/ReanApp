import { Flex } from '@chakra-ui/react';
import React from 'react';
import { HeadLogo } from '../../chakra/Styles';

export default function Header() {
  return (
    <Flex bg='whitesmoke' pos={{sm:'initial',base:'fixed'}} top={{sm:'initial',base:'0'}} left={{sm:'initial',base:'0'}} w='100%' boxShadow={{sm:'none',base:'lg'}} h='50px' p={{sm:'0',base:'0 10px'}} flex={'0.6'} zIndex='50'>
        <HeadLogo/>
    </Flex>
  )
}