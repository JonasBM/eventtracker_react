import React, { useEffect, useState } from "react";
import FormNotice from "./FormNotice";
import FormSurvey from "./FormSurvey";
import FormActivity from "./FormActivity";
import store from "../../../store";
import moment from "moment";

const ModalEventTab = ({ active, name }) => {
  return (
    <a
      className={
        "nav-item nav-link font-weight-bold text-capitalize" +
        (!active ? " disabled" : "")
      }
      id={"nav-" + name + "-tab"}
      data-bs-toggle="tab"
      href={"#nav-" + name}
      role="tab"
      aria-controls={"nav-" + name}
    >
      {name}
    </a>
  );
};

const ModalEventPanel = ({ name, children }) => {
  return (
    <div
      className="tab-pane fade"
      id={"nav-" + name}
      role="tabpanel"
      aria-labelledby={"nav-" + name + "-tab"}
    >
      {children}
    </div>
  );
};

export default function () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [notice, setNotice] = useState();
  const [survey, setSurvey] = useState();
  const [activity, setActivity] = useState();

  const [tabstate, setTabstate] = useState({
    title: "Criar",
    noticetab: true,
    surveytab: true,
    activitytab: true,
  });

  const [date, setDate] = useState();

  const handleShowModal = (e) => {
    const currentUser = store.getState().user.users.current;

    const notices = store.getState().notice.notices.notices;
    const surveys = store.getState().survey.surveys.surveys;
    const activitys = store.getState().activity.activitys.activitys;

    setDate(moment(e.relatedTarget.dataset.day));

    let notice;
    if (e.relatedTarget.dataset.notice_id !== "0") {
      notice = notices.find(
        (notice) => notice.id.toString() === e.relatedTarget.dataset.notice_id
      );
    }
    if (notice !== undefined) {
      setNotice(notice);
    } else {
      setNotice({
        id: 0,
        imovel: null,
        imovel_id: null,
        document: null,
        date: e.relatedTarget.dataset.day,
        address: null,
        description: null,
        owner: currentUser.id,
        notice_events: [],
        css_name: null,
        resethack: [],
      });
    }
    let survey;
    if (e.relatedTarget.dataset.survey_id !== "0") {
      survey = surveys.find(
        (survey) => survey.id.toString() === e.relatedTarget.dataset.survey_id
      );
    }
    if (survey !== undefined) {
      setSurvey(survey);
    } else {
      setSurvey({
        id: 0,
        imovel: null,
        imovel_id: null,
        document: null,
        identification: null,
        date: e.relatedTarget.dataset.day,
        survey_event_type: null,
        address: null,
        description: null,
        concluded: false,
        owner: currentUser.id,
        resethack: [],
      });
    }
    let activity;
    if (e.relatedTarget.dataset.activity_id !== "0") {
      activity = activitys.find(
        (activity) =>
          activity.id.toString() === e.relatedTarget.dataset.activity_id
      );
    }
    if (activity !== undefined) {
      setActivity(activity);
    } else {
      setActivity({
        id: 0,
        date: e.relatedTarget.dataset.day,
        owner: currentUser.id,
        description: null,
        resethack: [],
      });
    }
    if (e.relatedTarget.dataset.modalcall === "notice") {
      setTabstate({
        title: "Editar Auto",
        noticetab: true,
        surveytab: false,
        activitytab: false,
      });
    }
    if (e.relatedTarget.dataset.modalcall === "survey") {
      setTabstate({
        title: "Editar Vistoria",
        noticetab: false,
        surveytab: true,
        activitytab: false,
      });
    }
    if (e.relatedTarget.dataset.modalcall === "activity") {
      setTabstate({
        title: "Editar Atividade",
        noticetab: false,
        surveytab: false,
        activitytab: true,
      });
    }
    if (e.relatedTarget.dataset.modalcall === "none") {
      setTabstate({
        title: "Criar",
        noticetab: true,
        surveytab: true,
        activitytab: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleHiddenModal = (e) => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (tabstate.noticetab && !tabstate.surveytab && !tabstate.activitytab) {
      document.getElementById("nav-auto-tab").click();
    } else if (
      !tabstate.noticetab &&
      tabstate.surveytab &&
      !tabstate.activitytab
    ) {
      document.getElementById("nav-vistoria-tab").click();
    } else if (
      !tabstate.noticetab &&
      !tabstate.surveytab &&
      tabstate.activitytab
    ) {
      document.getElementById("nav-atividade-tab").click();
    } else {
      document.getElementById("nav-auto-tab").click();
    }
    window.addEventListener("show.bs.modal", handleShowModal);
    window.addEventListener("hidden.bs.modal", handleHiddenModal);
    return () => {
      window.removeEventListener("show.bs.modal", handleShowModal);
      window.removeEventListener("hidden.bs.modal", handleHiddenModal);
    };
  }, [tabstate]);

  return (
    <div
      id="ModalEvent"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold" id="id_modal-header">
              {tabstate.title}
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
          <nav>
            <div
              className="nav nav-tabs justify-content-center"
              id="nav-tab"
              role="tablist"
            >
              <ModalEventTab active={tabstate.noticetab} name="auto" />
              <ModalEventTab active={tabstate.surveytab} name="vistoria" />
              <ModalEventTab active={tabstate.activitytab} name="atividade" />
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <ModalEventPanel name="auto">
              <FormNotice
                notice={notice}
                day={date}
                isModalOpen={isModalOpen}
              />
            </ModalEventPanel>
            <ModalEventPanel name="vistoria">
              <FormSurvey
                survey={survey}
                day={date}
                isModalOpen={isModalOpen}
              />
            </ModalEventPanel>
            <ModalEventPanel name="atividade">
              <FormActivity
                activity={activity}
                day={date}
                isModalOpen={isModalOpen}
              />
            </ModalEventPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
