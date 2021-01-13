import React, { useEffect, useState } from "react";
import store from "../../../store";
import FormNoticeType from "./FormNoticeType";

export default function () {
  const [noticeType, setNoticeType] = useState();

  const handleShowModal = (e) => {
    const noticeTypes = store.getState().notice.notice_event_types
      .notice_event_types;

    let noticeType;
    if (e.relatedTarget.dataset.notice_type_id !== "0") {
      noticeType = noticeTypes.find(
        (noticeType) =>
          noticeType.id.toString() === e.relatedTarget.dataset.notice_type_id
      );
    }
    let MaxOrder = Math.max.apply(
      Math,
      store
        .getState()
        .notice.notice_event_types.notice_event_types.map(function (o) {
          return o.order;
        })
    );
    if (noticeType !== undefined) {
      setNoticeType(noticeType);
    } else {
      setNoticeType({
        id: 0,
        order: MaxOrder + 1,
        name: "",
        short_name: "",
        default_deadline: "0",
        default_deadline_working_days: true,
        default_concluded: false,
        css_color: "#000000",
        show_concluded: true,
        show_report_number: true,
        show_deadline: true,
        show_fine: true,
        show_start: true,
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
      id="ModalNoticeType"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold">
              {noticeType !== undefined
                ? noticeType.id !== 0
                  ? "Editar " + noticeType.name
                  : "Novo tipo de Auto"
                : "Novo tipo de Auto"}
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
          <FormNoticeType noticeType={noticeType} />
        </div>
      </div>
    </div>
  );
}
