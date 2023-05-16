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

const initialState = {
  loading: false,
  error: false,
  success: false,
  successMessage: "",
  errorMessage: "",
  data: [],
  singleEvent: {},
};

export const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT_REQUEST:
      return { ...state, loading: true };

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: payload,
      };

    case CREATE_EVENT_ERROR:
      return { ...state, loading: false, error: true, errorMessage: payload };

    case GET_ALL_EVENTS_REQUEST:
      return { ...state, loading: true };

    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        successMessage: payload.message,
        data: payload.data,
      };

    case GET_ALL_EVENTS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        errorMessage: payload.message,
      };

    case GET_SINGLE_EVENT_REQUEST:
      return { ...state, loading: true };

    case GET_SINGLE_EVENT_SUCCESS:
      return { ...state, loading: false, singleEvent: payload };

    case GET_SINGLE_EVENT_ERROR:
      return { ...state, error: true, loading: false, errorMessage: payload };

    case SEND_REQUEST_LOADING:
      return { ...state, loading: true };

    case SEND_REQUEST_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        successMessage: payload,
      };

    case SEND_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
