import { actionCRUD } from "../actionCRUD";

export const actionCRUDActivity = new actionCRUD(
  "activity",
  process.env.REACT_APP_API_URL + "api/activity/"
);
