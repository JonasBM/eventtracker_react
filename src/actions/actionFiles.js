import axios from "axios";
import { returnErrors, createMessage } from "./actionMessages";
import { tokenConfig } from "./actionAuth";
import store from "../store";
import { getNoticeEventType } from "../components/calendario/utils";

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

export const getReportPDFAll = (values) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { responseType: "blob", params: values },
    tokenConfig(getState)
  );
  let fileName = "relatório mensal de desempenho-" + values.month + ".pdf";
  try {
    axios
      .get(
        process.env.REACT_APP_API_URL + "api/reportpdfall/",
        headerWithValues
      )
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

export const downloadFileVARequestDocx = () => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    {
      responseType: "blob",
    },
    tokenConfig(getState)
  );

  try {
    axios
      .get(
        process.env.REACT_APP_API_URL + "api/filevarequestdocx/",
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
        fileLink.download = "va_padrao.docx";
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

export const uploadFileVARequestDocx = (values) => (dispatch, getState) => {
  console.log("ploadFileVARequestDocx:", values);
  let formData = new FormData();
  formData.append("va_padrao", values.va_padrao);
  try {
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/filevarequestdocx/",
        formData,
        tokenConfig(getState, { "Content-Type": "multipart/form-data" })
      )
      .then((res) => {
        dispatch(createMessage({ SUCCESS: res.data.detail }));
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const downloadFileRFRequestDocx = () => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    {
      responseType: "blob",
    },
    tokenConfig(getState)
  );

  try {
    axios
      .get(
        process.env.REACT_APP_API_URL + "api/filerfrequestdocx/",
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
        fileLink.download = "rf_padrao.docx";
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

export const uploadFileRFRequestDocx = (values) => (dispatch, getState) => {
  console.log("uploadFileRFRequestDocx:", values);
  let formData = new FormData();
  formData.append("rf_padrao", values.rf_padrao);
  try {
    axios
      .post(
        process.env.REACT_APP_API_URL + "api/filerfrequestdocx/",
        formData,
        tokenConfig(getState, { "Content-Type": "multipart/form-data" })
      )
      .then((res) => {
        dispatch(createMessage({ SUCCESS: res.data.detail }));
      })
      .catch((err) => {
        dispatch(returnErrors(err));
      });
  } catch (err) {
    console.log(err);
  }
};

export const downloadNotification = (
  notice_event_type_file,
  notice_event,
  notice_event_reference
) => (dispatch, getState) => {
  if (!notice_event || !notice_event_type_file) {
    return false;
  }
  let params = {
    notice_event_id: notice_event.id,
    notice_event_type_file_id: notice_event_type_file.id,
  };

  if (notice_event_reference) {
    params = {
      notice_event_id: notice_event.id,
      notice_event_type_file_id: notice_event_type_file.id,
      notice_event_reference: notice_event_reference,
    };
  }

  const notice_event_type = getNoticeEventType(notice_event);

  let headerWithValues = Object.assign(
    {},
    {
      responseType: "blob",
      params: params,
    },
    tokenConfig(getState)
  );

  let fileName =
    "Auto " +
    notice_event_type.name.toUpperCase() +
    "_" +
    notice_event.identification +
    "_" +
    notice_event_type_file.name +
    ".docx";

  fileName = fileName.replace(/[/\\?%*:|"<>,;=]/g, "-");

  try {
    axios
      .get(
        process.env.REACT_APP_API_URL + "api/downloadnotification/",
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
