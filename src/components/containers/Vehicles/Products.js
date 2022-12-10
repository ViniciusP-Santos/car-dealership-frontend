import { Text, Image, Box, Stack, Heading, Button } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { app } from "../../../services/firebaseUtils";
const Product = ({product , imageSrc, imageAlt, title, category, price }) => {
  const db = getFirestore(app)
  const userCollectionRef = collection(db, "veiculos-vendidos")

  const markAsSold = async (product) => {
    setDoc(doc(userCollectionRef), product);
    await deleteDoc(doc(db, "veiculos", product.id))
    toast.success('Veiculo marcado como vendido!')
  }

  return (
  <Stack p={{ base: "0 2rem" }} background="white" borderRadius="20px" padding="20px" maxWidth="300px">
    <Image objectFit="cover" src={imageSrc} alt={imageAlt} borderRadius="20px" minHeight="180px"/>
    <Text color="teal.600" textTransform="uppercase">
      {category}
    </Text>
    <ToastContainer/>
    <Heading color="teal.300" size="md" textTransform="capitalize">
      {title}
    </Heading>
    <Box>
      {price}
      <Box as="span" color="gray.600" fontSize="sm">
        / A vista
      </Box>
    </Box>
    <Box> 
      <Button w="100%" marginTop="20px" colorScheme="red" onClick={(e) => markAsSold(product)}>
          Marcar como vendido
      </Button>
    </Box>
  </Stack>
);}

export default Product;
