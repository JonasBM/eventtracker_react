import { actionCRUDUser } from "../../actions/user/actionUser";
import { USER_NEW } from "../../actions/actionTypes";

const initialState = {
  users: [],
  current: {},
};

export default function reducerUser(state = initialState, action) {
  switch (action.type) {
    case actionCRUDUser.types.CREATE:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case actionCRUDUser.types.READ:
      return {
        ...state,
        users: action.payload,
      };
    case actionCRUDUser.types.UPDATE:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case actionCRUDUser.types.DELETE:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case USER_NEW:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}
