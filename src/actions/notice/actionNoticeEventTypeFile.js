import { actionCRUD } from "../actionCRUD";

export const actionCRUDNoticeEventTypeFile = new actionCRUD(
  "noticeeventtypefile",
  process.env.REACT_APP_API_URL + "api/noticeeventtypefile/",
  { "Content-Type": "multipart/form-data" }
);
