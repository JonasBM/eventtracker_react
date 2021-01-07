import axios from "axios";
import { returnErrors } from "./actionMessages";
import { tokenConfig } from "./actionAuth";
import store from "../store";

export const getReportPDF = (values) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { responseType: "blob", params: values },
    tokenConfig(getState)
  );
  let user = store
    .getState()
    .user.users.users.find(
      (user) => user.id.toString() === values.user_id.toString()
    );

  let user_name = "";
  if (user) {
    user_name = user.first_name;
    if (user.last_name) {
      user_name += " " + user.last_name;
    }
    user_name += "-";
  }
  let fileName = "relatório_mensal-" + user_name + values.month + ".pdf";
  try {
    axios
      .get(process.env.REACT_APP_API_URL + "api/reportpdf/", headerWithValues)
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.download = fileName;
        fileLink.click();
        URL.revokeObjectURL(fileURL);
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getSheetCSV = (values) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { responseType: "blob", params: values },
    tokenConfig(getState)
  );

  let user = store
    .getState()
    .user.users.users.find(
      (user) => user.id.toString() === values.user_id.toString()
    );

  let user_name = "";
  if (user) {
    user_name = user.first_name;
    if (user.last_name) {
      user_name += " " + user.last_name;
    }
    user_name += "-";
  }
  let fileName = "planilha_mensal-" + user_name + values.month + ".csv";
  try {
    axios
      .get(process.env.REACT_APP_API_URL + "api/sheetcsv/", headerWithValues)
      .then((response) => {
        const file = new Blob([response.data], { type: "text/csv" });
        const fileURL = URL.createObjectURL(file);
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        //fileLink.target = "_blank";
        fileLink.download = fileName;
        fileLink.click();
        URL.revokeObjectURL(fileURL);
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getnoticereportdocx = (notice) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { responseType: "blob", params: { notice_id: notice.id } },
    tokenConfig(getState)
  );
  let fileName = "relatório de Fiscalização.docx";
  try {
    axios
      .get(
        process.env.REACT_APP_API_URL + "api/noticereportdocx/",
        headerWithValues
      )
      .then((response) => {
        const file = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const fileURL = URL.createObjectURL(file);
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        //fileLink.target = "_blank";
        fileLink.download = fileName;
        fileLink.click();
        URL.revokeObjectURL(fileURL);
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getVArequestdocx = (vistoriaAdministrativa) => (
  dispatch,
  getState
) => {
  let headerWithValues = Object.assign(
    {},
    {
      responseType: "blob",
      params: { vistoria_administrativa_id: vistoriaAdministrativa.id },
    },
    tokenConfig(getState)
  );

  console.log(vistoriaAdministrativa.id);

  let fileName = "Pedido de VA.docx";
  try {
    axios
      .get(
        process.env.REACT_APP_API_URL + "api/varequestdocx/",
        headerWithValues
      )
      .then((response) => {
        const file = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const fileURL = URL.createObjectURL(file);
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        //fileLink.target = "_blank";
        fileLink.download = fileName;
        fileLink.click();
        URL.revokeObjectURL(fileURL);
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  } catch (err) {
    console.log(err);
  }
};
