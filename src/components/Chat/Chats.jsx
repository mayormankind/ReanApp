import React,{ useContext, useEffect, useState } from 'react';
import { Flex, Text, Box, Avatar, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ImageViewer from './ImageViewer';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { Context } from '../../api/Context';
import { ChatContext } from '../../api/ChatContext';

export default function Chats({setBack}) {
    const {colorMode} =useColorMode();
    const isDark = colorMode == 'dark';
    const [ viewImage, setViewImage ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ chats, setChats ] = useState([]);
    const { user } = useContext(Context)
    const { dispatch } = useContext(ChatContext)
    const view_Image = (image) =>{
        setViewImage(true);
        setImage(image)
    }

    useEffect(()=>{
        const FetchChats = () =>{
            const unsub = onSnapshot(doc(db,'userChats',user.uid),(doc)=>{
                setChats(doc.data())
            });
            return ()=>{
                unsub()
            }
        }
        {user.uid && FetchChats()}
    },[user.uid])

    const chatUser = (theUser) =>{
        dispatch({type: 'SWITCH_USER', payload: theUser})
        setBack(true)
    }

  return (
    <Flex flexDir='column' h='80%' w='100%' >
        {chats && chats.length == 0 ? <Text m='auto' fontSize='20px'>No chats added yet</Text> : 
        chats && Object.entries(chats)?.sort((a,b) =>b[1].date - a[1].date).map((chat)=>(
            <Flex align='center' gap='10px' key={chat[0]} justify='space-between' p='10px' _hover={{bg:'blackAlpha.300'}} cursor='pointer' _focus={'blackAlpha.200'} transition='0.5'>
                <Avatar src={chat[1].Info.photoURL} boxSize='50px' cursor='pointer' onClick={()=>view_Image(chat[1].Info.photoURL)}/>
                <Box w='100%' onClick={()=>chatUser(chat[1].Info)}>
                    <Text fontWeight='semibold' textTransform='capitalize'>{chat[1].Info.displayName}</Text>
                    {chat[1].lastMessage?.message &&<Text>{chat[1].lastMessage?.message}</Text>}
                </Box>
            </Flex>
        ))}
        {viewImage && <ImageViewer pImage={image} setImage={setImage} setViewImage={setViewImage}/>}
    </Flex>
  )
}
