import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import { Button, ButtonGroup, Flex, Spacer, Stack } from '@chakra-ui/react';

export default function TemplatePage(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('Uid');
    navigate('/login')
  }

  return (
    <Flex margin="20px">
      <Flex as="header" position="fixed"  w="100%" marginLeft="-20px">
        <Spacer />
        <ButtonGroup gap='2'>
          <Button rightIcon={<ExitToAppIcon />} color='white' variant='outline' marginRight='20px' onClick={(e) => handleLogout()}>
            Sair
          </Button>
        </ButtonGroup>
      </Flex>
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
