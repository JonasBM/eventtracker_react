import React, { useEffect, useState } from "react";
import store from "../../../store";
import { downloadNotification } from "../../../actions/actionFiles";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeEvent } from "../utils";

export default function ModalNoticeNotification() {
  const dispatch = useDispatch();

  const [noticeEventReference, setNoticeEventReference] = useState("");

  const [noticeEventType, setNoticeEventType] = useState();
  const [noticeEvent, setNoticeEvent] = useState();

  const notice_event_type_files = useSelector((state) =>
    state.notice.notice_event_type_files.notice_event_type_files.filter(
      function (notice_event_type_file) {
        if (noticeEventType) {
          return (
            notice_event_type_file.notice_event_type === noticeEventType.id
          );
        } else {
          return false;
        }
      }
    )
  );

  const handleShowModal = (e) => {
    const modalcall = e.relatedTarget.dataset.modalcall;
    if (modalcall !== "notification") {
      return false;
    }

    const noticeEventTypes = store.getState().notice.notice_event_types
      .notice_event_types;

    if (e.relatedTarget.dataset.notice_event_id !== "0") {
      setNoticeEvent(getNoticeEvent(e.relatedTarget.dataset.notice_event_id));
    }

    let noticeEventType;
    if (e.relatedTarget.dataset.notice_type_id !== "0") {
      noticeEventType = noticeEventTypes.find(
        (noticeEventType) =>
          noticeEventType.id.toString() ===
          e.relatedTarget.dataset.notice_type_id.toString()
      );
      setNoticeEventType(noticeEventType);
    }
    setNoticeEventReference("");
  };

  useEffect(() => {
    window.addEventListener("show.bs.modal", handleShowModal);
    return () => window.removeEventListener("show.bs.modal", handleShowModal);
  }, []);

  return (
    <div
      id="ModalNoticeNotification"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header p-2">
            <h6 className="modal-title font-weight-bold">
              Notificação de {noticeEventType && noticeEventType.name} -{" "}
              {noticeEvent && noticeEvent.identification}
            </h6>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="container p-3">
            <form>
              <div className="form-group form-inline">
                <label htmlFor="noticeReference">Auto descumprido:</label>
                <input
                  type="text"
                  className="form-control form-control-sm mx-1"
                  id="noticeReference"
                  aria-describedby="noticeReferenceHelp"
                  placeholder="Identificação"
                  value={noticeEventReference}
                  onChange={(e) => {
                    setNoticeEventReference(e.target.value);
                  }}
                />
                <small
                  id="noticeReferenceHelp"
                  className="form-text text-muted"
                >
                  Informe o numero do Auto descumprido para adicionar ao texto
                </small>
              </div>
              <span>Escolha o tipo de notificação para impressão:</span>
              {noticeEventType && notice_event_type_files.length > 0 ? (
                notice_event_type_files
                  .sort((a, b) => a.order - b.order)
                  .map((notice_event_type_file, index) => {
                    return (
                      <div className="m-1" key={notice_event_type_file.id}>
                        <button
                          className="btn btn-secondary btn-sm d-block w-100"
                          type="button"
                          onClick={() =>
                            dispatch(
                              downloadNotification(
                                notice_event_type_file,
                                noticeEvent,
                                noticeEventReference
                              )
                            )
                          }
                        >
                          {notice_event_type_file.name}
                        </button>
                      </div>
                    );
                  })
              ) : (
                <p>
                  Não há notificações para este tipo de Auto, por favor solicite
                  a um administrador o cadastro.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
