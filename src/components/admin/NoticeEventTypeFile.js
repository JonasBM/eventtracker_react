import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDNoticeEventTypeFile } from "../../actions/notice/actionNoticeEventTypeFile";

const NoticeEventTypeFile = () => {
  const dispatch = useDispatch();
  const notice_event_type_files = useSelector(
    (state) => state.notice.notice_event_type_files.notice_event_type_files
  );
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );

  useEffect(() => {
    dispatch(actionCRUDNoticeEventTypeFile.read());
  }, [dispatch]);

  const onDelete = (notice_event_type_file) => {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar esta Notificação de Auto?";
    confirm_alert += newLine;
    confirm_alert += "Notificação de Auto: " + notice_event_type_file.name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNoticeEventTypeFile.delete(notice_event_type_file.id));
    }
  };

  return (
    <table className="table table-sm table-light table-striped table-bordered my-2">
      <caption>
        Lista de Notificações de Autos{" "}
        <button
          data-bs-toggle="modal"
          data-bs-target="#ModalNoticeTypeFile"
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
          <th scope="col">#</th>
          <th scope="col">Ordem</th>
          <th scope="col">Nome</th>
          <th scope="col">Tipo de Auto</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {notice_event_type_files
          .sort((a, b) => a.order - b.order)
          .map((notice_event_type_file, index) => {
            let notice_event_type = notice_event_types.find(
              (notice_event_type) =>
                notice_event_type.id ===
                notice_event_type_file.notice_event_type
            );

            let notice_event_type_file_link = notice_event_type_file.file_doc;
            if (!notice_event_type_file_link.startsWith("https")) {
              notice_event_type_file_link = notice_event_type_file_link.replace(
                "http",
                "https"
              );
            }
            return (
              <tr key={notice_event_type_file.id}>
                <td>{notice_event_type_file.id}</td>
                <td>{notice_event_type_file.order}</td>
                <td>
                  <a
                    href={notice_event_type_file_link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {notice_event_type_file.name}
                  </a>
                </td>
                <td>{notice_event_type && notice_event_type.name}</td>
                <td>
                  <button
                    onClick={() => onDelete(notice_event_type_file)}
                    className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                    type="button"
                    title="Deletar Notificação"
                  >
                    <i className={"fa fa-trash"}></i>
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#ModalNoticeTypeFile"
                    data-modalcall="noticetypefile"
                    data-notice_type_file_id={notice_event_type_file.id}
                    className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                    type="button"
                    title="Editar Notificação"
                  >
                    <i className={"fa fa-pencil-square-o"}></i>
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default NoticeEventTypeFile;
