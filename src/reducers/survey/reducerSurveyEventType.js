import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";

const initialState = {
  survey_event_types: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionCRUDSurveyEventType.types.CREATE:
      return {
        ...state,
        survey_event_types: [...state.survey_event_types, action.payload],
      };
    case actionCRUDSurveyEventType.types.READ:
      return {
        ...state,
        survey_event_types: action.payload,
      };
    case actionCRUDSurveyEventType.types.DELETE:
      return {
        ...state,
        survey_event_types: state.survey_event_types.filter(
          (survey_event_type) => survey_event_type.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
