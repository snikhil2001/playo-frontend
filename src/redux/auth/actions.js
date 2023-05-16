import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from "./actionTypes";
import axios from "axios";

export const authLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    const res = await axios.post("http://localhost:8080/auth/login", data);
    // console.log("res: ", res);

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
      },
    });
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
    });
  }
};

export const authLogout = () => {
  return { type: AUTH_LOGOUT };
};
