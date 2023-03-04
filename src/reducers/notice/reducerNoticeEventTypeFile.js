import { actionCRUDNoticeEventTypeFile } from "../../actions/notice/actionNoticeEventTypeFile";

const initialState = {
  notice_event_type_files: [],
};

export default function reducerNoticeEventTypeFile(
  state = initialState,
  action
) {
  switch (action.type) {
    case actionCRUDNoticeEventTypeFile.types.CREATE:
      return {
        ...state,
        notice_event_type_files: [
          ...state.notice_event_type_files,
          action.payload,
        ],
      };
    case actionCRUDNoticeEventTypeFile.types.READ:
      return {
        ...state,
        notice_event_type_files: action.payload,
      };
    case actionCRUDNoticeEventTypeFile.types.UPDATE:
      return {
        ...state,
        notice_event_type_files: state.notice_event_type_files.map(
          (notice_event_type_file) =>
            notice_event_type_file.id === action.payload.id
              ? action.payload
              : notice_event_type_file
        ),
      };
    case actionCRUDNoticeEventTypeFile.types.DELETE:
      return {
        ...state,
        notice_event_type_file_files: state.notice_event_type_file_files.filter(
          (notice_event_type_file) =>
            notice_event_type_file.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
