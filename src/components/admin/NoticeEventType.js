import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";

const NoticeEventType = () => {
  const dispatch = useDispatch();
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );

  useEffect(() => {
    dispatch(actionCRUDNoticeEventType.read());
  }, [dispatch]);

  const onDelete = (notice_event_type) => {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar este Tipo de Auto?";
    confirm_alert += newLine;
    confirm_alert += "Tipo de Auto: " + notice_event_type.name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNoticeEventType.delete(notice_event_type.id));
    }
  };

  return (
    <table className="table table-sm table-light table-striped table-bordered my-2">
      <caption>
        Lista de Tipos de Autos e relacionados{" "}
        <button
          data-bs-toggle="modal"
          data-bs-target="#ModalNoticeType"
          data-modalcall="none"
          data-notice_type_id="0"
          type="button"
          className="btn btn-sm btn-outline-primary"
        >
          Adicionar
        </button>
      </caption>
      <thead className="thead-dark">
        <tr>
          <th scope="col" rowSpan="2">
            #
          </th>
          <th scope="col" rowSpan="2">
            Ordem
          </th>
          <th scope="col" rowSpan="2">
            Nome
          </th>
          <th scope="col" rowSpan="2">
            Abreviação
          </th>
          <th scope="col" colSpan="3">
            Padrão
          </th>
          <th scope="col" rowSpan="2">
            Cor
          </th>
          <th scope="col" colSpan="6">
            Mostrar
          </th>
          <th scope="col" rowSpan="2"></th>
        </tr>
        <tr>
          <th scope="col">Prazo (dias)</th>
          <th scope="col">Dias úteis</th>
          <th scope="col">Concluido</th>
          <th scope="col">Concluido</th>
          <th scope="col">RF</th>
          <th scope="col">Prazo</th>
          <th scope="col">Multa</th>
          <th scope="col">Recurso</th>
          <th scope="col">Na data de início</th>
        </tr>
      </thead>
      <tbody>
        {notice_event_types
          .sort((a, b) => a.order - b.order)
          .map((notice_event_type, index) => (
            <tr key={notice_event_type.id}>
              <td>{notice_event_type.id}</td>
              <td>{notice_event_type.order}</td>
              <td>{notice_event_type.name}</td>
              <td>{notice_event_type.short_name}</td>
              <td>{notice_event_type.default_deadline}</td>
              <td>
                {notice_event_type.default_deadline_working_days
                  ? "Sim"
                  : "Não"}
              </td>
              <td>{notice_event_type.default_concluded ? "Sim" : "Não"}</td>
              <td>
                {notice_event_type.css_color}
                <input
                  type="color"
                  disabled
                  className="mx-1"
                  value={
                    notice_event_type.css_color
                      ? notice_event_type.css_color
                      : ""
                  }
                />
              </td>
              <td>{notice_event_type.show_concluded ? "Sim" : "Não"}</td>
              <td>{notice_event_type.show_report_number ? "Sim" : "Não"}</td>
              <td>{notice_event_type.show_deadline ? "Sim" : "Não"}</td>
              <td>{notice_event_type.show_fine ? "Sim" : "Não"}</td>
              <td>{notice_event_type.show_appeal ? "Sim" : "Não"}</td>
              <td>{notice_event_type.show_start ? "Sim" : "Não"}</td>
              <td>
                <button
                  onClick={() => onDelete(notice_event_type)}
                  className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                  type="button"
                  title="Deletar tipo"
                >
                  <i className={"fa fa-trash"}></i>
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#ModalNoticeType"
                  data-modalcall="noticetype"
                  data-notice_type_id={notice_event_type.id}
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

export default NoticeEventType;
