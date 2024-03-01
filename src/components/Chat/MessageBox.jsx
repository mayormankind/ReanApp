import { Flex, Box,Text, IconButton, useColorMode, Input, Button, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { RiAttachmentLine, RiSendPlaneFill, RiTimerLine } from 'react-icons/ri';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { ChatContext } from '../../api/ChatContext';
import { Context } from '../../api/Context';
import { store, db } from '../../api/firebase';
import AttachmentBox from './AttachmentBox';

export default function MessageBox({attach,setAttach,asset,setAsset}) {
  const [ message, setMessage ] = useState('');
  const [ fileType, setType ] = useState('image');
  const { data } = useContext(ChatContext);
  const { user } = useContext(Context);
  const {colorMode, toggleColorMode} =useColorMode();
  const isDark = colorMode == 'dark';
  const sendMessage = async() =>{
    if(asset){
      if(asset.type === 'image/gif' || asset.type ==='image/jpeg' || asset.type ==='image/png' || asset.type ==='image/JFIF' || asset.type ==='image/jfif' || asset.type === 'image/PNG'){
        setType('image')
      }
      else if(asset.type === 'video/mp4' || asset.type ==='video/webm' || asset.type ==='video/ogg'){
        setType('video')
      }
      else if(asset.type === '.pdf' || asset.type ==='.xls' || asset.type ==='.xlsx' || asset.type ==='.doc' || asset.type ==='.docx'){
        setType('document')
      }
      const assetRef = ref(store,uuid());
      const uploadTask = uploadBytesResumable(assetRef,asset)
      uploadTask.on(
        (err)=>{},
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(assetURL)=>{
            await updateDoc(doc(db,'chats',data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                message,
                senderId: user.uid,
                mfile: assetURL,
                fileType: fileType,
                date: Timestamp.now()
              })
            })
          })
        })
    }else{
      await updateDoc(doc(db,'chats',data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          message,
          senderId: user.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db,'userChats',user.uid),{
      [data.chatId + '.lastMessage']: {message},
      [data.chatId + '.date']: serverTimestamp(),
    })
    
    await updateDoc(doc(db,'userChats',data.user.uid),{
      [data.chatId + '.lastMessage']: {message},
      [data.chatId + '.date']: serverTimestamp(),
    })
    setMessage('')
    setAsset('')
  }

  {asset && console.log(asset.type,fileType)}
  return (
    <Flex p='10px' h='10%' w='100%' bg={isDark ? 'black' : 'white'} boxShadow={'lg'}>
      <Flex align='center' w='100%' h='100%'>
        <input type='file' id='file' style={{display:'none'}} onChange={(e)=>setAsset(e.target.files[0])}/>
        <InputGroup size='lg' bg={isDark ? '#4d4d4d':'lightgray'} borderRadius='20px'>
          <InputLeftElement color='greentext' cursor='pointer' fontSize='20px' htmlFor='file' title='attachments' onClick={(e)=>setAttach(true)}><RiAttachmentLine/></InputLeftElement>
          <Input type='text' variant='solid' placeholder='Message Here...' fontSize='small' w='100%' borderRadius='20px' bg={isDark ? '#4d4d4d':'lightgray'} onChange={(e)=>setMessage(e.target.value)} value={message}/>
          <InputRightElement w='fit-content'>
            <Button variant='customSolid' borderRadius='20px' rightIcon={<RiSendPlaneFill/>} isDisabled={!message ? true : false} onClick={sendMessage}>Send</Button>
          </InputRightElement>
        </InputGroup>
        
      </Flex>
    </Flex>
  )
}