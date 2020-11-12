import { actionCRUDUser } from "../../actions/user/actionUser.js";

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
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
    default:
      return state;
  }
}
