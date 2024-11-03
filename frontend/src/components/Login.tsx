import { useState } from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await login(email, password);
    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Text fontSize="2xl" mb="4">
        Login
      </Text>
      <Stack>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
