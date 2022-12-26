import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';

import Logo from '../../assets/logo.png'

import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate()
  return (
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
      <Heading as='h2' size='3xl' noOfLines={1} color="white">
        ERROR 404
      </Heading>
      <Text variant="h6" fontSize='3xl' style={{ color: 'white' }}>
        Pagina não encontrada! Aperte o botão para voltar!
      </Text>
      <Button colorScheme='teal' size='md' onClick={(e) => navigate("/")}>Back Home</Button>
    </Flex>
  );
}