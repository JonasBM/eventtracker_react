import { actionCRUDActivity } from "../../actions/activity/actionActivity.js";

const initialState = {
  activitys: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionCRUDActivity.types.CREATE:
      return {
        ...state,
        activitys: [...state.activitys, action.payload],
      };
    case actionCRUDActivity.types.READ:
      return {
        ...state,
        activitys: action.payload,
      };
    case actionCRUDActivity.types.UPDATE:
      return {
        ...state,
        activitys: state.activitys.map((activity) =>
          activity.id === action.payload.id ? action.payload : activity
        ),
      };
    case actionCRUDActivity.types.DELETE:
      return {
        ...state,
        activitys: state.activitys.filter(
          (activity) => activity.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
