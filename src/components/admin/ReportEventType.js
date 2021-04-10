import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDReportEventType } from "../../actions/report/actionReportEventType";

const ReportEventType = () => {
  const dispatch = useDispatch();
  const report_event_types = useSelector(
    (state) => state.report.report_event_types.report_event_types
  );

  useEffect(() => {
    dispatch(actionCRUDReportEventType.read());
  }, [dispatch]);

  const onDelete = (report_event_type) => {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar este Tipo de Relatório?";
    confirm_alert += newLine;
    confirm_alert += "Tipo de Vistoria: " + report_event_type.name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDReportEventType.delete(report_event_type.id));
    }
  };

  return (
    <table className="table table-sm table-light table-striped table-bordered my-2">
      <caption>
        Lista de Tipos de Relatórios{" "}
        <button
          data-bs-toggle="modal"
          data-bs-target="#ModalReportType"
          data-modalcall="none"
          data-report_type_id="0"
          type="button"
          className="btn btn-sm btn-outline-primary"
        >
          Adicionar
        </button>
      </caption>
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ordem</th>
          <th scope="col">Nome</th>
          <th scope="col">Abreviação</th>
          <th scope="col">Cor</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {report_event_types
          .sort((a, b) => a.order - b.order)
          .map((report_event_type, index) => (
            <tr key={report_event_type.id}>
              <td>{report_event_type.id}</td>
              <td>{report_event_type.order}</td>
              <td>{report_event_type.name}</td>
              <td>{report_event_type.short_name}</td>
              <td>
                {report_event_type.css_color}
                <input
                  type="color"
                  disabled
                  className="mx-1"
                  value={
                    report_event_type.css_color
                      ? report_event_type.css_color
                      : ""
                  }
                />
              </td>
              <td>
                <button
                  onClick={() => onDelete(report_event_type)}
                  className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                  type="button"
                  title="Deletar tipo"
                >
                  <i className={"fa fa-trash"}></i>
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#ModalReportType"
                  data-modalcall="reporttype"
                  data-report_type_id={report_event_type.id}
                  className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                  type="button"
                  title="Editar tipo"
                >
                  <i className={"fa fa-pencil-square-o"}></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ReportEventType;
