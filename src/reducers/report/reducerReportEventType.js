import { actionCRUDReportEventType } from "../../actions/report/actionReportEventType";

const initialState = {
  report_event_types: [],
};

export default function reducerReportEventType(state = initialState, action) {
  switch (action.type) {
    case actionCRUDReportEventType.types.CREATE:
      return {
        ...state,
        report_event_types: [...state.report_event_types, action.payload],
      };
    case actionCRUDReportEventType.types.READ:
      return {
        ...state,
        report_event_types: action.payload,
      };
    case actionCRUDReportEventType.types.UPDATE:
      return {
        ...state,
        report_event_types: state.report_event_types.map((report_event_type) =>
          report_event_type.id === action.payload.id
            ? action.payload
            : report_event_type
        ),
      };
    case actionCRUDReportEventType.types.DELETE:
      return {
        ...state,
        report_event_types: state.report_event_types.filter(
          (report_event_type) => report_event_type.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
