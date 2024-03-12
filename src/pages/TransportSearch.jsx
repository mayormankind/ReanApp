import React, { useContext, useState } from 'react'
import { PageWrapper } from '../chakra/Styles'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { UserContext } from '../api/UserContext';
import Manufacturer from './Manufacturer';
import Trucker from './Trucker';

export default function TransportSearch() {

  const {activeUser} = useContext(UserContext);

  return (
    <PageWrapper activeLink={'Transport'}>
      {activeUser?.role === 'manufacturer' ? <Manufacturer/> : <Trucker/>}
    </PageWrapper>
  )
}
