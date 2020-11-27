import { combineReducers } from "redux";

import reducerImovel from "./reducerImovel";
import reducerImovelUpdateLog from "./reducerImovelUpdateLog";

export default combineReducers({
  imoveis: reducerImovel,
  updatelog: reducerImovelUpdateLog,
});
