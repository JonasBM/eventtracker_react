import { actionCRUD } from "../actionCRUD";

export const actionCRUDSurveyEventType = new actionCRUD(
  "surveyeventtype",
  process.env.REACT_APP_API_URL + "api/surveyeventtype/"
);
