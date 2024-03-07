import React, { useContext } from 'react'
import { PageWrapper } from '../chakra/Styles'
import { Avatar, Box, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { HomeOutlined } from '@mui/icons-material';
import { UserContext } from '../api/UserContext';


export default function Home() {
  const { activeUser } = useContext(UserContext);

  return (
    <PageWrapper activeLink={'Home'}>
      <Flex flexDir={'column'}>
        <Flex bg='greenBg' w='100%' p='20px' align='center' justify='space-between'>
          <Heading fontSize='lg'>Welcome back, <Text color='white'>{activeUser?.displayName}</Text></Heading>
          <Avatar src={activeUser?.photoURL} boxSize='40px'/>
        </Flex>
        <Flex w='100%' h='100%' pos='relative'>
          <Image src='images/s2.jpeg' w='100%' h='100%'/>
          <Flex w='100%' h='100%' bg='rgba(0,0,0,0.6)' pos='absolute'>
            <Heading m='auto' fontSize='lg' color='white' maxw='70%'>You have nothing to worry about</Heading>
          </Flex>
        </Flex>

      </Flex>
    </PageWrapper>
  )
}
