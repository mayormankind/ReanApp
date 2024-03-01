import React, { useState } from 'react';
import { Grid,Box } from '@chakra-ui/react';
import Chatbox from '../components/Chat/Chatbox';
import Sidebar from '../components/Chat/Sidebar';

export default function Chat() {
  const [ menu, setMenu ] = useState(false);
  const [back, setBack] = useState(false);

  return (
    <Box w='100%' h='100vh'>
      <Grid w={'100%'} h='100%' mx='auto' gridTemplateColumns={{sm:'35% 65%',base:'100%'}}>
      <Box display={{sm:'flex',base:!back ? 'flex' : 'none'}} h='100%' maxH='100vh'>
        <Sidebar setBack={setBack}/>
      </Box>
      <Box h='100%' maxH='100vh' display={{sm:'flex',base:back ? 'flex' : 'none'}}>
        <Chatbox setBack={setBack}/>
      </Box>
      </Grid>
    </Box>
  )
}