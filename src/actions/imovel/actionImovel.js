import axios from "axios";
import { tokenConfig } from "../actionAuth";
import { actionCRUD } from "../actionCRUD";
import { createMessage, returnErrors } from "../actionMessages";
import { IMOVEL_UPDATEDATA, IMOVEL_UPDATELOG } from "../actionTypes";

export const actionCRUDImovel = new actionCRUD(
  "imovel",
  process.env.REACT_APP_API_URL + "api/imovel/"
);

export const updateImovel = (check) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { params: check },
    tokenConfig(getState)
  );
  axios
    .get(process.env.REACT_APP_API_URL + "api/geoitajai/", headerWithValues)
    .then((res) => {
      dispatch({
        type: IMOVEL_UPDATEDATA,
        payload: res.data,
      });
      if (res.data.response === "Não Autorizado") {
        dispatch(createMessage({ ERROR: res.data.response }));
      } else {
        console.log(res.data.response);
        dispatch(createMessage({ SUCCESS: res.data.response }));
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err));
    });
};

export const updateImovelLog = () => (dispatch, getState) => {
  axios
    .get(
      process.env.REACT_APP_API_URL + "api/imovelupdatelog/",
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: IMOVEL_UPDATELOG,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (!err.code === "ECONNABORTED") {
        dispatch(returnErrors(err));
      }
    });
};
