import React from 'react'
import { PageWrapper } from '../chakra/Styles'
import { Flex, Text } from '@chakra-ui/react'
import { NewspaperOutlined } from '@mui/icons-material'

export default function News() {
  return (
    <PageWrapper>
        <Flex w='100%' h='100%'>
            <Flex flexDir='column' m='auto' align={'center'}>
                <NewspaperOutlined/>
                <Text>Page not available yet</Text>
            </Flex>
        </Flex>
    </PageWrapper>
  )
}
