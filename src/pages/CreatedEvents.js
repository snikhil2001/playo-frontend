import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/events/action";
import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const { loading, error, errorMessage, data } = useSelector(
    (store) => store.events
  );
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  useEffect(() => {
    setEvents(data);
  }, [data]);

  if (loading) {
    return (
      <Box display={"block"} w="5%" m="auto" mt="300px">
        <Spinner />
      </Box>
    );
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
      <Heading textAlign={"center"} mt="40px" mb="30px">
        Events
      </Heading>
      {events
        ?.filter((el) => {
          return el.userId._id === decodedToken._id;
        })
        .map((el) => {
          return (
            <Flex
              w="80%"
              m="auto"
              my={5}
              borderRadius={"20px"}
              border="1px solid"
              flexDirection={"column"}
              align={"center"}
              justifyContent={"center"}
            >
              <Heading py={2}>{el.title}</Heading>
              <Text fontSize={"18px"}>Description:- {el.description}</Text>
              <Text fontSize={"18px"}>End Time:- {el.endTime}</Text>
              <Text fontSize={"18px"}>No of Players:- {el.noOfPlayers}</Text>
              {/* <Text fontSize={"18px"}>
                Created By:- {decodedToken.username}
              </Text> */}
              <Link
                style={{
                  color: "teal",
                  fontSize: "20px",
                  margin: "auto",
                }}
                to={`/events/${el._id}`}
              >
                View
              </Link>
            </Flex>
          );
        })}
    </div>
  );
};

export default Events;
