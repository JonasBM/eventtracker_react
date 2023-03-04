import { actionCRUD } from "../actionCRUD";
import { USER_NEW } from "../actionTypes";

export const actionCRUDUser = new actionCRUD(
  "user",
  process.env.REACT_APP_API_URL + "api/user/"
);

export const newUser = (user) => {
  return {
    type: USER_NEW,
    payload: user,
  };
};
