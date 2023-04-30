import React from "react";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";

const AstraPredict: React.FC = () => {
  return (
    <Box p="6">
      <Heading
        color={useColorModeValue("orange.300", "orange.900")}
        as="h1"
        size="2xl"
        mb="6"
      >
        About
      </Heading>
      <Text fontSize="lg" mb="6">
        AstraPredict is a program that uses TensorFlow to make predictions based
        on sidereal astrology positions.
      </Text>
      <Heading
        as="h2"
        size="lg"
        mb="4"
        color={useColorModeValue("orange.300", "orange.900")}
      >
        How it Works
      </Heading>
      <Text fontSize="md" mb="6">
        AstraPredict uses a machine learning algorithm to analyze the sidereal
        astrology positions of various celestial bodies and their corresponding
        effects on events and markets. The algorithm takes into account
        historical data, current astrology positions, and other relevant factors
        to generate predictions for the future.
      </Text>
      <Heading
        as="h2"
        size="lg"
        mb="4"
        color={useColorModeValue("orange.300", "orange.900")}
      >
        Benefits
      </Heading>
      <UnorderedList mb="6">
        <ListItem>Provides an alternative approach to prediction.</ListItem>
        <ListItem>
          Can potentially provide more accurate predictions than traditional
          methods.
        </ListItem>
        <ListItem>
          Allows users to explore the relationship between astrology and events.
        </ListItem>
      </UnorderedList>
      <Heading
        as="h2"
        size="lg"
        mb="4"
        color={useColorModeValue("orange.300", "orange.900")}
      >
        Limitations
      </Heading>
      <UnorderedList mb="6">
        <ListItem>
          The accuracy of the predictions is dependent on the accuracy of the
          astrology data.
        </ListItem>
        <ListItem>
          The program may not account for other important factors that can
          affect events, such as news or regulatory changes.
        </ListItem>
      </UnorderedList>
      <Heading
        color={useColorModeValue("orange.300", "orange.900")}
        as="h2"
        size="lg"
        mb="4"
      >
        Conclusion
      </Heading>
      <Text fontSize="md" mb="6">
        AstraPredict is a unique and innovative program that explores the
        relationship between astrology and events. While it may have some
        limitations, it has the potential to provide valuable insights.
      </Text>
    </Box>
  );
};

export default AstraPredict;
