import React, { useEffect, useState } from "react";
import store from "../../../store";
import FormNoticeColor from "./FormNoticeColor";

export default function ModalFormNoticeColor() {
  const [noticeColor, setNoticeColor] = useState();

  const handleShowModal = (e) => {
    const noticeColors = store.getState().notice.notice_colors.notice_colors;

    let noticeColor;
    if (e.relatedTarget.dataset.notice_color_id !== "0") {
      noticeColor = noticeColors.find(
        (noticeColor) =>
          noticeColor.id.toString() === e.relatedTarget.dataset.notice_color_id
      );
    }
    if (noticeColor !== undefined) {
      setNoticeColor(noticeColor);
    } else {
      setNoticeColor({
        id: 0,
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
      id="ModalNoticeColor"
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
              {noticeColor !== undefined
                ? noticeColor.id !== 0
                  ? "Editar " + noticeColor.name
                  : "Nova combinação para Cor"
                : "Nova combinação para Cor"}
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
          <FormNoticeColor noticeColor={noticeColor} />
        </div>
      </div>
    </div>
  );
}
