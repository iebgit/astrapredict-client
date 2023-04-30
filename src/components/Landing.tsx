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
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box p="6">
      <Flex>
        <Image
          display={{ base: "none", md: "flex" }}
          borderRadius="50%"
          maxWidth="33%"
          maxHeight="33%"
          src={hermeticImage}
          alt="hermetic-image"
        />
        <div style={{ padding: "5%" }}>
          <Heading
            color={useColorModeValue("orange.200", "orange.500")}
            as="h2"
            size="lg"
            mb="6"
          >
            Why AstraPredict is better
          </Heading>
          <Text fontSize="lg" mb="6">
            AstraPredict uses a far more accurate system for tracking the
            location of celestial bodies through constellations. We use sidereal
            astrology which, unlike the more common tropical system, takes into
            account the precession of the equinox.
          </Text>
        </div>
      </Flex>

      <Flex>
        <div style={{ padding: "5%" }}>
          <Heading
            as="h2"
            size="lg"
            mb="6"
            color={useColorModeValue("orange.200", "orange.500")}
          >
            What is the precession of the equinox?
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
            color={"white"}
            bg={"orange.400"}
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
          maxWidth="33%"
          maxHeight="33%"
          src={starImage}
          alt="star-image"
        />
      </Flex>
    </Box>
  );
};

export default Landing;
