import { useColorMode, Avatar, Button, VStack, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../functions/Context'
import { UserContext } from '../../functions/UserContext';

export default function DesktopProfile() {
  const {colorMode} = useColorMode();
  const isDark = colorMode == 'dark';
  const { user } = useContext(Context);
  const { activeUser } = useContext(UserContext);
  return (
      <VStack w='100%' h={'100%'} maxH='60vh' borderRadius={'10px'} textAlign={'center'} bg={isDark ? '#121212' : 'white'} p={'25px 10px'} spacing='7' pos='sticky' top='100px'>
        <Avatar mx='auto' boxSize='70px' src={user.photoURL}/>
        <VStack mx='auto' spacing='20px'>
          <Heading fontSize='1.6rem'>{user?.displayName}</Heading>
          <Text as='p'>{activeUser?.bio ? activeUser?.bio : ''}</Text>
          <Button color={isDark ? 'white' :'black'} variant={'customOutlined'}><Link to={`/profile/${user.uid}`}>View Profile</Link></Button>
        </VStack>
      </VStack>
  )
}