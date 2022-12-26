import React, { useState } from "react";
import { Table } from "react-chakra-pagination";
import {
    Box,
    Heading,
} from "@chakra-ui/react";
  
  // Recommended for icons
import { FiUser } from "react-icons/fi";

export const BasicTable = (props) => {
    const [page, setPage] = useState(1);

    let tableColumns = props.tableColumns
    let tableData = props.tableData
    let items = props.userData

    return (
        <Box p="12">
          <Heading size="sm" as="h3" color="white">
            {props.title} 
          </Heading>
          <Box mt="6" color="white">
            <Table
              colorScheme="teal"
              // Fallback component when list is empty
              emptyData={{
                icon: FiUser,
                text: `Nenhum ${props.type === 'client' ? 'Cliente' : 'Colaboradore'} Registrado!`
              }}
              totalRegisters={items.length}
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