 import React from 'react';
import { Box,VStack,Button,Text,Flex, Avatar, useColorMode, List, Heading, Grid, keyframes, Icon, IconButton, Spinner } from '@chakra-ui/react';
import Navigation from '../components/Navs/Navigation';
import { FaSun } from 'react-icons/fa';
  
export function Logbox({children}) {
  return (
    <Flex w='100%' bg='#323232' h='100vh'>
      <Flex maxW={'800px'} w='100%' h='95%' m='auto'>
            {children}
      </Flex>
    </Flex>
  )
}


export const PageWrapper = ({children,activeLink,HeaderDisplay,pos }) =>{
  return(
    <Box w='100%' bg={'white'} borderRadius={{sm:'10px',base:'0'}}>
      <Navigation click={activeLink} display={HeaderDisplay}/>
      <Flex flexDir='column' h='100vh' w='100%' py={{sm:'0',base:'35px'}} overflowY={'scroll'} pos={{sm:pos,base:'initial'}} top='100px' sx={{'&::-webkit-scrollbar': { width: '0 !important' }}} borderRadius={{sm:'10px',base:'0'}}>
        {children}
      </Flex>
    </Box>
  )
}

export const Loading = () =>{
  return(
    <Box m='auto'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='textGreen' size='xl'/>
      <Text>Please wait...</Text>
    </Box>
  )
}

export const HeadLogo = () =>{
  return(
    <Flex align='center'>
      <IconButton icon={<FaSun/>} variant='ghost' color='textYellow' fontSize='30px'/>
      <Text as='h1' my='auto' fontSize='25px' color='textGreen' fontWeight='bold' >REAN</Text>
    </Flex>
  )
}