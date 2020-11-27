import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDNoticeColor } from "../../actions/notice/actionNoticeColor";

const NoticeColor = () => {
  const dispatch = useDispatch();
  const notice_colors = useSelector(
    (state) => state.notice.notice_colors.notice_colors
  );

  useEffect(() => {
    dispatch(actionCRUDNoticeColor.read());
  }, [dispatch]);

  const onDelete = (notice_color) => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar esta cor de Auto?";
    confirm_alert += newLine;
    confirm_alert += "Combinação: " + notice_color.css_name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNoticeColor.delete(notice_color.id));
    }
  };

  return (
    <table className="table table-sm table-light table-striped table-bordered my-2">
      <caption>
        Lista de Cores para data de início dos Autos e relacionados{" "}
        <button
          data-toggle="modal"
          data-target="#ModalNoticeColor"
          data-modalcall="none"
          data-notice_color_id="0"
          type="button"
          className="btn btn-sm btn-outline-primary"
        >
          Adicionar
        </button>
      </caption>
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Combinação</th>
          <th scope="col">Cor</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {notice_colors.map((notice_color, index) => (
          <tr key={notice_color.id}>
            <td>{notice_color.id}</td>
            <td>{notice_color.css_name}</td>
            <td>
              {notice_color.css_color}
              <input
                type="color"
                disabled
                className="mx-1"
                value={notice_color.css_color}
              />
            </td>
            <td>
              <button
                onClick={() => onDelete(notice_color)}
                className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                type="button"
                title="Deletar tipo"
              >
                <i className={"fa fa-trash"}></i>
              </button>
              <button
                data-toggle="modal"
                data-target="#ModalNoticeColor"
                data-modalcall="noticecolor"
                data-notice_color_id={notice_color.id}
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

export default NoticeColor;
