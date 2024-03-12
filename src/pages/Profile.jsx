import React, { useContext, useState } from 'react'
import { PageWrapper, Loading, About, Policy, Questions } from '../chakra/Styles'
import { Avatar, Flex, IconButton, Text, Button } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { CopyIcon, PhoneIcon, SettingsIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import { LocationCity, Logout, Mail } from '@mui/icons-material';
import { UserContext } from '../api/UserContext';
import { Context } from '../api/Context';
import { SignOut } from '../api';
import { Link, Navigate, useNavigate} from "react-router-dom";



export default function Profile() {
  const [role, setRole ] = useState('Company');
  const [ modalDisplay, setModalDisplay ] = useState('');
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const { activeUser } = useContext(UserContext)
  const handleCopy= () =>{
    toast.success('Phone Number copied successfully!')
  }
  const logout = () =>{
    SignOut();
    navigate('/login');
  }
  return (
    <PageWrapper activeLink={'Profile'}>
        <Flex m='auto' flexDir='column' h='100vh' w='100%' bg='greenBg' overflowY='scroll' gap='10px'>
          <Flex color='white' p='10px' pos='sticky' top='0' align='center' justify='space-between' bg='greenBg' zIndex='1000'>
            <Flex align='center' gap='10px'>
              <Avatar src={activeUser?.photoURL} boxSize='50px'/>
              <Flex flexDir='column'>
                <Text fontSize='lg'>Hi, {activeUser?.displayName}</Text>
                <Text textTransform='capitalize'>Role: {activeUser?.role}</Text>
              </Flex>
            </Flex>
            <Link to='/settings'>
              <IconButton icon={<SettingsIcon/>} variant='ghost' fontSize='24px'/>
            </Link>
          </Flex>
          {/* <Flex p='0 20px'>
            <Button as='a' leftIcon={<Mail/>} bg='white' borderRadius='30px' href={`mailto:${activeUser?.email}`} color='textGreen' p='5px 10px'>{activeUser?.email}</Button>
          </Flex>
          <Flex p='0 20px'>
            <Button leftIcon={<LocationCity/>} p='5px 20px' variant='solid'>Block 12,Aloba Street, Nigeria.</Button>
          </Flex>
          <Flex mb='40px' p='0 20px'>
            <Button as='a' leftIcon={<PhoneIcon/>} bg='white' borderRadius='30px' href={`tel:${activeUser?.poc}`} color='textGreen' p='5px 10px'>{activeUser?.poc}</Button>
            <IconButton icon={<CopyIcon/>} variant='ghost' onClick={handleCopy}/>
          </Flex> */}
          <Flex flexDir='column' bg='white' borderTopRadius={'50px'} p='20px' gap='10px'>
            <Text>Rean is driven toward saving mother nature. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate temporibus voluptatem ea autem unde ipsa saepe aliquid quod nulla, magnam odit doloribus molestiae. Ut qui sit recusandae, eligendi earum iusto vero error dolore ratione provident natus eius reprehenderit non quidem maiores consectetur laborum exercitationem ipsa quae aliquam at doloribus. Quis quia non at praesentium sunt nisi culpa nobis aliquam? Rerum vitae veritatis repellendus unde ratione quis ea magnam placeat exercitationem itaque impedit eligendi minima voluptatem id reiciendis eveniet, temporibus repellat consequatur debitis dignissimos quaerat inventore ipsa.</Text>
            <Flex flexDir='column' gap='5px'>
              <Button color='greenBg' onClick={()=>setModalDisplay('questions')}>Security Question</Button>
              <Button color='greenBg' onClick={()=>setModalDisplay('questions')}>Settings</Button>
              <Button color='greenBg' onClick={()=>setModalDisplay('about')}>About Rean</Button>
              <Button color='greenBg' onClick={()=>setModalDisplay('policy')}>Users policy and Agreements</Button>
              <Button color='greenBg'><Link to='/settings'>Settings</Link></Button>
              <Button color='red' leftIcon={<Logout/>} onClick={logout}>Signout</Button>
            </Flex>
          </Flex>
        </Flex>
        {modalDisplay=='about' && <About setModalDisplay={setModalDisplay}/>}
        {modalDisplay=='questions' && <Questions setModalDisplay={setModalDisplay}/>}
        {modalDisplay=='policy' && <Policy setModalDisplay={setModalDisplay}/>}
    </PageWrapper>
  )
}
