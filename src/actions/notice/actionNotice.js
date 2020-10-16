import { actionCRUD } from "../actionCRUD";

export const actionCRUDNotice = new actionCRUD(
  "notice",
  process.env.REACT_APP_API_URL + "api/notice/"
);
