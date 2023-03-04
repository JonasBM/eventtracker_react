import { combineReducers } from "redux";

import reducerActivity from "./reducerActivity";

export default combineReducers({
  activitys: reducerActivity,
});
