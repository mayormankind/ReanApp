import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { Cancel } from '@mui/icons-material';
import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { profileUpdate } from '../../functions/index';
import { Context } from '../../functions/Context';

function UserProfileDetails({setIsEdit,profileInfo,getInputs}) {
    const { user } = useContext(Context);
    const updateProfile = () =>{
        profileUpdate(user,user.uid,profileInfo)
        setIsEdit(false);
        console.log(profileInfo)
    }
  return (
    <Flex bg='rgba(0,0,0,0.6)' pos={'fixed'} top='0' left='0' w='100%' h='100%' zIndex={'100'} p={{sm:'0', base:'0 10px'}} justify='center' align='center'>
        <Flex gap='20px' flexDir='column' h='90%' w='100%' maxW={'500px'}>
            <IconButton icon={<Cancel/>} onClick={()=>setIsEdit(false)}/>
            <Flex flexDir={'column'} gap='10px' w='100%' h='100%' overflowY='scroll' bg='whitesmoke' p='20px'>
                <Box color='black'>
                    <label style={{color:'black'}}>Username</label>
                    <input type={'text'} placeholder={'Makinde Mayowa'} onChange={getInputs} name='username' required style={{height:'50px', padding:'0 10px', width:'100%',border:'2px solid black'}} value={profileInfo?.displayName}/>
                </Box>
                <Box color='black'>
                    <label style={{color:'black'}}>About Yourself</label>
                    <input type={'text'} placeholder={'I am a cute naughty guy who seeks ....'} onChange={getInputs} name='bio' required style={{height:'50px', padding:'0 10px', width:'100%',border:'2px solid black'}} value={profileInfo?.bio}/>
                </Box>
                <Box color='black'>
                    <label style={{color:'black'}}>Occupation</label>
                    <input type={'text'} placeholder={'Lawyer in the making'} onChange={getInputs} name='occupation' required style={{height:'50px', padding:'0 10px', width:'100%',border:'2px solid black'}} value={profileInfo?.occupation}/>
                </Box>
                <Box color='black'>
                    <label style={{color:'black'}}>Phone Number</label>
                    <input type={'text'} placeholder={'+2347070707066'} onChange={getInputs} name='phone' required style={{height:'50px', padding:'0 10px', width:'100%',border:'2px solid black'}} value={profileInfo?.phone}/>
                </Box>
                <Box color='black'>
                    <label style={{color:'black'}}>Location</label>
                    <input type={'text'} placeholder={'Nigeria, Ibadan'} onChange={getInputs} name='city' required style={{height:'50px', padding:'0 10px', width:'100%',border:'2px solid black'}} value={profileInfo?.city}/>
                </Box>
                <Box color='black'>
                    <label style={{color:'black'}}>Date of Birth</label>
                    <input type={'date'} onChange={getInputs} name='dob' required style={{height:'50px', padding:'0 10px', width:'100%',border:'2px solid black'}} value={profileInfo?.dob}/>
                </Box>
                <Box color='black'>
                    <label style={{color:'black'}}>Hobbies</label>
                    <input type={'text'} placeholder={'Singing, Dancing, Playing Games etc.'} onChange={getInputs} name='hobbies' required style={{height:'50px', padding:'0 10px', width:'100%',border:'2px solid black'}} value={profileInfo?.hobbies}/>
                </Box>
                <Button onClick={updateProfile} bg='green.400' h='60px'>Save Profile</Button>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default UserProfileDetails;
