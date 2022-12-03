import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { SecondaryListItems, MainListItems } from './listItems';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import { Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';

export default function TemplatePage(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('Uid');
    navigate('/login')
}

  return (
    <>
      <Flex as="header" position="fixed"  w="100%">
        <Spacer />
        <ButtonGroup gap='2'>
          <Button rightIcon={<ExitToAppIcon />} color='white' variant='outline' marginRight='20px' onClick={(e) => handleLogout()}>
            Sair
          </Button>
        </ButtonGroup>
      </Flex>
      <Sidebar/>
      {props.childrean}
    </>      
  );
}
