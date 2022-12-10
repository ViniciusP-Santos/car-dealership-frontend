import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  DarkMode,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  chakra,
  Image,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

// eslint-disable-next-line no-unused-vars
import { app } from '../../services/firebaseUtils'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../assets/logo.png'

// Custom Components
import GradientBorder from "../GradientBorder/GradientBorder";

const CFaLock = chakra(FaLock);

export default function SignIn() {

  const titleColor = "white";

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = () => { 
    const authentication = getAuth();
    signInWithEmailAndPassword( authentication, email, password)
    .then((response) => { 
      sessionStorage.setItem('auth', response._tokenResponse.refreshToken)
      sessionStorage.setItem('Uid',response.user.uid)
      navigate('/dashboard')
    }).catch((error) => {
      console.log(error.code)
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
          toast.error(error.code)
      }
    })
  };
  return (
    <Flex position='relative' bgGradient='linear(to-l, #0c0f34, #00062a)' >
      <ToastContainer autoClose={3000} />
      <Flex
        minH='50vh'
        h={{ base: "100vh", lg: "fit-content" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        pt={{ sm: "100px", md: "0px" }}
        flexDirection='column'
        me={{ base: "auto", lg: "50px", xl: "auto" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px='50px'>
          <Flex 
            direction='column'
            w='100%'
            background='transparent'
            mt={{ base: "50px", md: "150px", lg: "160px", xl: "245px" }}
            mb={{ base: "60px", lg: "95px" }}>
            <Image src={Logo} marginBottom="50px"/>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Seja bem vindo!
            </Heading>
            <FormControl>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='normal'
                color='white'>
                Email
              </FormLabel>
              <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <Input
                  color='white'
                  bg='rgb(19,21,54)'
                  border='transparent'
                  borderRadius='20px'
                  fontSize='sm'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  h='46px'
                  placeholder='Seu endereço de email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </GradientBorder>
            </FormControl>
            <FormControl>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='normal'
                color='white'
                >
                Senha
              </FormLabel>
              <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                    marginTop="5px"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    color='white'
                    bg='rgb(19,21,54)'
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    placeholder='Sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="5rem">
                    <Button h="1.5rem" borderRadius="20px" marginTop="10px" size="sm" onClick={handleShowClick} _hover={{ bg: '#FFE810' , color: 'black'}}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </GradientBorder>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <DarkMode>
                <Switch id='remember-login' colorScheme='brand' me='10px' />
              </DarkMode>
              <FormLabel
                htmlFor='remember-login'
                mb='0'
                ms='1'
                fontWeight='normal'
                color='white'>
                Lembre de mim
              </FormLabel>
            </FormControl>
            <Button
              fontSize='15px'
              type='submit'
              w='100%'
              maxW='350px'
              h='45'
              mb='20px'
              mt='20px'
              _hover={{ bg: '#FFE810' , color: 'black'}}
              onClick={(e) => handleSubmit()}
              >
              ENTRAR
            </Button>
          </Flex>
        </Flex>
        <Box
          w={{ base: "335px", md: "450px" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb='80px'>
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          overflowX='hidden'
          h='100%'
          maxW={{ md: "50vw", lg: "50vw" }}
          minH='100vh'
          w='960px'
          position='absolute'
          left='0px'>
          <Box
            // bgImage={signInImage}
            boxShadow='dark-lg' p='6' rounded='md' 
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            >
            <Text
              textAlign='center'
              color='white'
              letterSpacing='8px'
              fontSize='20px'
              fontWeight='500'>
              VITRINNE
            </Text>
            <Text
              textAlign='center'
              color='transparent'
              letterSpacing='8px'
              fontSize='36px'
              fontWeight='bold'
              bgClip='text !important'
              bg='linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)'>
              O FUTURO NA VENDA DE VEICULOS
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}