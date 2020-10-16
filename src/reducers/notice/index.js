import { combineReducers } from "redux";

import reducerNotice from "./reducerNotice";
import reducerNoticeEventType from "./reducerNoticeEventType";

export default combineReducers({
  notices: reducerNotice,
  notice_event_types: reducerNoticeEventType,
});
