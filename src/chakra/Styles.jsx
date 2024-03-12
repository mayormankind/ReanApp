 import React from 'react';
import { Box,VStack,Button,Text,Flex, Avatar, useColorMode, List, Heading, Grid, keyframes, Icon, IconButton, Spinner } from '@chakra-ui/react';
import Navigation from '../components/Navs/Navigation';
import { FaSun } from 'react-icons/fa';
import { ArrowBackIcon, PhoneIcon } from '@chakra-ui/icons';
import { Mail } from '@mui/icons-material';
  
export function Logbox({children}) {
  return (
    <Flex w='100%' bg='white' h='100vh' borderRadius='20px'>
      <Flex maxW={'800px'} w='100%' h='95%' m='auto'>
            {children}
      </Flex>
    </Flex>
  )
}


export const PageWrapper = ({children,activeLink,HeaderDisplay,pos }) =>{
  return(
    <Box w='100%' bg={'white'} borderRadius={{sm:'10px',base:'0'}}>
      <Navigation click={activeLink} display={HeaderDisplay}/>
      <Flex flexDir='column' h='100vh' w='100%' py={{sm:'0',base:'35px'}} overflowY={'scroll'} pos={{sm:pos,base:'initial'}} top='100px' sx={{'&::-webkit-scrollbar': { width: '0 !important' }}} borderRadius={{sm:'10px',base:'0'}}>
        {children}
      </Flex>
    </Box>
  )
}

export const About = ({ setModalDisplay }) =>{
  return(
    <Flex w='100%' bg={'rgba(0,0,0,0.6'} pos='fixed' top='0' bottom='0' left='0' right='0'>
      <Flex m='auto' w='100%' maxW='600px' flexDir='column' overflowY={'scroll'} p='30px' bg='white' pos='relative' gap='20px'>
        <Button pos='absolute' top='0' left='20px' leftIcon={<ArrowBackIcon/>} variant='ghost' onClick={()=>setModalDisplay('')}>Back</Button>
        <Heading color='greentext'>About REAN</Heading>
        <Flex textAlign={'justify'}>
          <Text>Rean is driven toward saving mother nature. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate temporibus voluptatem ea autem unde ipsa saepe aliquid quod nulla, magnam odit doloribus molestiae. Ut qui sit recusandae, eligendi earum iusto vero error dolore ratione provident natus eius reprehenderit non quidem maiores consectetur laborum exercitationem ipsa quae aliquam at doloribus. Quis quia non at praesentium sunt nisi culpa nobis aliquam? Rerum vitae veritatis repellendus unde ratione quis ea magnam placeat exercitationem itaque impedit eligendi minima voluptatem id reiciendis eveniet, temporibus repellat consequatur debitis dignissimos quaerat inventore ipsa. Repudiandae in voluptatum tempora consectetur cumque. Consequuntur optio quae nesciunt architecto, at voluptatum modi minima qui, dolore quasi excepturi a quibusdam expedita veniam adipisci nemo! Vero, quod numquam? Velit, sit laudantium eius facere dolore eos maiores ea non aliquid fugit rerum ducimus excepturi nam dicta. Maiores aperiam minus architecto atque et pariatur laboriosam deserunt eum explicabo facere deleniti ducimus optio illum, velit provident asperiores cumque, ad ut, magnam consequuntur voluptatem. Possimus provident, quod nihil cumque iste excepturi aspernatur recusandae cupiditate ipsa perferendis non, a doloribus. Sit, accusamus dignissimos obcaecati ipsam enim asperiores eligendi eos amet magnam error autem? Aliquid dolorum delectus ea unde consequuntur reiciendis omnis at. Incidunt, rerum quo sapiente iure enim suscipit!</Text>
        </Flex>
      </Flex>      
    </Flex>
  )
}

export function TruncateText({ text, maxLength, color }){
  const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  return(
    <Text fontSize='small' color={color}>{truncated}</Text>
  )
}

