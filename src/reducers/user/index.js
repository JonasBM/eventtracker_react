import { combineReducers } from "redux";

import reducerUser from "./reducerUser";
import reducerUserProfile from "./reducerUserProfile";

export default combineReducers({
  users: reducerUser,
  userprofiles: reducerUserProfile,
});
