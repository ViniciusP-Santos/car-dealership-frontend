import React, { useState } from 'react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import InputMask from "react-input-mask";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../services/firebaseUtils'
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../assets/logo.png'

import { Box, Button, chakra, Flex, FormControl, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Select, Stack } from '@chakra-ui/react';
import TemplatePage from '../TemplatePage';
import { useNavigate } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const PhoneIcon = chakra(BsFillTelephoneFill);
const EmailIcon = chakra(MdEmail);


function SignUp() {
  let [name, setName] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [role, setRole] = useState('');

  const db = getFirestore(app)
  const userCollectionRef = collection(db, "users")
  const navigate = useNavigate()
  const handleSubmit = () => {
    const authentication = getAuth();

    if(!name){
      toast.error('Campo nome está vazio!')
    }else if(!email){
      toast.error('Campo email está vazio!')
    }else if(!password){
      toast.error('Campo senha está vazio!')
    }else if(!role){
      toast.error('Campo nivel está vazio!')
    }else {
      createUserWithEmailAndPassword( authentication, email, password)
        .then((response) => {
            const uid = response.user.uid;
            setDoc(doc(userCollectionRef, uid), {
              id: Math.floor(Math.random() * 100),
              type: 'colaborador',
              name,
              phoneNumber,
              email,
              role
            });
            setName('')
            setEmail('')
            setPassword('')
            setRole('')
            setPhoneNumber('')
            toast.success("Registro realizado com sucesso!")
            navigate('/colaborattors')
        }).catch((error) => {
          switch(error.code){
            case 'auth/user-not-found' : 
              toast.error('Usuario não encontrado!')
              break;
            case 'auth/wrong-password' :
              toast.error('Por favor, verifique a senha!')
              break;
              case 'auth/email-not-found' : 
              toast.error('Usuario não encontrado!')
              break;
            default:
              console.log(error)
              toast.error(error.code)
          }
        })
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);


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
        <Heading color="teal.400">Registro de Colaborador</Heading>
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
                    placeholder="Nome"
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
                    placeholder="Celular"
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
                    type="email" 
                    value={email}
                    placeholder="Endereço de email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<CFaLock color="gray.500" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <Select placeholder='Selecione o Nivel' color="gray.600" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value='admin'>Administrador</option>
                  <option value='salesperson'>Vendedor</option>
                  <option value='marketing'>Marketing</option>
                </Select>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={(e) => handleSubmit()}
              >
                CADASTRAR
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default function Collaborators() {

  return (
    <TemplatePage name={'Colaboradores'} conteudo={<SignUp />}/>
  );
}