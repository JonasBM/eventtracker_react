import { actionCRUDNotice } from "../../actions/notice/actionNotice.js";

const initialState = {
  notices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionCRUDNotice.types.CREATE:
      return {
        ...state,
        notices: [...state.notices, action.payload],
      };
    case actionCRUDNotice.types.READ:
      return {
        ...state,
        notices: action.payload,
      };
    case actionCRUDNotice.types.UPDATE:
      return {
        ...state,
        notices: state.notices.map((notice) =>
          notice.id === action.payload.id ? action.payload : notice
        ),
      };
    case actionCRUDNotice.types.DELETE:
      return {
        ...state,
        notices: state.notices.filter((notice) => notice.id !== action.payload),
      };
    default:
      return state;
  }
}
