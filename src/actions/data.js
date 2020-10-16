import { CHANGE_TESTE } from "./actionTypes";

// CHANGE_TESTE
export const changeTeste = data => (dispatch, getState) => {
  dispatch({
    type: CHANGE_TESTE,
    payload: data
  });
};