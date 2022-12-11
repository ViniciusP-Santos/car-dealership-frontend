import { Flex, Image, Text} from "@chakra-ui/react";
import {
  Carousel,
  CarouselItem,
  useCarouselItem,
  CarouselItems,
} from "chakra-framer-carousel";

function CarouselDemo(images) {
  const imagesVehicle = images.images.images

  return (
    <Carousel>
      <CarouselItems>
        {imagesVehicle.map((image, index) => {
          return (
            <CarouselItem index={index} key={image}>
              <Card index={index} image={image} />
            </CarouselItem>
          );
        })}
      </CarouselItems>
    </Carousel>
  );
}

function Card({ image, index }) {
  const { numberOfSlides, onClickHandler, position } = useCarouselItem();
  const isCenter = position === "center";
  return (
    <Flex
      boxSize={isCenter ? "400px" : "300px"}
      pos="relative"
      boxShadow="lg"
      as="button"
      onClick={onClickHandler}
    >
      <Flex
        borderRadius="full"
        bg="whiteAlpha.400"
        p={2}
        left={2}
        top={2}
        position="absolute"
      >
        <Text>{`${index + 1}/${numberOfSlides}`}</Text>
      </Flex>

      <Image
        src={image}
        boxSize={isCenter ? "400px" : "300px"}
        objectFit="cover"
        objectPosition="center center"
        borderRadius={10}
        _hover={{
          scale: 1.1
        }}
      />
    </Flex>
  );
}

export default function imageSlider(images) {
  return (
    <Flex
      height="100%"
      width="100%"
      minHeight="50vh"
      justify="flex-start"
      align="flex-start"
      flexDir="column"
      p={10}
    >
      <Flex w="fit-content" gap="10" flexDir="column">
        <CarouselDemo images={images}/>
      </Flex>
    </Flex>
  );
}
