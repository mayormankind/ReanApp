import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import { MailOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Header from '../components/Navs/Header';

export default function PasswordReset() {
    const [ mail, setMail ] = useState('');

    const getLink = () =>{
        if(mail===undefined || mail === ''){
            toast.error('Field cannot be empty')
        }else{
            toast.success(`A reset link has been sent to ${mail}`)
        }
    }
  return (
    <Flex bg='lightgray' h='100vh'>
        <Header/>
        <Flex m='auto'  flexDir='column' gap={'20px'} maxW='400px' w='100%' p='15px'>
            <Heading>Password Reset</Heading>
            <Flex flexDir='column' gap='20px'>
                <InputGroup size='lg' bg='white' borderRadius='30px'>
                    <InputLeftElement color='greentext'><MailOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                    <Input variant='solid' placeholder='Recovery email..' type='email' borderRadius='30px' fontSize='small' onChange={(e)=>setMail(e.target.value)} required/>
                </InputGroup>
                <Button onClick={getLink} variant='customSolid'>Reset Password</Button>
            </Flex>
        </Flex>
    </Flex>    
  )
}
