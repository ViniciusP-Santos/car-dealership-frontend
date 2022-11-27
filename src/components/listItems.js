import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';

//Icons Admin
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import { IsAuthenticatedAdmin, isAuthenticated } from '../services/auth'

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Vendas" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Estoque" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = () => {
console.log(IsAuthenticatedAdmin())

  if(isAuthenticated){
    return (
      <React.Fragment>
        <ListSubheader component="div" inset>
          Administrativo
        </ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <SupervisorAccountOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Colaboradores" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PaymentsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Financeiro" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ArticleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Documentação" />
        </ListItemButton>
      </React.Fragment>
    )
  }else{
    return null;
  }
 };