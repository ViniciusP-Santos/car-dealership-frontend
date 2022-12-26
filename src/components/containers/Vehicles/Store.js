import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import TemplatePage from "../../TemplatePage";
import Product from "./Products";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GetAllVehicles } from "../../../services/FirestoreService";
import { useEffect } from "react";
import { useState } from "react";
import { moneyFormat } from "../../../helpers/storeVehicles"
  

function ViewPageContent() {
  const navigate = useNavigate()
  let [vehicleItemData, setVehicleItemData] = useState('');

  const vehiclesAll = GetAllVehicles();

  useEffect(() => {
    if(vehiclesAll){
      const vehiclesItem = vehiclesAll.map(function(item){
        return {
          id: item.id,
          title: item.modelo,
          category: item.marca,
          imageSrc: item.image,
          price: moneyFormat(item.preco)
        }
      });
      setVehicleItemData(vehiclesItem)
    }
  },[vehiclesAll])

  if(vehicleItemData){
    return (
      <Flex 
      direction="column" 
      h="500vh"  
      maxBlockSize="620px" 
      alignContent="center" 
      alignItems="center"
      marginLeft="20px">
          <Text as="b" marginBottom="20px" color="white" fontSize="30px">Veiculos disponiveis em estoque</Text>
          <Button 
              w="250px"
              leftIcon={<AiOutlinePlus />} 
              colorScheme='blue' 
              variant='outline' 
              onClick={(e) => navigate('/register-vehicles')}
            >
            Adicionar Veiculo
          </Button>
        <Grid
          marginTop="20px"
          w="160vh"
          gridGap="6"
          gridTemplateColumns="repeat( auto-fit, minmax(200px, 1fr) )"
        >
          {vehicleItemData.map((p) => (
            <Product key={p.id} product={p} {...p} />
          ))}
        </Grid>
      </Flex>
    );
  }else{
    return null
  }
}

export default function viewPage() {
    return (
        <TemplatePage conteudo={<ViewPageContent/>}/> 
    );
  }
