import { Flex, Text, Box, Avatar, IconButton, useColorMode } from '@chakra-ui/react';
import React,{ useState, useContext } from 'react';
import { RiGridFill } from 'react-icons/ri';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';
import MessageBox from './MessageBox';
import Messages from './Messages';
import { ChatContext } from '../../api/ChatContext';
import AttachmentBox from './AttachmentBox';

export default function Chatbox({setBack}) {
  const { data } = useContext(ChatContext);
  const [ attach, setAttach ] = useState(false);
  const [ asset, setAsset ] = useState('');
  return (
      <Box h='100%' w='100%' flexDir='column'>
        <Flex bg={'white'} align='center' justify='space-between' w='100%' p='10px' h='10%'>
            <IconButton display={{sm:'none',base:'flex'}}  variant='ghost' icon={<FaArrowLeft/>} onClick={()=>setBack(false)}/>
          <Avatar src={data.user?.photoURL} boxSize='40px' mr='10px'/>
          <Box w='100%'>
            <Text textTransform='capitalize'>{data.user?.displayName}</Text>
            <Text fontSize='small' color='gray'>last seen at 3:00 ...</Text>
          </Box>
          <IconButton icon={<RiGridFill/>} variant={'ghost'} fontSize='24px'/>
        </Flex>
        <Messages/>
        <MessageBox attach={attach} setAttach={setAttach} asset={asset} setAsset={setAsset}/>
        {attach && <AttachmentBox attach={attach} setAttach={setAttach} asset={asset} setAsset={setAsset}/>}
      </Box>
  )
}