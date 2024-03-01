import React,{ useContext, useState } from 'react';
import { Box, Flex, Text, IconButton, Avatar, useColorMode, Heading } from '@chakra-ui/react';
import Chats from './Chats';
import { RiSearchLine, RiHome2Line } from 'react-icons/ri';
import Search from './Search';
import { Link } from 'react-router-dom';
import { Context } from '../../api/Context';
import { HeadLogo } from '../../chakra/Styles';

export default function Sidebar({setBack}){
    const [ search,setSearch ] = useState(false);
    const { user } = useContext(Context);
    const Navs = [
        {id:0,navLabel:'Search',path:'/search', icon: <RiSearchLine/>}
    ]
    
    return(
        <Flex h='100%' w='100%' maxH='100vh'>
            <Box w='100%' h='100%'>
                <Flex align='center' justify='space-between' w='100%' p='10px' h='10%' boxShadow='lg'>
                    <HeadLogo/>
                    <Flex>
                        <Link to='/'>
                            <IconButton icon={<RiHome2Line/>} variant={'ghost'} fontSize={'24px'}/>
                        </Link>
                        <IconButton icon={<RiSearchLine/>} variant={'ghost'} fontSize={'24px'} onClick={()=>setSearch(!search)}/>
                    </Flex>
                    <Link to='/profile'>
                        <Avatar src={user.photoURL} boxSize='30px'/>
                    </Link>
                </Flex>
                <Chats setBack={setBack}/>
            </Box>
            {search && <Search setSearch={setSearch}/>}
        </Flex>
    )
}