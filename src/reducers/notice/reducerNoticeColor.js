import { actionCRUDNoticeColor } from "../../actions/notice/actionNoticeColor";

const initialState = {
  notice_colors: [],
};

export default function reducerNoticeColor(state = initialState, action) {
  switch (action.type) {
    case actionCRUDNoticeColor.types.CREATE:
      return {
        ...state,
        notice_colors: [...state.notice_colors, action.payload],
      };
    case actionCRUDNoticeColor.types.READ:
      return {
        ...state,
        notice_colors: action.payload,
      };
    case actionCRUDNoticeColor.types.UPDATE:
      return {
        ...state,
        notice_colors: state.notice_colors.map((notice_color) =>
          notice_color.id === action.payload.id ? action.payload : notice_color
        ),
      };
    case actionCRUDNoticeColor.types.DELETE:
      return {
        ...state,
        notice_colors: state.notice_colors.filter(
          (notice_color) => notice_color.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
