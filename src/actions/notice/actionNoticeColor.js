import { actionCRUD } from "../actionCRUD";

export const actionCRUDNoticeColor = new actionCRUD(
  "noticecolor",
  process.env.REACT_APP_API_URL + "api/noticecolor/"
);
