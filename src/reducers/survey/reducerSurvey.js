import { actionCRUDSurvey } from "../../actions/survey/actionSurvey.js";

const initialState = {
  surveys: [],
};

export default function reducerSurvey(state = initialState, action) {
  switch (action.type) {
    case actionCRUDSurvey.types.CREATE:
      return {
        ...state,
        surveys: [...state.surveys, action.payload],
      };
    case actionCRUDSurvey.types.READ:
      return {
        ...state,
        surveys: action.payload,
      };
    case actionCRUDSurvey.types.UPDATE:
      return {
        ...state,
        surveys: state.surveys.map((survey) =>
          survey.id === action.payload.id ? action.payload : survey
        ),
      };
    case actionCRUDSurvey.types.DELETE:
      return {
        ...state,
        surveys: state.surveys.filter((survey) => survey.id !== action.payload),
      };
    default:
      return state;
  }
}
