import { actionCRUD } from "../actionCRUD";

export const actionCRUDReportEventType = new actionCRUD(
  "reporteventtype",
  process.env.REACT_APP_API_URL + "api/reporteventtype/"
);
