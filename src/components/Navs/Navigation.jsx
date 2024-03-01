import { Flex} from '@chakra-ui/react';
import React from 'react'
import Header from './Header';
import Navbar from './Navbar';

function Navigation({ click, display }) {
  return (
    <Flex w='100%' boxShadow={'0 0 2px 2px rgba(0,0,0,0.2)'} display={{sm:display,base:''}} pos={{sm:'sticky',base:'initial'}} top='0' zIndex='50' bg={'whitesmoke'} p={{sm:'10px 0',base:'0'}}>
        <Flex p={{sm:'0',base:'10px'}} w='100%' maxW='1100px' align='center' justify='space-between' mx='auto'>
            <Header/>
            <Navbar click={click}/>
        </Flex>
    </Flex>
  )
}

export default Navigation;
