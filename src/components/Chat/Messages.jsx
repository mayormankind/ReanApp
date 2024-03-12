import React, { useContext, useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Message from './Message';
import { ChatContext } from '../../api/ChatContext';
import { Context } from '../../api/Context';
import { db } from '../../api/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Messages() {
  const [ messages, setMessages ] = useState([]);
  const { data } = useContext(ChatContext);
  const { user } = useContext(Context);

  useEffect(() => {
    const unSub = onSnapshot(doc(db,'chats',data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    })
    return () => {
      unSub()
    }
  }, [data.chatId])

  return (
    <Flex gap='10px' flexDir='column' p='10px' w='100%' h='80%' overflowY='scroll'>
      {messages.length==0 ? <Text m='auto'>No messages here</Text> :
      messages.map(message=>(
        <Message message={message} owner={`${message.senderId === user.uid ? 'sender' : 'receiver'}`} key={message.id}/>   
      ))}
    </Flex>
  )
}
