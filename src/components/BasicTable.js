import React, { useState } from "react";
import { Table } from "react-chakra-pagination";
import {
    Flex,
    Avatar,
    Text,
    Box,
    Icon,
    Button,
    Heading
  } from "@chakra-ui/react";
  
  // Recommended for icons
import { FiTrash2, FiUser, FiEdit2 } from "react-icons/fi";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../services/firebaseUtils";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const db = getFirestore(app)

export const BasicTable = (props) => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1);

    let tableColumns = props.tableColumns
    let users = props.userData

    const handleDelete = async (id) => {
      await deleteDoc(doc(db, "users", id))
      toast.success('Usuario deletado com Sucesso!')
    }

    const handleEdit = (user) => {
      sessionStorage.setItem('user',JSON.stringify(user))
      navigate('/update-collaborators')
    }

    const tableData = users.map((user) => ({
        name: (
          <Flex align="center">
            <Avatar name={user.name} src={user.avatar_url} size="sm" mr="4" bgColor={'white'}/>
            <Text color={'white'}>{user.name}</Text>
          </Flex>
        ),
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        id: user.id,
        action: (
          <Flex>
          <Button
            colorScheme="yellow"
            onClick={(e) => handleEdit(user)}
            size="sm"
          >
            <Icon as={FiEdit2} fontSize="20" />
          </Button>
          <Button
            marginLeft="10px"
            colorScheme="red"
            onClick={(e) => handleDelete(user.id)}
            size="sm"
          >
            <Icon as={FiTrash2} fontSize="20" />
          </Button>
          </Flex>
        )
    }));
    return (
        <Box p="12">
          <Heading size="sm" as="h3" color="white">
            Lista de Colaboradores  
          </Heading>
          <ToastContainer/>
          <Box mt="6" color="white">
            <Table
              colorScheme="teal"
              // Fallback component when list is empty
              emptyData={{
                icon: FiUser,
                text: "Nenhum Colaborador Registrado!"
              }}
              totalRegisters={users.length}
              page={page}
              // Listen change page event and control the current page using state
              onPageChange={(page) => setPage(page)}
              columns={tableColumns}
              data={tableData}
            />
          </Box>
        </Box>
    );
}  