import React, { useEffect, useState } from 'react';
import TemplatePage from '../../TemplatePage'
import { BasicTable } from '../../BasicTable'; 
import { GetAllCollaborators } from '../../../services/FirestoreService'
import { nivelFormat } from '../../../helpers/collaboratorsHelpers'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../../../services/firebaseUtils';
import { toast, ToastContainer } from 'react-toastify';
import { FiTrash2, FiEdit2 } from "react-icons/fi";
const db = getFirestore(app)
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [id, setId] = useState('')

  const navigate = useNavigate()
  
  const handleDelete = async (id) => {
      await deleteDoc(doc(db, "users", id))
      sessionStorage.removeItem('user');
      toast.success('Usuario deletado com Sucesso!')
    onClose()
  }

  const handleEdit = (user) => {
      sessionStorage.setItem('user',JSON.stringify(user))
      navigate('/update-collaborators')
  }

  const deleteUser = (id) => {
    setId(id)
    onOpen()
  }

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
    const tableData = collaboratorsItem.map((item) => 
      (
        { name: (
          <Flex align="center">
            <Avatar name={item.name} src={item.avatar_url} size="sm" mr="4" bgColor={'white'}/>
            <Text color={'white'}>{item.name}</Text>
          </Flex>
        ),
        email: item.email,
        phoneNumber: item.phoneNumber,
        role: item.role,
        endereco: item.endereco,
        cpf: item.cpf,
        birthDate: item.birthDate,
        id: item.id,
        action: (
          <Flex>
          <Button
            colorScheme="yellow"
            onClick={(e) => handleEdit(item)}
            size="sm"
          >
            <Icon as={FiEdit2} fontSize="20" />
          </Button>
          <Button
            marginLeft="10px"
            colorScheme="red"
            onClick={(e) => deleteUser(item.id)}
            size="sm"
          >
            <Icon as={FiTrash2} fontSize="20" />
          </Button>
          </Flex>
        )
      }
      )
    );
    return (
      <Box maxBlockSize="600px">
        <ToastContainer/>
        <Button 
          leftIcon={<AiOutlinePlus />} 
          colorScheme='blue' 
          variant='outline' 
          onClick={(e) => navigate('/register')}
          marginLeft="45px"
          >
          Adicionar Colaborador
        </Button>
        <BasicTable tableColumns={tableColumns} userData={collaboratorsItem} tableData={tableData} type="collaborators"/>
        <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Apagar Colaborador?
                </AlertDialogHeader>

                <AlertDialogBody>
                  Tem certeza que realmente deseja apagar este colaborador?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme='red' onClick={(e) => handleDelete(id)} ml={3}>
                    Apagar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>     
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