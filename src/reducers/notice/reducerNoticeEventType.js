import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";

const initialState = {
  notice_event_types: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionCRUDNoticeEventType.types.CREATE:
      return {
        ...state,
        notice_event_types: [...state.notice_event_types, action.payload],
      };
    case actionCRUDNoticeEventType.types.READ:
      return {
        ...state,
        notice_event_types: action.payload,
      };
    case actionCRUDNoticeEventType.types.DELETE:
      return {
        ...state,
        notice_event_types: state.notice_event_types.filter(
          (notice_event_type) => notice_event_type.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
