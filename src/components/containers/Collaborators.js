import React, { useEffect, useState } from 'react';
import TemplatePage from '../TemplatePage'
import { BasicTable } from '../BasicTable'; 
import { GetAllCollaborators } from '../../services/FirestoreService'
import { nivelFormat } from '../../helpers/collaboratorsHelpers'
import { Button } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
// const textColor = useColorModeValue("gray.700", "white")

const tableColumns = [
  {
    Header: "Nome",
    accessor: "name"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Telefone",
    accessor: "phoneNumber"
  },
  {
    Header: "Nivel",
    accessor: "role"
  },
  {
    Header: "",
    accessor: "action"
  }
];

function DataTable() {
  const navigate = useNavigate()
  let [collaboratorsItem, setCollaboratorsItem] = useState()
  const collaborators = GetAllCollaborators()

  useEffect(() => {
    if(collaborators){
      const collaboratorsData = collaborators.map(function(item){
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          phoneNumber: item.phoneNumber,
          role: nivelFormat(item.role),
          avatar_url: item.avatar_url
        }
      });
      setCollaboratorsItem(collaboratorsData)
    }
  },[collaborators])

  if(collaboratorsItem){
    return (
      <div>
        <Button 
          leftIcon={<AiOutlinePlus />} 
          colorScheme='blue' 
          variant='outline' 
          onClick={(e) => navigate('/register')}
          marginLeft="45px"
          >
          Adicionar Colaborador
        </Button>
        <BasicTable tableColumns={tableColumns} userData={collaboratorsItem}/>
      </div>
    )
  }
  return null
}
export default function Collaborators() {
  return (
    <TemplatePage conteudo={<DataTable />}/> 
  );
}