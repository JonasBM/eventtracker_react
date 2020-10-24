import { combineReducers } from "redux";

import notice from "./notice";
import survey from "./survey";
import activity from "./activity";
import reducerAuth from "./reducerAuth";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  auth: reducerAuth,
  notice,
  survey,
  activity,
  errors,
  messages,
});
