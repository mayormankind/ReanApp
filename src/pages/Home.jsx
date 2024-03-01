import React from 'react'
import { PageWrapper } from '../chakra/Styles'
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { HomeOutlined } from '@mui/icons-material';

export default function Home() {
  return (
    <PageWrapper activeLink={'Home'}>
      <Flex m='auto' flexDir={'column'}>
        <IconButton icon={<HomeOutlined style={{fontSize:'30px'}}/>} color='textGreen' variant='ghost'/>
        <Text >Home</Text>
      </Flex>
    </PageWrapper>
  )
}
