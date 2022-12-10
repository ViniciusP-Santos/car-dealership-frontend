import { Text, Image, Box, Stack, Heading, Button } from "@chakra-ui/react";
const Product = ({user , imageSrc, imageAlt, title, category, price }) => {
  return (
  <Stack p={{ base: "0 2rem" }} background="white" borderRadius="20px" padding="20px" maxWidth="300px">
    <Image objectFit="cover" src={imageSrc} alt={imageAlt} borderRadius="20px"/>
    <Text color="teal.600" textTransform="uppercase">
      {category}
    </Text>

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
      <Button w="100%" marginTop="20px">
          Marcar como vendido
      </Button>
    </Box>
  </Stack>
);}

export default Product;
