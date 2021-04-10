import { actionCRUDImovel } from "../../actions/imovel/actionImovel";

const initialState = {
  imoveis: [],
};

export default function reducerImovel(state = initialState, action) {
  switch (action.type) {
    case actionCRUDImovel.types.CREATE:
      return {
        ...state,
        imoveis: [...state.imoveis, action.payload],
      };
    case actionCRUDImovel.types.READ:
      return {
        ...state,
        imoveis: action.payload.results,
      };
    case actionCRUDImovel.types.UPDATE:
      return {
        ...state,
        imoveis: state.imoveis.map((imovel) =>
          imovel.id === action.payload.id ? action.payload : imovel
        ),
      };
    case actionCRUDImovel.types.DELETE:
      return {
        ...state,
        imoveis: state.imoveis.filter((imovel) => imovel.id !== action.payload),
      };
    default:
      return state;
  }
}
