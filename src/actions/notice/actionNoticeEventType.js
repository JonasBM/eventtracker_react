import { actionCRUD } from "../actionCRUD";

export const actionCRUDNoticeEventType = new actionCRUD(
  "noticeeventtype",
  process.env.REACT_APP_API_URL + "api/noticeeventtype/"
);
