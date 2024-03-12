import React, { useContext } from 'react'
import { PageWrapper } from '../chakra/Styles'
import { Avatar, Box, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { HomeOutlined } from '@mui/icons-material';
import { UserContext } from '../api/UserContext';


export default function Home() {
  const { activeUser } = useContext(UserContext);

  return (
    <PageWrapper activeLink={'Home'}>
      <Flex flexDir={'column'} w='100%' h='100%'>
        <Flex bg='white' w='100%' p='10px 20px' align='center' justify='space-between' pos='sticky' top='0' zIndex='10'>
          <Heading fontSize='lg'>Welcome back, {activeUser?.displayName}</Heading>
          <Avatar src={activeUser?.photoURL} boxSize='40px'/>
        </Flex>
        <Flex w='100%' h='100%' pos='relative'>
          <Image src='images/s2.jpeg' w='100%'/>
          <Flex w='100%' h='100%' bg='rgba(0,0,0,0.6)' pos='absolute'>
            <Heading m='auto' fontSize='lg' color='white' maxw='70%'>You have nothing to worry about</Heading>
          </Flex>
        </Flex>
        <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ipsam alias fuga atque in enim, quibusdam adipisci provident mollitia, consequuntur doloremque neque amet necessitatibus libero dolorum est nisi minus ratione, perspiciatis distinctio. Facere accusantium vel maiores quisquam molestias maxime earum eius illum eum cupiditate repudiandae, expedita fuga inventore laborum minus dignissimos numquam nulla, ex doloribus. Repudiandae facere dignissimos quia hic quos, tempore corrupti laboriosam possimus omnis saepe dolorum. At, totam voluptatem delectus esse nobis animi consectetur rem incidunt atque qui aliquid magni id? Quis, blanditiis dolores. Culpa alias aliquam aperiam, dolorum laudantium quod non nesciunt, soluta laborum deleniti, nostrum ea.</Text>
      </Flex>
    </PageWrapper>
  )
}
