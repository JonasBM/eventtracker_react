import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormNotice from "./FormNotice";
import FormSurvey from "./FormSurvey";
import FormActivity from "./FormActivity";

const ModalEvent = () => {
  const notices = useSelector((state) => state.notice.notices.notices);
  const [notice, setNotice] = useState();
  const [survey, setSurvey] = useState();
  const [activity, setActivity] = useState();

  useEffect(() => {
    window.addEventListener("show.bs.modal", function (e) {
      setNotice(
        notices.find(
          (notice) => notice.id.toString() === e.relatedTarget.dataset.notice_id
        )
      );
    });
  }, [notices]);

  return (
    <div
      id="ModalEvent"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold" id="id_modal-header">
              Evento
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <nav>
            <div
              className="nav nav-tabs justify-content-center"
              id="nav-tab"
              role="tablist"
            >
              <a
                className="nav-item nav-link active font-weight-bold"
                id="nav-auto-tab"
                data-toggle="tab"
                href="#nav-auto"
                role="tab"
                aria-controls="nav-auto"
                aria-selected="true"
              >
                Autos
              </a>
              <a
                className="nav-item nav-link font-weight-bold"
                id="nav-vistoria-tab"
                data-toggle="tab"
                href="#nav-vistoria"
                role="tab"
                aria-controls="nav-vistoria"
                aria-selected="false"
              >
                Vistoria
              </a>
              <a
                className="nav-item nav-link font-weight-bold"
                id="nav-vistoria-tab"
                data-toggle="tab"
                href="#nav-atividade"
                role="tab"
                aria-controls="nav-atividade"
                aria-selected="false"
              >
                Atividade
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-auto"
              role="tabpanel"
              aria-labelledby="nav-auto-tab"
            >
              <FormNotice notice={notice} />
            </div>
            <div
              className="tab-pane fade"
              id="nav-vistoria"
              role="tabpanel"
              aria-labelledby="nav-vistoria-tab"
            >
              <FormSurvey survey={survey} />
            </div>
            <div
              className="tab-pane fade"
              id="nav-atividade"
              role="tabpanel"
              aria-labelledby="nav-atividade-tab"
            >
              <FormActivity activity={activity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEvent;
