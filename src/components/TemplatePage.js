import React from 'react';
import Sidebar from './Sidebar.js';
import { Flex, Stack } from '@chakra-ui/react';

export default function TemplatePage(props) {
  return (
    <Flex margin="20px">
      <Sidebar/>
      <Stack       
        flexDirection="column"
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        marginInline="auto"
      >
        {props.conteudo}
      </Stack>
    </Flex>      
  );
}
