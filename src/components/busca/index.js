import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import "./index.css";
import { actionCRUDUser } from "../../actions/user/actionUser";
import FormBusca from "./FormBusca";
import ModalFormEvent from "../calendario/ModalFormEvent";
import SurveyEventList from "../common/SurveyEventList";
import NoticeEventList from "../common/NoticeEventList";
import TaskBar from "../common/TaskBar";
import {
  filterNoticebyUnConcluded,
  filterNoticebyConcluded,
  filterSurveybyUnConcluded,
  filterSurveybyConcluded,
} from "../calendario/utils";

export default function () {
  const dispatch = useDispatch();
  const location = useLocation();
  const [imovelID, setImovelID] = useState("");

  const currentUser = useSelector((state) => state.user.users.current);
  const surveys = useSelector((state) =>
    state.survey.surveys.surveys.filter((notice) => {
      return notice.owner === currentUser.id;
    })
  );
  const notices = useSelector((state) =>
    state.notice.notices.notices.filter((notice) => {
      return notice.owner === currentUser.id;
    })
  );

  const surveysConcluded = useSelector((state) =>
    state.survey.surveys.surveys
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterSurveybyConcluded())
  );
  const noticesConcluded = useSelector((state) =>
    state.notice.notices.notices
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterNoticebyConcluded())
  );

  const surveysUnConcluded = useSelector((state) =>
    state.survey.surveys.surveys
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterSurveybyUnConcluded())
  );
  const noticesUnConcluded = useSelector((state) =>
    state.notice.notices.notices
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterNoticebyUnConcluded())
  );

  useEffect(() => {
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDSurveyEventType.read());
    let searchParams = new URLSearchParams(location.search);
    setImovelID(searchParams.get("imovel_id"));
    // const params = { search_address: searchParams.get("imovel_id") };
    // dispatch(actionCRUDNotice.read(params));
    // dispatch(actionCRUDSurvey.read(params));
  }, [dispatch, location]);

  const [state, setstate] = useState({
    start_date: "",
    end_date: "",
    imovel: "",
    imovel_id: "",
    identification: "",
    concluded: "",
    notice_event_type: 0,
    survey_event_type: 0,
  });

  return (
    <div className="container">
      <ModalFormEvent />
      <TaskBar />
      <FormBusca imovelID={imovelID} state={state} setstate={setstate} />
      <h5 className="p-2">Resultado:</h5>
      <div className="container-fluid">
        <div className="row no-gutters row-cols-1 row-cols-lg-2 justify-content-md-center">
          <div className="col col-12 col-lg-5">
            <NoticeEventList
              title="Autos:"
              notices={
                state.concluded === "1"
                  ? noticesConcluded
                  : state.concluded === "0"
                  ? noticesUnConcluded
                  : notices
              }
            />
          </div>
          <div className="col col-12 col-lg-5">
            <SurveyEventList
              title="Vistorias:"
              surveys={
                state.concluded === "1"
                  ? surveysConcluded
                  : state.concluded === "0"
                  ? surveysUnConcluded
                  : surveys
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
