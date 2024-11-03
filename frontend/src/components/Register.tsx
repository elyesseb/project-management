import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    setError("");

    const data = await register(email, password);
    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Text fontSize="2xl" mb="4">
        Register
      </Text>
      {error && (
        <Text color="red.500" mb="4">
          {error}
        </Text>
      )}
      <Stack>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="teal" onClick={handleRegister}>
          Register
        </Button>
      </Stack>
    </Box>
  );
};

export default Register;
