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
  import { FiTrash2, FiUser } from "react-icons/fi";

export const BasicTable = (props) => {
    const [page, setPage] = useState(1);

    let tableColumns = props.tableColumns
    let users = props.userData

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
        action: (
          <Button
            colorScheme="red"
            onClick={() => console.log("remove user!")}
            size="sm"
          >
            <Icon as={FiTrash2} fontSize="20" />
          </Button>
        )
    }));
    return (
        <Box p="12">
          <Heading size="sm" as="h3" color="white">
            Lista de Colaboradores
          </Heading>
    
          <Box mt="6" color="white">
            <Table
              colorScheme="blue"
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