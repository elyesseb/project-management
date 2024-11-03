import { Box, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Text fontSize="4xl">404</Text>
      <Text fontSize="xl">Page Not Found</Text>
    </Box>
  );
};

export default NotFound;