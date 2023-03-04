import { combineReducers } from "redux";

import reducerNotice from "./reducerNotice";
import reducerNoticeColor from "./reducerNoticeColor";
import reducerNoticeEventType from "./reducerNoticeEventType";
import reducerNoticeEventTypeFile from "./reducerNoticeEventTypeFile";

export default combineReducers({
  notices: reducerNotice,
  notice_event_types: reducerNoticeEventType,
  notice_event_type_files: reducerNoticeEventTypeFile,
  notice_colors: reducerNoticeColor,
});
