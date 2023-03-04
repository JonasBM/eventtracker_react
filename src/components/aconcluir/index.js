import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import { actionCRUDReport } from "../../actions/report/actionReport";
import { actionCRUDReportEventType } from "../../actions/report/actionReportEventType";
import "./index.css";
import { actionCRUDNoticeColor } from "../../actions/notice/actionNoticeColor";
import { actionCRUDUser } from "../../actions/user/actionUser";
import ModalFormEvent from "../calendario/ModalFormEvent";
import TaskBar from "../common/TaskBar";
import NoticeEventList from "../common/NoticeEventList";
import SurveyEventList from "../common/SurveyEventList";
import ReportEventList from "../common/ReportEventList";

export default function Aconcluir() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDNoticeColor.read());
    dispatch(actionCRUDSurveyEventType.read());
    dispatch(actionCRUDReportEventType.read());
    const params = { concluded: "0" };
    dispatch(actionCRUDNotice.read(params));
    dispatch(actionCRUDSurvey.read(params));
    dispatch(actionCRUDReport.read(params));
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row no-gutters justify-content-md-center">
        <ModalFormEvent />
        <div className="col col-12 col-lg-9">
          <TaskBar />
          <div className="row row-cols-1 row-cols-lg-3">
            <div className="col">
              <NoticeEventList
                title="Autos a concluir:"
                concluded="0"
                notice_event_type="0"
              />
            </div>
            <div className="col">
              <SurveyEventList
                title="Vistorias a concluir:"
                concluded="0"
                survey_event_type="0"
              />
            </div>
            <div className="col">
              <ReportEventList
                title="Relatórios a concluir:"
                concluded="0"
                report_event_type="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
