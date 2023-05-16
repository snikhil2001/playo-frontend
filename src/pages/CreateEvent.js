import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../redux/events/action";

const initialState = {
  title: "",
  description: "",
  endTime: "",
  noOfPlayers: "",
};

const CreateEvent = () => {
  const toast = useToast();
  const [form, setForm] = useState(initialState);
  const { loading, error, success, successMessage, errorMessage } = useSelector(
    (store) => store.events
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? +value : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = () => {
    if (
      form.title === "" ||
      form.description === "" ||
      form.endTime === "" ||
      form.noOfPlayers === "" ||
      form.noOfPlayers === 0
    ) {
      alert("Please entter all the required fields");
      return;
    }
    if (form.noOfPlayers > 10) {
      alert("Please set limit less than or equal to 10 players");
      return;
    }
    dispatch(createEvent(form));
  };

  if (loading) {
    return (
      <Box display={"block"} w="5%" m="auto" mt="300px">
        <Spinner />
      </Box>
    );
  }

  if (success) {
    toast({
      title: "Success",
      description: successMessage,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  if (error) {
    return (
      <Heading textAlign={"center"} mt="40px">
        {errorMessage}
      </Heading>
    );
  }

  return (
    <div>
      <Heading textAlign={"center"} mt="40px">
        Create Event
      </Heading>
      <FormControl w="30%" m="auto">
        <FormLabel>Title</FormLabel>
        <Input
          mb="20px"
          type="text"
          name="title"
          id="title"
          value={form.title}
          onChange={handleChange}
        />
        <FormLabel>Description</FormLabel>
        <Textarea
          mb="20px"
          type="description"
          name="description"
          id="description"
          value={form.description}
          onChange={handleChange}
        />
        <FormLabel>End Time</FormLabel>
        <Input
          mb="20px"
          type="time"
          name="endTime"
          id="endTime"
          value={form.endTime}
          onChange={handleChange}
        />
        <FormLabel>noOfPlayers</FormLabel>
        <Input
          mb="20px"
          type="number"
          name="noOfPlayers"
          id="noOfPlayers"
          value={form.noOfPlayers}
          onChange={handleChange}
        />
      </FormControl>
      <Button
        display={"block"}
        m="auto"
        w="250px"
        background={"green"}
        color="white"
        _hover={{ background: "white", color: "green" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateEvent;
