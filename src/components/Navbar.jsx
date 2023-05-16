import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box w="100%" m="auto" bg="teal" mb="30px" color="white">
      <Flex
        display={{ lg: "flex", md: "flex", sm: "none", base: "none" }}
        p="10px 20px"
        pr="50px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/events">Events</Link>
        <Link to="/createevent">Create Event</Link>
        <Link to="/createdevents">Created Events</Link>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
      </Flex>
    </Box>
  );
}

export default Navbar;
