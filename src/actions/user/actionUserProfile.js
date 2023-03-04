import { actionCRUD } from "../actionCRUD";
import axios from "axios";
import { returnErrors, createMessage } from "../actionMessages";
import { tokenConfig } from "../actionAuth";
import { logoutAll } from "../actionAuth";

export const actionCRUDUserProfile = new actionCRUD(
  "userprofile",
  process.env.REACT_APP_API_URL + "api/userprofile/"
);

export const changePassword = (objeto) => (dispatch, getState) => {
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
