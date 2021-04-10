import { combineReducers } from "redux";

import reducerReport from "./reducerReport";
import reducerReportEventType from "./reducerReportEventType";

export default combineReducers({
  reports: reducerReport,
  report_event_types: reducerReportEventType,
});
