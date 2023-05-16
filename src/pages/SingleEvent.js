import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent, sendRequest } from "../redux/events/action";
import { useJwt } from "react-jwt";
import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";

const SingleEvent = () => {
  const { id } = useParams();
  const { loading, singleEvent, error, errorMessage } = useSelector(
    (store) => store.events
  );
  const dispatch = useDispatch();
  const [single, setSingle] = useState({});
  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);

  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [id]);

  useEffect(() => {
    setSingle(singleEvent);
  }, [singleEvent]);

  console.log(single);

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
      <Flex
        w="80%"
        m="auto"
        my={5}
        // borderRadius={"20px"}
        // border="1px solid"
        flexDirection={"column"}
        align={"center"}
        justifyContent={"center"}
      >
        <Heading py={2}>{single.title}</Heading>
        <Text fontSize={"22px"} my={2}>
          Description:- {single.description}
        </Text>
        <Text fontSize={"22px"} my={2}>
          End Time:- {single.endTime}
        </Text>
        <Text fontSize={"22px"} my={2}>
          No of Players:- {single.noOfPlayers}
        </Text>
        {single?.userId?._id !== decodedToken?._id &&
        !single.usersPlaying?.includes(decodedToken?._id) ? (
          <Button onClick={() => dispatch(sendRequest(id))}>
            Send Request
          </Button>
        ) : null}

        {single?.userId?._id === decodedToken?._id ? (
          <Heading textAlign={"center"} my={5}>
            User Requests
          </Heading>
        ) : null}

        {single?.userId?._id === decodedToken?._id &&
          single?.userRequests?.map((el) => {
            return (
              <Flex
                w="80%"
                m="auto"
                my={5}
                justifyContent={"space-around"}
                align={"center"}
              >
                <Text>{el.username}</Text>
                <Button>Accept</Button>
                <Button>Reject</Button>
              </Flex>
            );
          })}

        {single?.userId?._id === decodedToken?._id ||
        single?.usersPlaying?.includes(decodedToken?._id) ? (
          <Heading>Users Playing</Heading>
        ) : null}

        {single?.userId?._id === decodedToken?._id ||
          (single?.usersPlaying?.includes(decodedToken?._id) &&
            single?.usersPlaying?.map((el) => <Text>{el.username}</Text>))}
      </Flex>
    </div>
  );
};

export default SingleEvent;
