import { actionCRUDReport } from "../../actions/report/actionReport.js";

const initialState = {
  reports: [],
};

export default function reducerReport(state = initialState, action) {
  switch (action.type) {
    case actionCRUDReport.types.CREATE:
      return {
        ...state,
        reports: [...state.reports, action.payload],
      };
    case actionCRUDReport.types.READ:
      return {
        ...state,
        reports: action.payload,
      };
    case actionCRUDReport.types.UPDATE:
      return {
        ...state,
        reports: state.reports.map((report) =>
          report.id === action.payload.id ? action.payload : report
        ),
      };
    case actionCRUDReport.types.DELETE:
      return {
        ...state,
        reports: state.reports.filter((report) => report.id !== action.payload),
      };
    default:
      return state;
  }
}
