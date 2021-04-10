import { combineReducers } from "redux";

import notice from "./notice";
import survey from "./survey";
import report from "./report";
import activity from "./activity";
import imovel from "./imovel";
import user from "./user";
import reducerAuth from "./reducerAuth";
import errors from "./errors";
import messages from "./messages";
import date from "./date";

export default combineReducers({
  auth: reducerAuth,
  user,
  notice,
  survey,
  report,
  activity,
  errors,
  messages,
  date,
  imovel,
});
