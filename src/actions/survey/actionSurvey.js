import { actionCRUD } from "../actionCRUD";

export const actionCRUDSurvey = new actionCRUD(
  "survey",
  process.env.REACT_APP_API_URL + "api/survey/"
);
