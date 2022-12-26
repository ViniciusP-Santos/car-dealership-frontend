import { 
  Text, 
  Image, 
  Box, 
  Stack, 
  Heading, 
  Button, 
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select
 } from "@chakra-ui/react";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { app } from "../../../services/firebaseUtils";
import { GetAllCollaborators, GetAllClients, updateVehicleFieldType } from '../../../services/FirestoreService'


const Product = ({product , imageSrc, imageAlt, title, category, price }) => {
  const navigate = useNavigate()
  const db = getFirestore(app)
  const userCollectionRef = collection(db, "veiculos-vendidos")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  let [productItem, setProductItem] = useState()

  const collaborator = GetAllCollaborators()
  const clients = GetAllClients()

  const [sellerId, setSellerId] = useState('')
  const [clientId, setClientId] = useState('')
 
  const markAsSold = async (product) => {
    if(!sellerId){
      toast.error('Selecione um vendedor!')
    }else if(!clientId){
      toast.error('Selecione um cliente!')
    }else{
      setDoc(doc(userCollectionRef), {
        ...product,
        sellerName: sellerId,
        clientName: clientId,
        soldDate: new Date()
      });
      updateVehicleFieldType(product.id, {type: "veiculos-vendidos", oldId: product.id})
      toast.success('Veiculo vendido!')
    }
  }

  const viewProduct = (product) => {
      navigate(`/view-vehicle/${product.id}`)
  }

  const ModalSold = (product) => {
    onOpen()
    setProductItem(product)
  }

  return (
  <Stack 
    p={{ base: "0 2rem" }} 
    background="white" 
    borderRadius="20px" 
    padding="20px" 
    maxWidth="300px"
    maxHeight="500px"
    >
    <Image 
      objectFit="cover" 
      src={imageSrc} 
      alt={imageAlt} 
      borderRadius="20px" 
      minHeight="180px"     
      onClick={(e) => viewProduct(product)}
      _hover={{ cursor: "pointer"}}  
      />
    <Text color="teal.600" textTransform="uppercase">
      {category}
    </Text>
    <ToastContainer/>
    <Heading color="teal.300" size="md" textTransform="capitalize" onClick={(e) => viewProduct(product)} _hover={{ cursor: "pointer"}}>
      {title}
    </Heading>
    <Box onClick={(e) => viewProduct(product)} _hover={{ cursor: "pointer"}}>
      {price}
      <Box as="span" color="gray.600" fontSize="sm">
        / A vista
      </Box>
    </Box>
    <Box> 
      <Button w="100%" marginTop="20px" colorScheme="red" onClick={(e) => ModalSold(product)}>
          Marcar como vendido
      </Button>
    </Box>
    <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registrar Venda do veiculo {product && product.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Vendedor</FormLabel>
                <Select placeholder='Selecione o vendedor' value={sellerId} onChange={(e) => setSellerId(e.target.value)}>
                  {collaborator &&
                  collaborator.map((p) => (
                    <option value={p.name}>{p.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Cliente</FormLabel>
                <Select placeholder='Selecione o cliente' value={clientId} onChange={(e) => setClientId(e.target.value)}>
                  {clients &&
                  clients.map((p) => (
                    <option value={p.name}>{p.name}</option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={(e) => markAsSold(productItem)}>
                Marcar como vendido
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  </Stack>
);}

export default Product;
