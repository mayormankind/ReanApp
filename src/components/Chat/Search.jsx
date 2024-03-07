import { Box, Flex, Text, Button, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import Userblock from './Userblock';
import { RiSearchLine } from 'react-icons/ri';
import ImageViewer from './ImageViewer';
import { FaArrowLeft } from 'react-icons/fa';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { SearchIcon } from '@chakra-ui/icons';

export default function Search({setSearch}) {
  const [ loading, setLoading ] =  useState(true)
  const [ queryS, setQuery ] = useState('');
  const [ userS, setUserS ] = useState(null);
  const [ users, setUsers ] = useState([]);
  const [ viewImage, setViewImage ] = useState(false);
  const [ image, setImage ] = useState('');
  const userRef = collection(db,'users');
  const [ active, setActive ] = useState('Trucker');

  useEffect(()=>{
    onSnapshot(userRef,(snapshot)=>{
      setUsers(
        snapshot.docs.map((docs) =>{
          return { ...docs.data() };
        })
      );
    })
  },[])

  const searchQuery = (data) =>{
    return data.filter(person=>
      person.displayName.toLowerCase().includes(queryS) || person.email.toLowerCase().includes(queryS))
  }

  return (
    <Flex h='100%' w='100%' bg={'rgba(0,0,0,0.6)'} pos='fixed' top='0' left='0' zIndex='200' color='black'>
      <Flex w='100%' maxW={{sm:'500px',base:'100%'}} h={{sm:'600px',base:'100%'}} flexDir='column' m='auto' bg='white'>
        <Flex p='10px' pos='sticky' top='0' justify='center' align='center'>
          <IconButton ml='-10px' fontSize='22px' onClick={()=>setSearch(false)} color='black' icon={<FaArrowLeft/>} variant={'ghost'}/>
          <InputGroup size='lg' borderRadius={'20px'} borderColor='greentext'>
            <InputLeftElement color='greentext'><SearchIcon/></InputLeftElement>
            <Input type='text' placeholder='Make your search here...' w='100%' fontSize='xs' onChange={(e)=>setQuery(e.target.value)} value={queryS} borderRadius={'20px'}/>
          </InputGroup>
        </Flex>
        <Box h='80%' w='100%' overflowY={'scroll'}>
          <Flex flexDir='column' gap='5px' w='100%'>
            <Flex w='100%' h='100%'>
              <Button borderBottom={ active==='Trucker' && '5px solid green' } variant={'ghost'} w='100%' onClick={()=>setActive('Trucker')}>Trucker</Button>
              <Button w='100%' borderBottom={ active!='Trucker' && '5px solid green' } variant={'ghost'} onClick={()=>setActive('Manufacturer')}>Manufacturer</Button>
            </Flex>
            {users && searchQuery(users).length == 0 ?
            (<Flex w='100%' h='100%'>
              <Text fontWeight='semibold' m='auto' textAlign='center'>No results available for your search!!</Text>
            </Flex>) : 
            (users && searchQuery(users).map(user=>(
              <Box key={user.uid}>
                <Userblock image={user.photoURL} displayName={user.displayName} email={user.email} id={user.uid} setImage={setImage} setViewImage={setViewImage} setSearch={setSearch} userS={userS} setUserS={setUserS}/>
              </Box>
            )))}
          </Flex>
        </Box>
        {viewImage && <ImageViewer pImage={image} setImage={setImage} setViewImage={setViewImage}/>}
      </Flex>
    </Flex>
  )
}