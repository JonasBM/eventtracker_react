import React, { useEffect, useState } from "react";
import store from "../../../store";
import FormNoticeTypeFile from "./FormNoticeTypeFile";

export default function ModalFormNoticeTypeFile() {
  const [noticeTypeFile, setNoticeTypeFile] = useState();

  const handleShowModal = (e) => {
    const noticeTypeFiles = store.getState().notice.notice_event_type_files
      .notice_event_type_files;

    let noticeTypeFile;
    if (e.relatedTarget.dataset.notice_type_id !== "0") {
      noticeTypeFile = noticeTypeFiles.find(
        (noticeTypeFile) =>
          noticeTypeFile.id.toString() ===
          e.relatedTarget.dataset.notice_type_file_id
      );
    }
    let MaxOrder = Math.max.apply(
      Math,
      store
        .getState()
        .notice.notice_event_type_files.notice_event_type_files.map(function (
          o
        ) {
          return o.order;
        })
    );
    if (MaxOrder === -Infinity) {
      MaxOrder = 0;
    }
    if (noticeTypeFile !== undefined) {
      setNoticeTypeFile(noticeTypeFile);
    } else {
      setNoticeTypeFile({
        id: 0,
        order: MaxOrder + 1,
        name: "",
        file_doc: null,
        notice_event_type: "1",
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
      id="ModalNoticeTypeFile"
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
              {noticeTypeFile !== undefined
                ? noticeTypeFile.id !== 0
                  ? "Editar " + noticeTypeFile.name
                  : "Nova Notificação de Auto"
                : "Nova Notificação de Auto"}
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
          <FormNoticeTypeFile noticeTypeFile={noticeTypeFile} />
        </div>
      </div>
    </div>
  );
}
