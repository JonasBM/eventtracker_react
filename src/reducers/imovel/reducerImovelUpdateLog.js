import { IMOVEL_UPDATELOG } from "../../actions/actionTypes";

const initialState = {};

export default function reducerImovelUpdateLog(state = initialState, action) {
  switch (action.type) {
    case IMOVEL_UPDATELOG:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
