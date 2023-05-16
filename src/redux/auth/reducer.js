import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_RESET,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from "./actionTypes";

const TOKEN = localStorage.getItem("token");
const initialState = {
  loading: false,
  error: false,
  token: TOKEN,
  isAuthenticated: !!TOKEN,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        error: false,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: true,
        loading: false,
      };

    case AUTH_LOGIN_RESET:
      return {
        ...state,
        userLogin: { loading: false, error: false, message: "" },
      };
    case AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: false,
        loading: false,
      };

    default:
      return state;
  }
}
