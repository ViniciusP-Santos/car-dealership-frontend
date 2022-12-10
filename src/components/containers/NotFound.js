import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

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
      <Heading as='h2' size='3xl' noOfLines={1} color="white">
        ERROR 404
      </Heading>
      <Text variant="h6" fontSize='3xl' style={{ color: 'white' }}>
        Esta pagina não existe! Aperte o botão para voltar!
      </Text>
      <Button colorScheme='teal' size='md' onClick={(e) => navigate("/")}>Back Home</Button>
    </Flex>
  );
}