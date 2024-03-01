import { Flex, Text, Box, Avatar, IconButton, Input, Button } from '@chakra-ui/react';
import React,{ useState } from 'react';
import { RiCameraFill, RiCloseFill, RiFile4Fill, RiLink, RiVideoFill } from 'react-icons/ri';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';

export default function AttachmentBox({setAttach, setAsset}) {
    const formats =[
        {id:0,label:'Picture',icon:<RiCameraFill/>,valid:'image/gif, image/jpeg, image/png, image/JFIF, image/jfif, image/PNG'},
        {id:1,label:'Video', icon:<RiVideoFill/>,valid:'video/mp4, video/webm, video/ogg'},
        {id:2,label:'Document',icon:<RiFile4Fill/>,valid:'.pdf, .xls, .xlsx, .doc, .docx'},
        {id:3,label:'Link',icon:<RiLink/>,valid:''},
    ]

    const handleEvent = (e) =>{
        setAsset(e.target.files[0]);
        setAttach(false);
    }
  return (
      <Flex w='100%' h='100vh' pos='fixed' bg='rgba(0,0,0,0.6)' top='0' left='0'>
        <IconButton icon={<RiCloseFill/>} variant='ghost' pos='absolute' top='20px' right='20px' color='white' fontSize='30px' onClick={()=>setAttach(false)}/>
        <Flex w='100%' justify='space-around' maxW='300px' m='auto'>
            {formats.map(tab=>(
                <Flex flexDir='column' p='5px' align='center' _hover={{bg:'blackAlpha.500'}} cursor='pointer' as='label' htmlFor={tab.label} title={tab.label}>
                    <IconButton icon={tab.icon} variant='ghost' fontSize='24px'/>
                    <Text as='strong'>{tab.label}</Text>
                    <Input type='file' id={tab.label} style={{display:'none'}} accept={tab.valid} onChange={handleEvent}/>
                </Flex>
            ))}
        </Flex>
      </Flex>
  )
}