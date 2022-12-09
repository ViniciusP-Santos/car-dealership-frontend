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
import { AiOutlineCar, AiOutlineAppstoreAdd } from "react-icons/ai";
import { IsAuthenticatedAdmin } from '../services/auth'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    const navigate = useNavigate()
    const [navSize] = useState("large")
    let [name, setName] = useState('')
    let [role, setRole] = useState('')
    const userData = IsAuthenticatedAdmin()

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
            minH={"600px"}
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "200px"}
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
                    <Button leftIcon={<AiOutlineCar />} colorScheme='facebook' variant='ghost' marginTop={"20px"} h={'50px'} onClick={(e) => navigate('/dashboard')}>
                            Veiculos
                    </Button>
                    <Button leftIcon={<AiOutlineAppstoreAdd />} colorScheme='facebook' variant='ghost' marginTop={"20px"} h={'50px'} onClick={(e) => navigate('/dashboard')}>
                            Marketing
                    </Button>
                    <Button leftIcon={<FiDollarSign />} colorScheme='facebook' variant='ghost' marginTop={"20px"} h={'50px'} onClick={(e) => navigate('/dashboard')}>
                            Vendas
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
                        <Text color="gray">{role}</Text>
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