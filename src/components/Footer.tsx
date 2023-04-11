import { Box, Text, Link } from "@chakra-ui/react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box position="absolute" bottom={0} width="100%" textAlign="center" py={4}>
      <Text fontSize="sm" display="inline-block">
        © {currentYear} AstraPredict. All rights reserved.
      </Text>
      <Link
        href="https://github.com/iebgit"
        fontSize="sm"
        marginLeft={2}
        display="inline-block"
        color="orange"
      >
        GitHub
      </Link>
    </Box>
  );
}

export default Footer;
