import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Logo from '../../assets/logo.png'
import { IsAuthenticatedAdmin } from '../../services/auth';

import TemplatePage from '../TemplatePage';

export function DashboardContent() {
  const userData = IsAuthenticatedAdmin()
  let [name, setName] = useState('')

  useEffect(() => {
    if(userData !== false){
        setName(userData.name?.toString())
    }
},[userData])
  return(
    <Flex
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Image src={Logo} marginBottom="50px"/>
      <Text variant="h6" fontSize='3xl' style={{ color: 'white' }}>
        Bem Vindo!
      </Text>
      <Text variant="h6" fontSize='3xl' style={{ color: 'yellow' }}>
        {name}
      </Text>
      
    </Flex>
  );
}
export default function  Dashboard() {
  return (
    <TemplatePage conteudo={<DashboardContent/>}/> 
  );
}