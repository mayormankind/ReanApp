import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Flex, Heading, IconButton } from '@chakra-ui/react'
import React from 'react'
import { EmojiTransportationOutlined } from '@mui/icons-material'
import { UserPageButton } from '../chakra/Styles'
import { useNavigate } from 'react-router-dom'

export default function Trucker() {

    const navigate = useNavigate();

  return (
    <Flex flexDir='column' h='100%' w='100%' bg='#e9e9e9' gap='10px'>
        <Flex pos='sticky' p='10px' top='0' gap='30px' bg='white' align='center'>
            <IconButton variant='ghost' icon={<ArrowBackIcon/>} color='black' onClick={()=>navigate('/')}/>
            <Heading fontSize='lg' w='100%'>Trucker's Page</Heading>
        </Flex>
        <Flex w='100%' p='10px'>
            <Flex flexDir='column' bg='white' boxShadow='md' w='100%' borderRadius={'lg'} gap='5px'>
                <UserPageButton icon={<EmojiTransportationOutlined/>} label={'View Available Requests'} detail={'List recycling requests'}/>
                <UserPageButton icon={<EmojiTransportationOutlined/>} label={'View my routes'} detail={'Display accepted and ongoing recycling requests'}/>
            </Flex>
        </Flex>
    </Flex>
  )
}
