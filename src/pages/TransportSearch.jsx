import React from 'react'
import { PageWrapper } from '../chakra/Styles'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { EmojiTransportationOutlined } from '@mui/icons-material'

export default function TransportSearch() {
  return (
    <PageWrapper activeLink={'Transport'}>
        <Flex m='auto' flexDir='column'>
            <IconButton icon={<EmojiTransportationOutlined style={{fontSize:'30px'}}/>} color='textGreen' variant='ghost'/>
            <Text color={'gray'}>Search</Text>
        </Flex>
    </PageWrapper>
  )
}
