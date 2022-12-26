import React, { useEffect, useState } from 'react';
import TemplatePage from '../TemplatePage'
import { BasicTable } from '../BasicTable'; 
import { GetAllVehiclesSold } from '../../services/FirestoreService'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const tableColumns = [
  {
    Header: "Veiculo",
    accessor: "name"
  },
  {
    Header: "Marca",
    accessor: "marca"
  },
  {
    Header: "Modelo",
    accessor: "modelo"
  },
  {
    Header: "Vendedor",
    accessor: "vendedor"
  },
  {
    Header: "Comprador",
    accessor: "cliente"
  },
  {
    Header: "Preço",
    accessor: "preco"
  },
  {
    Header: "",
    accessor: "action"
  }
];

function DataTable() {

  let [vehicleItem, setVehicleItem] = useState()
  const allVehicles = GetAllVehiclesSold()

  useEffect(() => {
    if(allVehicles){
      const vehicleData = allVehicles.map(function(item){
        return {
          id: item.id,
          marca: item.category,
          modelo: item.title,
          preco: item.price,
          imageSrc: item.imageSrc,
          cliente: item.clientName,
          vendedor: item.sellerName,
          oldId: item.oldId
        }
      });
      setVehicleItem(vehicleData)
    }
  },[allVehicles])
 
  if(vehicleItem){
    const tableData = vehicleItem.map((item) => 
      (
        { name: (
          <Flex align="center">
            <Avatar name={item.category} src={item.imageSrc} size="xl" mr="4" bgColor={'white'}/>
            <Text color={'white'}>{item.category}</Text>
          </Flex>
        ),
        id: item.id,
        marca: item.marca,
        modelo: item.modelo,
        preco: item.preco,
        imageSrc: item.imageSrc,
        cliente: item.cliente,
        vendedor: item.vendedor
      }
      )
    );
    return (
      <Box maxBlockSize="600px">
        <BasicTable tableColumns={tableColumns} userData={vehicleItem} title="Lista de Veiculos Vendidos" tableData={tableData} type="vehiclesSold"/>  
      </Box>
    )
  }
  return null
}
export default function Collaborators() {
  return (
    <TemplatePage conteudo={<DataTable />}/> 
  );
}