import React, { useState } from 'react'
import { PageWrapper } from '../chakra/Styles'
import { Avatar, Flex, IconButton, Text, Button } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { CopyIcon, PhoneIcon, SettingsIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import { LocationCity } from '@mui/icons-material';

export default function Profile() {
  const [role, setRole ] = useState('Company');

  const handleCopy= () =>{
    toast.success('Phone Number copied successfully!')
  }
  return (
    <PageWrapper activeLink={'Profile'}>
        <Flex m='auto' flexDir='column' h='100vh' w='100%' bg='greenBg' overflowY='scroll' gap='10px'>
          <Flex color='white' p='10px' pos='sticky' top='0' align='center' justify='space-between' bg='greenBg' zIndex='1000'>
            <Flex align='center' gap='10px'>
              <Avatar src='' boxSize='50px'/>
              <Flex flexDir='column'>
                <Text fontSize='lg'>Hi, Makinde Mayowa</Text>
                <Text>Role: {role}</Text>
              </Flex>
            </Flex>
            <IconButton icon={<SettingsIcon/>} variant='ghost' fontSize='24px'/>
          </Flex>
          <Button leftIcon={<LocationCity/>} variant='solid'>Block 12,Simsons Road, California, Usa.</Button>
          <Flex mb='40px' p='0 20px'>
            <Button as='a' leftIcon={<PhoneIcon/>} bg='white' borderRadius='30px' href='tel:+2347040829383' color='textGreen' p='5px 10px'>+2347040829383</Button>
            <Button leftIcon={<CopyIcon/>} variant='solid' onClick={handleCopy}>Copy</Button>
          </Flex>
          <Flex bg='white' borderTopRadius={'50px'} p='20px'>
            <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea voluptatem sint totam fuga mollitia nobis perspiciatis id ducimus neque veritatis tenetur eos eaque laboriosam animi nesciunt accusamus atque consequuntur, dolorum soluta magnam sed. Autem recusandae atque labore modi vero soluta voluptates, aliquid tempore temporibus commodi unde eos officia, itaque nostrum! Iusto aliquid saepe mollitia sed veritatis harum. Nulla, eligendi adipisci? Natus iure ipsa deserunt. Illo voluptatem nihil sapiente tempore quisquam consectetur repellendus ab amet autem quibusdam delectus asperiores fuga ratione pariatur commodi dolor sequi, qui laborum, maiores at atque aut neque animi! Unde doloremque, necessitatibus quam distinctio ab laboriosam ipsa consectetur accusamus sint ea? Nihil, veniam inventore! Voluptatem omnis inventore ut. Aliquam voluptates reiciendis autem optio at doloribus maxime ducimus neque consectetur alias porro pariatur quis, modi nemo reprehenderit? Nulla fuga officia placeat repellat sit quos sequi cumque corrupti minima ex? Corporis quidem perferendis, rem esse neque culpa quod praesentium, exercitationem ipsam nisi consequatur dicta, accusamus earum. Vero id iusto nostrum neque, aliquid modi maxime veniam possimus culpa voluptatem, nobis sunt, deleniti eaque blanditiis consequuntur alias. Quos unde quas architecto eum excepturi temporibus quia assumenda aperiam repudiandae natus molestias quasi sequi autem ab, fugit laboriosam officiis nobis. Doloremque beatae necessitatibus delectus quidem cupiditate, magni sequi, nesciunt enim similique consequatur cumque, dolores exercitationem facilis. Recusandae blanditiis possimus illum. A quam delectus itaque ut, minima iste asperiores quo eius officiis omnis quasi ipsam numquam magnam sint. Quibusdam modi, nemo ipsa autem quo nostrum qui, veritatis quisquam laboriosam voluptas iure. Dignissimos quis itaque fugit unde ducimus eligendi? Minima ullam repudiandae eius deleniti cumque harum numquam in aspernatur! Sapiente quod asperiores iusto aspernatur voluptas sit assumenda harum. Incidunt, harum fugiat iste ab, non quisquam architecto nulla libero voluptatum facere, dignissimos itaque magnam. Nam minima, non eaque alias error deserunt dolore cum quam odit natus aut doloribus blanditiis pariatur aliquam eligendi facere dicta consectetur. Fugit expedita cum similique. Beatae assumenda eum incidunt, maiores alias illo tempore! Quidem dolores mollitia rerum maxime quam delectus quae officia iure ullam minus possimus, blanditiis esse harum velit voluptate sint iste ad atque magnam quis aliquam reiciendis? Dolorem ullam fugiat sit aliquid? Deserunt veritatis, accusamus culpa nihil aut quis repellat, exercitationem vel tenetur ea eius neque cum? Beatae nesciunt tempora suscipit sapiente alias exercitationem aliquam nulla. Quibusdam non nesciunt qui quod accusamus, nobis ducimus animi excepturi! Placeat explicabo odio nobis velit fuga corrupti ab rerum ex nobis placeat repellendus quibusdam voluptates quo veniam odit, vel at alias. Blan vero sapiente? Quia consequatur rerum totam officia repellendus! Non, consectetur necessitatibus neque maxime labore velit quasi fuga illo voluptas ad expedita similique harum enim laudantium quasi incidunt, fugiat quaerat totam provident. Ea?</Text>
          </Flex>
        </Flex>
    </PageWrapper>
  )
}
