import React, { useEffect, useState } from "react";
import store from "../../../store";
import FormReportType from "./FormReportType";

export default function ModalFormReportType() {
  const [reportType, setReportType] = useState();

  const handleShowModal = (e) => {
    const reportTypes = store.getState().report.report_event_types
      .report_event_types;

    let reportType;
    if (e.relatedTarget.dataset.report_type_id !== "0") {
      reportType = reportTypes.find(
        (reportType) =>
          reportType.id.toString() === e.relatedTarget.dataset.report_type_id
      );
    }

    let MaxOrder = Math.max.apply(
      Math,
      store
        .getState()
        .report.report_event_types.report_event_types.filter((report) => {
          return report.order !== 99;
        })
        .map(function (report) {
          return report.order;
        })
    );
    if (MaxOrder === -Infinity) {
      MaxOrder = 0;
    }
    if (reportType !== undefined) {
      setReportType(reportType);
    } else {
      setReportType({
        id: 0,
        order: MaxOrder + 1,
        name: "",
        short_name: "",
        css_color: "#000000",
        resethack: [],
      });
    }
  };

  useEffect(() => {
    window.addEventListener("show.bs.modal", handleShowModal);
    return () => window.removeEventListener("show.bs.modal", handleShowModal);
  }, []);

  return (
    <div
      id="ModalReportType"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold">
              {reportType !== undefined
                ? reportType.id !== 0
                  ? "Editar " + reportType.name
                  : "Novo tipo de Relatório"
                : "Novo tipo de Relatório"}
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <FormReportType reportType={reportType} />
        </div>
      </div>
    </div>
  );
}
