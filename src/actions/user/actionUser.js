import { actionCRUD } from "../actionCRUD";
import axios from "axios";
import { returnErrors, createMessage } from "../actionMessages";
import { tokenConfig } from "../actionAuth";
import { login, logoutAll } from "../actionAuth";

export const actionCRUDUser = new actionCRUD(
  "user",
  process.env.REACT_APP_API_URL + "api/user/"
);

export const changePassword = (objeto) => (dispatch, getState) => {
  console.log(objeto);
  axios
    .put(
      process.env.REACT_APP_API_URL + "api/changepassword/",
      { ...objeto },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ CRUDupdate: "Senha alterada com sucesso!" }));
      dispatch(logoutAll());
    })
    .catch((err) => dispatch(returnErrors(err)));
};
