import React from "react";
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import hermeticImage from "../assets/aquarius0.png";
import starImage from "../assets/aquarius2.png";
import placeholder from "../assets/icon.png";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box p="6">
      <Flex>
        <Image
          display={{ base: "none", md: "flex" }}
          borderRadius="50%"
          maxWidth="30%"
          src={hermeticImage ? hermeticImage : placeholder}
          alt="hermetic-image"
        />
        <div style={{ padding: "5%" }}>
          <Heading
            color={useColorModeValue("orange.200", "orange.500")}
            as="h2"
            size="lg"
            mb="6"
          >
            Why We Are The Best
          </Heading>
          <Text fontSize="lg" mb="6">
            AstraPredict's mission is to identify patterns that may exist
            between sidereal astrology and phenomena that influence human
            behavior and can thus be used to make predictions. The principle
            advantage of this system is that it contradicts the most prevalent
            perspective in the west and is far more accurate due to the
            precession of the equinox.
          </Text>
        </div>
      </Flex>
      <br />
      <Flex>
        <div style={{ padding: "5%" }}>
          <Heading
            as="h2"
            size="lg"
            mb="6"
            color={useColorModeValue("orange.200", "orange.500")}
          >
            What Is The Precession Of The Equinox?
          </Heading>
          <Text fontSize="md" mb="6">
            The precession of the equinox is a gradual shift in the orientation
            of the Earth's axis of rotation, which causes the position of the
            equinoxes to move slowly over time. As a result, the position of the
            vernal equinox moves westward along the ecliptic at a rate of about
            1 degree every 72 years. Check out the true position of the stars
            based on your location:
          </Text>
          <Button
            as={"a"}
            cursor="pointer"
            display={{ base: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"black"}
            colorScheme="yellow"
            onClick={() => navigate("/sidereal")}
            _hover={{
              bg: "orange.300",
            }}
          >
            Current Positions
          </Button>
        </div>
        <Image
          display={{ base: "none", md: "flex" }}
          borderRadius="50%"
          maxWidth="30%"
          src={starImage}
          alt="star-image"
        />
      </Flex>
    </Box>
  );
};

export default Landing;
