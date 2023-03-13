import axios from "axios";
import { tokenConfig } from "../actionAuth";
import { actionCRUD, formatData } from "../actionCRUD";
import { createMessage, returnErrors } from "../actionMessages";
import { IMOVEL_UPDATEDATA, IMOVEL_UPDATELOG } from "../actionTypes";

export const actionCRUDImovel = new actionCRUD("imovel", process.env.REACT_APP_API_URL + "api/imovel/");

export const updateImovel = (objeto) => (dispatch, getState) => {
  // let headerWithValues = Object.assign({}, { params: file }, tokenConfig(getState));
  // .get(process.env.REACT_APP_API_URL + "api/geoitajai/", headerWithValues)
  const header = { "Content-Type": "multipart/form-data" };
  axios
    .post(
      process.env.REACT_APP_API_URL + "api/update-imovel/",
      formatData(objeto, header),
      tokenConfig(getState, header)
    )
    .then((res) => {
      dispatch({
        type: IMOVEL_UPDATEDATA,
        payload: res.data,
      });
      if (res.data.response === "Não Autorizado") {
        dispatch(createMessage({ ERROR: res.data.response }));
      } else {
        dispatch(createMessage({ SUCCESS: res.data.response }));
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err));
    });
};

export const updateImovelLog = () => (dispatch, getState) => {
  axios
    .get(process.env.REACT_APP_API_URL + "api/imovelupdatelog/", tokenConfig(getState))
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
