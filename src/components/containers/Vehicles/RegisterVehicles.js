import React, { useState } from 'react';
import { AiOutlineLink, AiFillCar, AiOutlineDollar } from "react-icons/ai";

import { app } from '../../../services/firebaseUtils'
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../../assets/logo.png'

import { Box, Button, Flex, FormControl, Heading, Input, InputGroup, InputLeftElement, Select, Stack, Textarea } from '@chakra-ui/react';
import TemplatePage from '../../TemplatePage';

function RegisterVehicleContent() {

  let [marca, setMarca] = useState('');
  let [modelo, setModelo] = useState('');
  let [ano, setAno] = useState('');
  let [preco, setPreco] = useState('');
  let [descricao, setDescricao] = useState('');
  let [tipo, setTipo] = useState('');
  let [image, setImage] = useState('');
  let [image2, setImage2] = useState('');
  let [image3, setImage3] = useState('');

  const db = getFirestore(app)
  const userCollectionRef = collection(db, "veiculos")

  const handleSubmit = () => {
    if(!marca){
      toast.error('Campo marca está vazio!')
    }else if(!modelo){
      toast.error('Campo modelo está vazio!')
    }else if(!ano){
      toast.error('Campo ano está vazio!')
    }else if(!preco){
      toast.error('Campo preco está vazio!')
    }else {
      setDoc(doc(userCollectionRef), {
        type: 'veiculos',
        marca,
        modelo,
        ano,
        preco,
        descricao,
        tipo,
        image,
        image2,
        image3
      });
      setMarca('')
      setModelo('')
      setAno('')
      setPreco('')
      setDescricao('')
      setTipo('')
      setImage('')
      setImage2('')
      setImage3('')
      toast.success("Veiculo cadastrado com sucesso!")
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
        <Heading color="teal.400">Cadastro de Veiculos</Heading>
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
                    children={<AiFillCar color="gray.500" />}
                  />
                  <Input 
                    type="marca" 
                    placeholder="Marca*"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiFillCar color="gray.500" />}
                  />
                  <Input 
                    type="text" 
                    placeholder="Modelo*"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiFillCar color="gray.500" />}
                  />
                  <Input 
                    type="number" 
                    value={ano}
                    placeholder="Ano*"
                    onChange={(e) => setAno(e.target.value)}
                    />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<AiOutlineDollar color="gray.500" />}
                  />
                  <Input
                    type="number"
                    placeholder="Preço*"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Textarea 
                  placeholder='Descrição*' 
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Select placeholder='Selecione o tipo*' color="gray.600" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value='admin'>Carro</option>
                  <option value='salesperson'>Moto</option>
                  <option value='marketing'>Caminhão</option>
                </Select>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineLink color="gray.500" 
                    />}
                  />
                  <Input 
                    marginRight="5px"
                    type="text" 
                    value={image}
                    placeholder="Link imagem principal"
                    onChange={(e) => setImage(e.target.value)}
                    />
                    <Input 
                    marginRight="5px"
                    type="text" 
                    value={image2}
                    placeholder="Link imagem 1"
                    onChange={(e) => setImage2(e.target.value)}
                    />
                    <Input 
                    type="text" 
                    value={image3}
                    placeholder="Link imagem 2"
                    onChange={(e) => setImage3(e.target.value)}
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
                CADASTRAR
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default function RegisterVehicles() {

  return (
    <TemplatePage name={'Colaboradores'} conteudo={<RegisterVehicleContent />}/>
  );
}