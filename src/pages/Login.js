import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authLogin } from "../redux/auth/actions";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const authState = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin(form));
  };

  if (authState.isAuthenticated) {
    return <Navigate to="/events" />;
  }

  if (authState.error) {
    return <h1>...Error, Please reload the page</h1>;
  }

  return (
    <Box w="100%" mt="50px" textAlign={"center"}>
      <Heading>Login</Heading>
      <FormControl w="30%" m="auto">
        <FormLabel>Username</FormLabel>
        <Input
          mb="20px"
          type="text"
          name="username"
          id="username"
          value={form.username}
          onChange={handleChange}
        />
        <FormLabel>Password</FormLabel>
        <Input
          mb="20px"
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
        />
      </FormControl>
      <Text pb="10px">
        Don't have an account?{" "}
        <Link to="/signup">
          <Button
            h="20px"
            background={"white"}
            _hover={{ background: "white" }}
          >
            Click Here
          </Button>
        </Link>
      </Text>
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default Login;
