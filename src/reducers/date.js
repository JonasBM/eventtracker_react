import { DATE_NEW } from "../actions/actionTypes";

const initialState = null;

export default function date(state = initialState, action) {
  switch (action.type) {
    case DATE_NEW:
      return (state = action.payload);
    default:
      return state;
  }
}
