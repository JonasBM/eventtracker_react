import { actionCRUD } from "../actionCRUD";

export const actionCRUDReport = new actionCRUD(
  "report",
  process.env.REACT_APP_API_URL + "api/report/"
);
