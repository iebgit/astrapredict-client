import React from "react";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  useColorModeValue,
  Flex,
  Image,
} from "@chakra-ui/react";
import hermeticImage from "../assets/aquarius0.png";
import starImage from "../assets/aquarius2.png";

const Landing: React.FC = () => {
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
            The procession of the equinox
          </Heading>
          <Text fontSize="lg" mb="6">
            AstraPredict uses a far more accurate system of tracking the
            location of celestial bodies through constellations. We use sidereal
            astrology which, unlike the more common tropical system, takes into
            account the procession of the equinox.
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
            What is the procession of the equinox?
          </Heading>
          <Text fontSize="md" mb="6">
            The precession of the equinox is a gradual shift in the orientation
            of the Earth's axis of rotation, which causes the position of the
            equinoxes to move slowly over time. This phenomenon is caused by the
            gravitational pull of the Sun and Moon on the Earth's equatorial
            bulge, which causes a slight wobble in the Earth's rotation. As a
            result of this wobble, the position of the vernal equinox (the point
            on the celestial sphere where the ecliptic and the celestial equator
            intersect, and which marks the beginning of spring in the Northern
            Hemisphere) moves westward along the ecliptic at a rate of about 1
            degree every 72 years.
          </Text>
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
