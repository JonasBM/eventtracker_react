import { CREATE_MESSAGE, GET_ERRORS } from "./actionTypes";

// CREATE MESSAGE
export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (err) => {
  console.log(err);
  let msg;
  let status;
  if (err.response) {
    msg = err.response.data;
    status = err.response.status;
  } else {
    msg = { undefined_error: [err] };
    status = "undefined_error";
  }
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};
