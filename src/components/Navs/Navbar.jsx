import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { Chat, ChatOutlined, EmojiTransportation, EmojiTransportationOutlined, Home, HomeOutlined, Menu, MenuOutlined, Message, Newspaper, NewspaperOutlined, Notifications, NotificationsOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { FaUser, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
function Navbar({click,navAct}) {

    const navs = [
        {
            tabname: 'Home',
            path:'/',
            id: 1,
            filled: <Home/>,
            outline: <HomeOutlined/>
        },
        {
            tabname: 'Transport',
            path: '/search',
            id: 5,
            filled: <EmojiTransportation/>,
            outline: <EmojiTransportationOutlined/>
        },
        {
            tabname: 'News',
            path:'/news',
            id: 3,
            filled: <Newspaper/>,
            outline: <NewspaperOutlined/>
        },
        {
            tabname: 'Chat',
            path:'/chat',
            id: 4,
            filled: <Chat/>,
            outline: <ChatOutlined/>
        },
        {
            tabname: 'Profile',
            path: '/profile',
            id: 2,
            filled: <FaUser/>,
            outline: <FaUserAlt/>
        },
  
    ];
  return (
    <Flex w={'100%'} zIndex='50' bg={'whitesmoke'} h={'50px'} pos={{sm:'initial',base:'fixed'}} bottom={{sm:null,base:'0'}} left='0' right='0' boxShadow={{sm:'none',base:'0 -2px 5px 0px rgba(0,0,0,0.2)'}} align='center' justify='space-around' p='10px' flex={'0.4'}>
        {navs.map(nav=>(
            <Link to={nav.path} key={nav.id}>
                <Flex flexDir='column' h='fit-content' align={'center'}>
                    <IconButton size='15px' icon={nav.tabname === click ? nav.filled : nav.outline} color={nav.tabname === click ? 'textGreen' : 'gray'} fontSize='20px' variant='ghost' arial-label={nav.tabname}/>
                    <Text fontSize='xs' color={nav.tabname === click ? 'textGreen' : 'gray' }>{nav.tabname}</Text>
                </Flex>
            </Link>
        ))}
    </Flex>
  )
}
export default Navbar;