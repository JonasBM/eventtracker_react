import axios from "axios";
import { returnErrors } from "./actionMessages";
import { createMessage } from "./actionMessages";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from "./actionTypes";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  let tokenHeader = tokenConfig(getState);
  if (tokenHeader != null) {
    dispatch({ type: USER_LOADING });
    axios
      .get(process.env.REACT_APP_API_URL + "api/auth/user/", tokenHeader)
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } else {
    dispatch({ type: AUTH_ERROR });
  }
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = { headers: { "Content-Type": "application/json" } };
  // Request Body
  const body = JSON.stringify({ username, password });
  axios
    .post(process.env.REACT_APP_API_URL + "api/auth/login/", body, config)
    .then((res) => {
      dispatch(createMessage("Bem vindo"));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  let tokenHeader = tokenConfig(getState);
  if (tokenHeader != null) {
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/auth/logout/",
        null,
        tokenHeader
      )
      .then((res) => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  } else {
    dispatch({ type: AUTH_ERROR });
  }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;
  if (token == null) {
    return null;
  }
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
