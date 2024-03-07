import { Button, Flex, Heading, IconButton, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getAuth, updatePassword, deleteUser } from "firebase/auth";
import { toast } from 'react-toastify';

export default function Settings() {

  const auth = getAuth();
  const [ deleteAccount, setDelete ] = useState(false);
  const [ oldPassword, setOldPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ confPassword, setConfPassword ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ error, setError ] = useState({});
  const navigate =  useNavigate();
  const user = auth.currentUser;

  const validate = ()=>{
    let errors = {}
    if(!oldPassword) errors.oldPassword = 'Old password field is empty';
    if(!newPassword) errors.newPassword = 'New Password field is empty';
    if(!confPassword) errors.confPassword = 'Confirm password is empty';
    if(confPassword != newPassword ) errors.notEqual = 'New password must be the same with confirm password';
    
    setError(errors)
    return Object.keys(errors).length === 0;
  }

  const changePassword = () =>{
    if(validate()){
      updatePassword(user, newPassword).then(() => {
        toast.success('Password update was successful');
      }).catch((error) => {
        toast.error('An error ocurred')
      });
    }
  }

  const deactivate = () =>{
    deleteUser(user).then(() => {
      toast.success('User accout has been deleted');
      navigate('/login')
    }).catch((error) => {
      toast.error("An error occurred");
    });
  }

  return (
    <Flex flexDir='column' w='100%' h='100%'>
      <Flex align='center' pos='sticky' top='0' w='100%' bg='darkslategray' p={{sm:'5px 20px',base:'5px'}} gap={{sm:'30px',base:'10px'}}>
        <IconButton icon={<ArrowBackIcon/>} variant='ghost' onClick={()=>navigate('/profile')}/>
        <Heading>Settings</Heading>
      </Flex>
      <Flex w='100%' maxW='1000px' m='auto' flexDir='column' justify='space-between' gap='40px' p='15px' h='100%'>
        <Flex className='changePassword' flexDir='column' gap='20px' w={{sm:'50%',base:'100%'}} alignSelf={'flex-end'} boxShadow='xl' p='20px'>
          <Heading as='h3'>Change password</Heading>
          {error.notEqual ? <Text color='red'>{error.notEqual}</Text> : null}
          <Flex flexDir='column' gap='10px'>
            <Input placeholder='Old password' type='password' variant='solid' onChange={(e)=>setOldPassword(e.target.value)}/>
            {error.oldPassword ? <Text color='red'>{error.oldPassword}</Text> : null}
            <Input placeholder='New password' type='password' variant='solid' onChange={(e)=>setNewPassword(e.target.value)}/>
            {error.newPassword ? <Text color='red'>{error.newPassword}</Text> : null}
            <Input placeholder='Confirm new password' type='password' variant='solid' onChange={(e)=>setConfPassword(e.target.value)}/>
            {error.confPassword ? <Text color='red'>{error.confPassword}</Text> : null}
            <Button variant='customSolid' onClick={changePassword}>Save password</Button>
          </Flex>
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
