import axios from "axios";
import { tokenConfig } from "../actionAuth";
import { actionCRUD } from "../actionCRUD";
import { returnErrors } from "../actionMessages";
import { NOTICE_GETLATEST } from "../actionTypes";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

export const actionCRUDNotice = new actionCRUD(
  "notice",
  process.env.REACT_APP_API_URL + "api/notice/"
);

export const getLatest = (imovel_id) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { params: { imovel_id: imovel_id } },
    tokenConfig(getState)
  );
  axios
    .get(process.env.REACT_APP_API_URL + "api/latestnotice/", headerWithValues)
    .then((res) => {
      dispatch({
        type: NOTICE_GETLATEST,
        payload: res.data,
      });
      if (res.data.imovel_id !== null) {
        bootstrap.Modal.getInstance(
          document.getElementById("ModalEvent")
        ).hide();
        setTimeout(() => {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("role", "button");
          b.setAttribute("data-bs-toggle", "modal");
          b.setAttribute("data-bs-target", "#ModalEvent");
          b.setAttribute("data-modalcall", "notice");
          b.setAttribute("data-notice_id", res.data.id);
          b.setAttribute("data-survey_id", "0");
          b.setAttribute("data-activity_id", "0");
          document.body.appendChild(b);
          b.click();
          b.parentNode.removeChild(b);
        }, 500);
      } else {
        dispatch(
          returnErrors("Não foi encontrado Autos passados neste imóvel")
        );
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err));
    });
};
