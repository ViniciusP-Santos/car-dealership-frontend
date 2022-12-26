import React, { useState } from 'react';
import { FaUserAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import InputMask from "react-input-mask";
import { app } from '../../../services/firebaseUtils'
import { getFirestore, doc, setDoc } from "firebase/firestore";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../../assets/logo.png'

import { Box, Button, chakra, Flex, FormControl, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import TemplatePage from '../../TemplatePage';
import { useNavigate } from 'react-router-dom';
import { InfoIcon } from '@chakra-ui/icons';

const CFaUserAlt = chakra(FaUserAlt);
const PhoneIcon = chakra(BsFillTelephoneFill);
const EmailIcon = chakra(MdEmail);
const MapIcon = chakra(FaMapMarkerAlt);

function Update() {

  const client = JSON.parse(sessionStorage.getItem('client'))

  let [name, setName] = useState(client.name);
  let [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
  let [email, setEmail] = useState(client.email);
  let [address, setAddress] = useState(client.endereco);
  let [birthDate, setBirthDate] = useState(client.birthDate);
  let [cpf, setCpf] = useState(client.cpf);

  const db = getFirestore(app)
  const docRef = doc(db, "clients", client.id);
  const navigate = useNavigate()
  const handleSubmit = () => {

    if(!name){
      toast.error('Campo nome está vazio!')
    }else {
      const data = {
        type: 'clients',
        name,
        email,
        phoneNumber,
        address,
        birthDate,
        cpf
      }
      setDoc(docRef, data)
        .then(docRef => {
            toast.success('Dados atualizados com sucesso!')
            sessionStorage.removeItem('client')
        })
        .catch(error => {
            console.log(error);
        })
        setName('')
        setEmail('')
        setPhoneNumber('')
        setAddress('')
        setBirthDate('')
        setCpf('')
      navigate('/customers')
    }
  };

  return (
    <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
    > 
    <ToastContainer/>
      <Box margin="50px">
        <img src={Logo} alt="Logo CarDealership" width="220"/>
      </Box>
      <Heading color="teal.400">Registro de Clientes</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        <form>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.500" />}
                />
                <Input 
                  type="name" 
                  placeholder="Nome*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<PhoneIcon color="gray.500" />}
                />
                <Input 
                  type="phoneNumber" 
                  as={InputMask}
                  mask="(99) 9 9999-9999"
                  placeholder="Celular*"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.500" />}
                />
                <Input 
                  type="email*" 
                  value={email}
                  placeholder="Endereço de email*"
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<InfoIcon color="gray.500" />}
                />
                <Input 
                  type="cpf" 
                  as={InputMask}
                  mask="999.999.999-99"
                  placeholder="CPF*"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text color="gray.500">Data de Aniversario</Text>
              <Input
                color="gray.500"
                placeholder="Data de Aniversario"
                size="md"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MapIcon color="gray.500" />}
                />
                <Input 
                  type="text" 
                  value={address}
                  placeholder="Endereço*"
                  onChange={(e) => setAddress(e.target.value)}
                  />
              </InputGroup>
            </FormControl>
            <Button
              borderRadius={0}
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={(e) => handleSubmit()}
            >
              ATUALIZAR
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  </Flex>
  );
}

export default function UpdateClients(user) {
  return (
    <TemplatePage name={'Atualizar dados colaborador'} conteudo={<Update user={user}/>}/>
  );
}