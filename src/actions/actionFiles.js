import axios from "axios";
import { returnErrors } from "./actionMessages";
import { tokenConfig } from "./actionAuth";

export const getReportPDF = (values) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { responseType: "blob", params: values },
    tokenConfig(getState)
  );
  let fileName = "relatório_mensal-" + values.month + ".pdf";
  try {
    axios
      .get(process.env.REACT_APP_API_URL + "api/reportpdf/", headerWithValues)
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
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

export const getSheetCSV = (values) => (dispatch, getState) => {
  let headerWithValues = Object.assign(
    {},
    { responseType: "blob", params: values },
    tokenConfig(getState)
  );
  let fileName = "planilha_mensal-" + values.month + ".csv";
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
