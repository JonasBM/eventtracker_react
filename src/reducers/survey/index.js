import { combineReducers } from "redux";

import reducerSurvey from "./reducerSurvey";
import reducerSurveyEventType from "./reducerSurveyEventType";

export default combineReducers({
  surveys: reducerSurvey,
  survey_event_types: reducerSurveyEventType,
});
