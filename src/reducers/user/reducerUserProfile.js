import { actionCRUDUserProfile } from "../../actions/user/actionUserProfile.js";

const initialState = {
  users: [],
};

export default function reducerUserProfile(state = initialState, action) {
  switch (action.type) {
    case actionCRUDUserProfile.types.CREATE:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case actionCRUDUserProfile.types.READ:
      return {
        ...state,
        users: action.payload,
      };
    case actionCRUDUserProfile.types.UPDATE:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case actionCRUDUserProfile.types.DELETE:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
}
