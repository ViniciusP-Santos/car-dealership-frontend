import React from 'react';

import TemplatePage from '../TemplatePage';
// import Logo from '../../assets/logo.png'
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

export function DashboardContent() {
  return(
    <h1>Livia Gabriela é a mulher mais linda do mundo!</h1>
  );
}
export default function  Dashboard() {
  return (
    <TemplatePage conteudo={<DashboardContent />} name={'Dashboard'}></TemplatePage>
  );
}