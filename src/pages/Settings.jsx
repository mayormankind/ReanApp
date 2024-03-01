import { Button, Flex, Heading, IconButton, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Settings() {

  const [ deleteAccount, setDelete ] = useState(false);
  const [ showModal, setShowModald ] = useState(false);
  const navigate =  useNavigate();

  const deactivate = () =>{
    console.log(`account has been successfully deactivated`);
    navigate('/login')
  }

  return (
    <Flex flexDir='column' w='100%' h='100%'>
      <Flex align='center' pos='sticky' top='0' w='100%' bg='darkslategray' p={{sm:'5px 20px',base:'5px'}} gap={{sm:'30px',base:'10px'}}>
        <IconButton icon={<ArrowBackIcon/>} variant='ghost' onClick={()=>navigate('/menu')}/>
        <Heading>Settings</Heading>
      </Flex>
      <Flex w='100%' maxW='1000px' m='auto' flexDir='column' justify='space-between' gap='40px' p='15px' h='100%'>
        <Flex className='changePassword' flexDir='column' gap='20px' w={{sm:'50%',base:'100%'}} alignSelf={'flex-end'} boxShadow='xl' p='20px'>
          <Heading as='h3'>Change password</Heading>
          <Flex flexDir='column' gap='10px'>
            <Input placeholder='Old password' type='password' variant='solid'/>
            <Input placeholder='New password' type='password' variant='solid'/>
            <Input placeholder='Confirm new password' type='password' variant='solid'/>
            <Button variant='customSolid'>Save password</Button>
          </Flex>
          <Text></Text>
        </Flex>
        <Flex className='deleteAccount' flexDir='column' gap='20px' w={{sm:'50%',base:'100%'}} alignSelf={'flex-end'} boxShadow='xl' p='20px'>
          <Heading>Delete Account</Heading>
          <Flex flexDir='column'>
            <Text>Clicking this button means you agree to deleting your account.</Text>
            <Text fontWeight='bold'>Note: this action is irreversible.</Text>
          </Flex>
          <Button variant='outline' borderColor={'red'} onClick={()=>setDelete(true)}>Delete account</Button>
        </Flex>
      </Flex>
      {deleteAccount && <Flex w='100%' h='100%' pos='fixed' top='0' left='0' right='0' bottom='0' bg='transbg'>
        <Flex flexDir='column' gap='20px' p='20px' bg='white' boxShadow='lg' w='100%' maxW='400px' m='auto'>
          <Text color='black' fontWeight='bold'>Are you sure you want to deactivate this account?</Text>
          <Button variant={'customOutlined'} color='black' onClick={()=>setDelete(false)}>No</Button>
          <Button colorScheme='red' onClick={deactivate}>Yes</Button>
        </Flex>
      </Flex>}
    </Flex>
  )
}
