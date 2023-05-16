import axios from "axios";
import {
  CREATE_EVENT_ERROR,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  GET_ALL_EVENTS_ERROR,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_SINGLE_EVENT_ERROR,
  GET_SINGLE_EVENT_REQUEST,
  GET_SINGLE_EVENT_SUCCESS,
  SEND_REQUEST_ERROR,
  SEND_REQUEST_LOADING,
  SEND_REQUEST_SUCCESS,
} from "./actionTypes";

export const createEvent = (data) => async (dispatch) => {
  dispatch({ type: CREATE_EVENT_REQUEST });
  try {
    const res = await axios.post("http://localhost:8080/events/", data, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data.message });
    } else {
      dispatch({ type: CREATE_EVENT_ERROR, payload: "Something went wrong" });
    }
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getAllEvents = () => async (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS_REQUEST });
  try {
    const res = await axios.get("http://localhost:8080/events/");
    console.log(res.data);
    if (res.status === 200) {
      dispatch({
        type: GET_ALL_EVENTS_SUCCESS,
        payload: { message: res.data.message, data: res.data },
      });
    } else {
      dispatch({
        type: GET_ALL_EVENTS_ERROR,
        payload: { message: "Something went wrong" },
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENTS_ERROR,
      payload: { message: error.response.data.message },
    });
  }
};

export const getSingleEvent = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_EVENT_REQUEST });
  try {
    const res = await axios.get(`http://localhost:8080/events/${id}`);

    dispatch({ type: GET_SINGLE_EVENT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EVENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const sendRequest = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:8080/events/${id}/sendRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
    const data = await res.json();
    console.log(data.message);
    dispatch({ type: SEND_REQUEST_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: SEND_REQUEST_ERROR,
      payload: error.response.data.message,
    });
  }
};