export const Policy = ({ setModalDisplay }) =>{
  return(
    <Flex w='100%' bg={'rgba(0,0,0,0.6'} pos='fixed' top='0' bottom='0' left='0' right='0'>
      <Flex m='auto' w='100%' maxW='600px' flexDir='column' overflowY={'scroll'} p='30px' bg='white' pos='relative' gap='20px'>
        <Button pos='absolute' top='0' left='20px' leftIcon={<ArrowBackIcon/>} variant='ghost' onClick={()=>setModalDisplay('')}>Back</Button>
        <Heading color='greentext'>Our Policies</Heading>
        <Flex textAlign={'justify'}>
          <Text>Rean is driven toward saving mother nature. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate temporibus voluptatem ea autem unde ipsa saepe aliquid quod nulla, magnam odit doloribus molestiae. Ut qui sit recusandae, eligendi earum iusto vero error dolore ratione provident natus eius reprehenderit non quidem maiores consectetur laborum exercitationem ipsa quae aliquam at doloribus. Quis quia non at praesentium sunt nisi culpa nobis aliquam? Rerum vitae veritatis repellendus unde ratione quis ea magnam placeat exercitationem itaque impedit eligendi minima voluptatem id reiciendis eveniet, temporibus repellat consequatur debitis dignissimos quaerat inventore ipsa. Repudiandae in voluptatum tempora consectetur cumque. Consequuntur optio quae nesciunt architecto, at voluptatum modi minima qui, dolore quasi excepturi a quibusdam expedita veniam adipisci nemo! Vero, quod numquam? Velit, sit laudantium eius facere dolore eos maiores ea non aliquid fugit rerum ducimus excepturi nam dicta. Maiores aperiam minus architecto atque et pariatur laboriosam deserunt eum explicabo facere deleniti ducimus optio illum, velit provident asperiores cumque, ad ut, magnam consequuntur voluptatem. Possimus provident, quod nihil cumque iste excepturi aspernatur recusandae cupiditate ipsa perferendis non, a doloribus. Sit, accusamus dignissimos obcaecati ipsam enim asperiores eligendi eos amet magnam error autem? Aliquid dolorum delectus ea unde consequuntur reiciendis omnis at. Incidunt, rerum quo sapiente iure enim suscipit!</Text>
        </Flex>
      </Flex>      
    </Flex>
  )
}

export const Questions = ({ setModalDisplay }) =>{
  return(
    <Flex w='100%' h='100%' bg={'rgba(0,0,0,0.6'} pos='fixed' top='0' bottom='0' left='0' right='0' p='10px 0'>
      <Flex m='auto' w='100%' maxW='600px' flexDir='column' overflowY={'scroll'} p='30px' bg='white' gap='20px' pos='relative'>
        <Button pos='absolute' top='0' left='20px' leftIcon={<ArrowBackIcon/>} variant='ghost' onClick={()=>setModalDisplay('')}>Back</Button>
        <Heading color='textGreen'>Security Questions</Heading>
        <Flex textAlign={'justify'}>
          <Text>Rean is driven toward saving mother nature. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate temporibus voluptatem ea autem unde ipsa saepe aliquid quod nulla, magnam odit doloribus molestiae. Ut qui sit recusandae, eligendi earum iusto vero error dolore ratione provident natus eius reprehenderit non quidem maiores consectetur laborum exercitationem ipsa quae aliquam at doloribus. Quis quia non at praesentium sunt nisi culpa nobis aliquam? Rerum vitae veritatis repellendus unde ratione quis ea magnam placeat exercitationem itaque impedit eligendi minima voluptatem id reiciendis eveniet, temporibus repellat consequatur debitis dignissimos quaerat inventore ipsa. Repudiandae in voluptatum tempora consectetur cumque. Consequuntur optio quae nesciunt architecto, at voluptatum modi minima qui, dolore quasi excepturi a quibusdam expedita veniam adipisci nemo! Vero, quod numquam? Velit, sit laudantium eius facere dolore eos maiores ea non aliquid fugit rerum ducimus excepturi nam dicta. Maiores aperiam minus architecto atque et pariatur laboriosam deserunt eum explicabo facere deleniti ducimus optio illum, velit provident asperiores cumque, ad ut, magnam consequuntur voluptatem. Possimus provident, quod nihil cumque iste excepturi aspernatur recusandae cupiditate ipsa perferendis non, a doloribus. Sit, accusamus dignissimos obcaecati ipsam enim asperiores eligendi eos amet magnam error autem? Aliquid dolorum delectus ea unde consequuntur reiciendis omnis at. Incidunt, rerum quo sapiente iure enim suscipit!</Text>
        </Flex>
        <Flex flexDir='column' gap='10px'>
          <Text fontWeight='bold'>For more questions, you can reach out to our customer line: </Text>
          <Flex>
            <IconButton icon={<PhoneIcon/>} color='textGreen'/>
            <IconButton icon={<Mail/>} color='textGreen'/>
          </Flex>
        </Flex>
      </Flex>      
    </Flex>
  )
}

export const Loading = () =>{
  return(
    <Flex m='auto' align='center' flexDir='column'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='textGreen' size='xl'/>
      <Text>Please wait...</Text>
    </Flex>
  )
}

export const UserPageButton = ({ icon, label, detail }) =>{
  return(
    <Flex flexDir='column' w='100%' p='10px 20px'>
      <Flex align='center' gap='20px' color='greenBg'>
        {icon}
        <Text>{label}</Text>
      </Flex>
      <Text fontSize='sm' color='gray'>{detail}</Text>
    </Flex>
  )
}

export const HeadLogo = () =>{

  const sunAnimation= keyframes`
    0%{ transform:scale(1)};
    50%{ transform:scale(2)};
    100%{ transform:scale(1)};
  `;
  return(
    <Flex align='center'>
      <IconButton icon={<FaSun/>} variant='ghost' color='textYellow' fontSize='30px' animation={`${sunAnimation} 1s linear infinite`}/>
      <Text as='h1' my='auto' fontSize='25px' color='textGreen' fontWeight='bold' >REAN</Text>
    </Flex>
  )
}