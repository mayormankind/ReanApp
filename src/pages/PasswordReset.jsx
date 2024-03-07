import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, VStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { MailOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Header from '../components/Navs/Header';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function PasswordReset() {
    const [ recoveryMail, setRecoveryMail ] = useState('');
    const navigate = useNavigate();
    const [ error, setError ] = useState({});
    const auth = getAuth();

    const validate = () =>{
        let errors = {};

        if(!recoveryMail) errors.recoveryMail = 'The recovery mail field cannot be empty';
        setError(errors)
        return Object.keys(errors).length === 0;
    }


    
    const getLink = () =>{
        if(validate()){
            sendPasswordResetEmail(auth, recoveryMail)
              .then(() => {
                  toast.success(`A reset link has been sent to ${recoveryMail}`)
                  navigate('/login');
              })
              .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
              });
        }
    }
  return (
    <Flex w='100%' h='100vh' bg='containerbg'>
        <Header/>
        <Flex m='auto' flexDir='column' gap={'20px'} maxW='400px' w='100%' p='15px'>
            <Heading>Password Reset</Heading>
            <Flex flexDir='column' gap='20px'>
                <InputGroup size='lg' bg='white' borderRadius='30px'>
                    <InputLeftElement color='greentext'><MailOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                    <Input variant='solid' placeholder='Recovery email..' type='email' borderRadius='30px' fontSize='small' value={recoveryMail} onChange={(e)=>setRecoveryMail(e.target.value)} required/>
                </InputGroup>
                {error.recoveryMail ? <Text color='red'>{error.recoveryMail}</Text> : null}
                <Button onClick={getLink} variant='customSolid'>Reset Password</Button>
            </Flex>
        </Flex>
    </Flex>    
  )
}
