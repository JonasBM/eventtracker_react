import { combineReducers } from "redux";

import notice from "./notice";
import reducerAuth from "./reducerAuth";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  auth: reducerAuth,
  notice,
  errors,
  messages,
});
