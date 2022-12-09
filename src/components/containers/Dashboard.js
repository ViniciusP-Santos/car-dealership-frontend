import { Text } from '@chakra-ui/react';
import React from 'react';

import TemplatePage from '../TemplatePage';
// import Logo from '../../assets/logo.png'
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

export function DashboardContent() {
  return(
    <Text color="white">Bem vindo ao dashboard</Text>
  );
}
export default function  Dashboard() {
  return (
    <TemplatePage conteudo={<DashboardContent/>}/> 
  );
}