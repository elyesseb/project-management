import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box bg="#09090B" p={4} color="#fafafa">
      <Flex align="center">
        <NavLink to="/">Project Management</NavLink>
        <Spacer />
        {token ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <Button onClick={handleLogout} ml={3} bg={"#09090B"} _hover={{ bg: "gray.800" }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                color: isActive ? "#fafafa" : "#a1a1aa",
                fontSize: "18px",
                textDecoration: "none",
                marginRight: "15px",
                transition: "color 0.2s ease",
              })}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              style={({ isActive }) => ({
                color: isActive ? "#fafafa" : "#a1a1aa",
                fontSize: "18px",
                textDecoration: "none",
                transition: "color 0.2s ease",
              })}
            >
              Register
            </NavLink>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;