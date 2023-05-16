import { Box, Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (form.username === "" || form.password === "") {
      toast({
        title: "",
        description: `Fill all the details first`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      let res = await fetch("http://localhost:8080/auth/", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.message === "user already exists") {
        toast({
          title: "",
          description: `${data.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "",
        description: `${data.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setForm({ name: "", password: "" });
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      toast({
        title: "",
        description: `${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" mt="50px" textAlign={"center"}>
      <Heading>Signup</Heading>
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
        Already have an account?{" "}
        <Link to="/">
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

export default Signup;
