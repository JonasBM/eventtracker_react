import React, { useEffect, useState } from "react";
import FormNotice from "./FormNotice";
import FormSurvey from "./FormSurvey";
import FormActivity from "./FormActivity";
import store from "../../../store";

const ModalEventTab = ({ active, name }) => {
  return (
    <a
      className={
        "nav-item nav-link font-weight-bold text-capitalize" +
        (!active ? " disabled" : "")
      }
      id={"nav-" + name + "-tab"}
      data-toggle="tab"
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

const ModalEvent = () => {
  const [notice, setNotice] = useState();
  const [survey, setSurvey] = useState();
  const [activity, setActivity] = useState();

  const [tabstate, setTabstate] = useState({
    title: "Criar",
    noticetab: true,
    surveytab: true,
    activitytab: true,
  });

  const handleShowModal = (e) => {
    const notices = store.getState().notice.notices.notices;
    const surveys = store.getState().survey.surveys.surveys;
    const activitys = store.getState().activity.activitys.activitys;
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
        notice_events: [],
        date: e.relatedTarget.dataset.day,
        address: "",
        description: "",
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
        date: e.relatedTarget.dataset.day,
        identification: "",
        address: "",
        description: "",
        concluded: false,
        survey_event_type: "",
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
        description: "",
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
    return () => window.removeEventListener("show.bs.modal", handleShowModal);
  }, [tabstate]);

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
              {tabstate.title}
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
              <ModalEventTab active={tabstate.noticetab} name="auto" />
              <ModalEventTab active={tabstate.surveytab} name="vistoria" />
              <ModalEventTab active={tabstate.activitytab} name="atividade" />
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <ModalEventPanel name="auto">
              <FormNotice notice={notice} />
            </ModalEventPanel>
            <ModalEventPanel name="vistoria">
              <FormSurvey survey={survey} />
            </ModalEventPanel>
            <ModalEventPanel name="atividade">
              <FormActivity activity={activity} />
            </ModalEventPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEvent;
