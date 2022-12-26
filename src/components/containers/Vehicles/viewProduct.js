import { Button, Flex, FormControl, Input, InputGroup, InputLeftElement, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetVehicleProduct, updateVehicle } from '../../../services/FirestoreService';
import { AiOutlineLink } from "react-icons/ai";

import TemplatePage from '../../TemplatePage';
import ImageSlider from "../../ImageSlider";
import { toast, ToastContainer } from 'react-toastify';
  

export function ViewProductContent() {
    const { productId } = useParams()
    let [ vehicleItem, setVehicleItem ] = useState('')

    const fetchVehicle = async () => {
        const vehicle = await GetVehicleProduct(productId)
        setVehicleItem(vehicle)
        if(vehicle){
            setMarca(vehicle.marca)
            setModelo(vehicle.modelo)
            setAno(vehicle.ano)
            setPreco(vehicle.preco)
            setDescricao(vehicle.descricao)
            setTipo(vehicle.tipo)
            setImage(vehicle.image)
            setImage2(vehicle.image2)
            setImage3(vehicle.image3)
            setId(vehicle.id)
        }
    }

    useEffect(() => {
        fetchVehicle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let images = [vehicleItem.image, vehicleItem.image2, vehicleItem.image3]

    let [marca, setMarca] = useState('');
    let [modelo, setModelo] = useState('');
    let [ano, setAno] = useState('');
    let [preco, setPreco] = useState('');
    let [descricao, setDescricao] = useState('');
    let [tipo, setTipo] = useState('');
    let [image, setImage] = useState('');
    let [image2, setImage2] = useState('');
    let [image3, setImage3] = useState('');
    let [id, setId] = useState('');

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
        const data = {
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
          }      
        updateVehicle(id, data)  
        toast.success("Veiculo cadastrado com sucesso!")
      }
    };

    if(vehicleItem){
        return(
            <Flex backgroundColor="rgba(255, 255, 255, .25)" borderRadius="20px" marginTop="330px" direction="column" alignContent="center" alignItems="center">
                <Text as="b" marginBottom="20px" color="white" fontSize="30px">Bem vindo aos detalhes do veiculo - {vehicleItem.modelo}</Text>
                <ImageSlider images={images}/>
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                > 
                <ToastContainer/>
                <FormControl>
                    <InputGroup>
                    <Input 
                        bg="white"
                        type="marca" 
                        placeholder="Marca*"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input
                        bg="white" 
                        type="text" 
                        placeholder="Modelo*"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input 
                        bg="white"
                        type="number" 
                        value={ano}
                        placeholder="Ano*"
                        onChange={(e) => setAno(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input
                        bg="white"
                        type="number"
                        placeholder="Preço*"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <Textarea 
                    h="350px"
                    bg="white"
                    placeholder='Descrição*' 
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <Select 
                    placeholder='Selecione o tipo*'
                    bg="white"  
                    color="gray.600" 
                    value={tipo} 
                    onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value='car'>Carro</option>
                        <option value='bike'>Moto</option>
                        <option value='truck'>Caminhão</option>
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
                        bg="white"
                        marginRight="5px"
                        type="text" 
                        value={image}
                        placeholder="Link imagem principal"
                        onChange={(e) => setImage(e.target.value)}
                        />
                        <Input 
                        bg="white"
                        marginRight="5px"
                        type="text" 
                        value={image2}
                        placeholder="Link imagem 1"
                        onChange={(e) => setImage2(e.target.value)}
                        />
                        <Input 
                        bg="white"
                        type="text" 
                        value={image3}
                        placeholder="Link imagem 2"
                        onChange={(e) => setImage3(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <Button
                    borderRadius="10px"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={(e) => handleSubmit()}
                    marginBottom="50px"
                >
                    CADASTRAR
                </Button>
                </Stack>
            </Flex>
        );
    }else{
        return null
    }
}
export default function ViewProduct() {
  return (
    <TemplatePage conteudo={<ViewProductContent/>}/> 
  );
}