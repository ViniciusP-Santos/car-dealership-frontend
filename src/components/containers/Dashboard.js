import { Text } from '@chakra-ui/react';
import React from 'react';

import TemplatePage from '../TemplatePage';

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