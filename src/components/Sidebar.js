import React, { useEffect, useState } from 'react'
import {
    Flex,
    Text,
    Divider,
    Avatar,
    Heading,
    Button,
} from '@chakra-ui/react'
import {
    FiHome,
    FiBriefcase,
    FiDollarSign
} from 'react-icons/fi'
import { AiOutlineCar, AiOutlineUsergroupDelete } from "react-icons/ai";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IsAuthenticatedAdmin } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const navigate = useNavigate()
    const [navSize] = useState("large")
    let [name, setName] = useState('')
    let [role, setRole] = useState('')
    const userData = IsAuthenticatedAdmin()
    
    const handleLogout = () => {
      sessionStorage.removeItem('auth');
      sessionStorage.removeItem('Uid');
      sessionStorage.removeItem('Avatar');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('client');
      navigate('/login')
    }

    useEffect(() => {
        if(userData !== false){
            setName(userData.name?.toString().split(" "))
            const role = userData.role?.toString()
            setRole(role[0].toUpperCase() + role.substring(1))
        }
    },[userData])

    return (
        <Flex
            background={"white"}
            pos="sticky"
            left="5"
            h="100%"
            minH="600px"
            minW="190px"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius="30px"
            w="200px"
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
            >
                    <Button leftIcon={<FiHome />} colorScheme='facebook' variant='ghost' marginTop={"20px"} h={'50px'} onClick={(e) => navigate('/dashboard')}>
                            Dashboard
                    </Button>
                    <Button leftIcon={<AiOutlineCar />} colorScheme='facebook' variant='ghost' marginTop={"20px"} h={'50px'} onClick={(e) => navigate('/vehicles')}>
                            Estoque
                    </Button>
                    <Button leftIcon={<FiDollarSign />} colorScheme='facebook' variant='ghost' marginTop={"20px"} h={'50px'} onClick={(e) => navigate('/sales')}>
                            Vendas
                    </Button>
                    <Button leftIcon={<AiOutlineUsergroupDelete />} colorScheme='facebook' variant='ghost' marginTop={"20px"} h={'50px'} onClick={(e) => navigate('/customers')}>
                            Clientes
                    </Button>
            </Flex>
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src={sessionStorage.getItem('Avatar')} />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{name[0]+" "+name[1]}</Heading>
                        <Flex marginTop="10px">
                            <Text color="gray">{role}</Text>
                            <Button size='xs' rightIcon={<ExitToAppIcon />} colorScheme='teal' variant='outline' marginLeft='10px' marginBottom="10px" onClick={(e) => handleLogout()}>
                                Sair
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Divider display={navSize === "small" ? "none" : "flex"} />
                {role === 'Admin' && (
                    <Button leftIcon={<FiBriefcase />} colorScheme='facebook' variant='ghost' marginTop="20px" onClick={(e) => navigate('/colaborattors')}>
                            Colaboradores
                    </Button>
                )}        
            </Flex>
        </Flex>
    )
}