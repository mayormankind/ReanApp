import React, { useContext, useRef, useEffect, useState } from 'react';
import { useColorMode, Text, Image, Flex, Avatar } from '@chakra-ui/react';
import ImageViewer from './ImageViewer';
import { Context } from '../../api/Context';
import { ChatContext } from '../../api/ChatContext';

export default function Message({message,owner}) {
  const { data } = useContext(ChatContext);
  const [ view, setViewImage ] = useState(false);
  const [ image, setImage ] = useState(false);
  const { user } = useContext(Context);
  const refr = useRef();

  useEffect(()=>{
    refr.current?.scrollIntoView({behaviour:'smooth'})
  },[message])

  const view_Image = (image) =>{
    setViewImage(true);
    setImage(image)
  }

  // const checkType=(file)=>{
  //   if(file.type === 'image'){
  //     return <Image src={file} onClick={()=>view_Image(message.mfile)} alt={'image'} w='50%'/>
  //   }
  //   if(file.type === 'document'){
  //     return <Image src={file} onClick={()=>view_Image(message.mfile)} alt={'image'} w='50%'/>
  //   }
  //   if(file.type === 'video'){
  //     return <Video src={file} onClick={()=>view_Image(message.mfile)} alt={'video'} w='50%'/>
  //   }
  // } 
  return (
    <Flex flexDir={owner==='sender'&&'row-reverse'} ref={refr} gridGap='10px'>
      <Flex flexDir='column' gap='5px' w='80%' alignItems={owner=='sender' ? 'flex-end' : 'flex-start'} >
        <Text as='span' mb='-10px'>{message.time}</Text>
        <Text as='p' borderRadius={owner=='sender' ? '10px 0 10px 10px' : '0 10px 10px 10px'} w='fit-content' bg={owner === 'receiver' ? 'lightgr' : 'greentext'} p='5px 10px' fontSize='small'>{message.message}</Text>
        {message.mfile && <Image src={message.mfile} onClick={()=>view_Image(message.mfile)} alt={'image'} w={{sm:'50%',base:'80%'}} h='100%'/>
        }
      </Flex>
      {view && <ImageViewer pImage={image} setViewImage={setViewImage} setImage={setImage}/>}
    </Flex>
  )
}
