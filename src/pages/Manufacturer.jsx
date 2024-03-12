import { ArrowBackIcon, SearchIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, IconButton } from '@chakra-ui/react'
import React from 'react'
import { EmojiTransportationOutlined } from '@mui/icons-material'
import { UserPageButton } from '../chakra/Styles'

export default function Manufacturer() {
  return (
    <Flex flexDir='column' h='100%' w='100%' bg='#e9e9e9'>
        <Flex pos='sticky' top='0' gap='30px' p='10px' align='center' color='white'>
            <IconButton icon={<ArrowBackIcon/>} color='black'/>
            <Heading fontSize='lg'>Manufacturer's Page</Heading>
        </Flex>
        <Flex w='100%' p='20px'> 
            <Flex flexDir='column' gap='20px' bg='white' boxShadow='lg' w='100%'>
                <UserPageButton icon={<SearchIcon/>} label={'Find a Trucker'} detail={'Add details about the solar panels you want to recycle'}/>
                <UserPageButton icon={<SearchIcon/>} label={'Make a request'} detail={'Make a request to possible truckers'}/>
                <UserPageButton icon={<SearchIcon/>} label={'View request Status'} detail={'Show details and status of submitted recycling requests'}/>
            </Flex>
        </Flex>
    </Flex>
  )
}
