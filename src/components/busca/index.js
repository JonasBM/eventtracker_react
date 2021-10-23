import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import { actionCRUDReportEventType } from "../../actions/report/actionReportEventType";
import "./index.css";
import { actionCRUDUser } from "../../actions/user/actionUser";
import FormBusca from "./FormBusca";
import ModalFormEvent from "../calendario/ModalFormEvent";
import ReportEventList from "../common/ReportEventList";
import SurveyEventList from "../common/SurveyEventList";
import NoticeEventList from "../common/NoticeEventList";
import TaskBar from "../common/TaskBar";
import moment from "moment";

export default function Busca() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [state, setstate] = useState({
    start_date: moment().startOf("month").format("YYYY-MM-DD"),
    end_date: moment().endOf("month").format("YYYY-MM-DD"),
    imovel: "",
    imovel_id: "",
    identification: "",
    concluded: "",
    notice_event_type: "0",
    survey_event_type: "0",
    report_event_type: "0",
  });

  useEffect(() => {
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDSurveyEventType.read());
    dispatch(actionCRUDReportEventType.read());
  }, [dispatch, location]);

  return (
    <div className="container">
      <ModalFormEvent />
      <TaskBar />
      <FormBusca state={state} setstate={setstate} />
      <h5 className="p-2">Resultado:</h5>
      <div className="container-fluid">
        <div className="row no-gutters row-cols-1 row-cols-lg-3 justify-content-md-center">
          <div className="col col-12 col-lg-4">
            <NoticeEventList
              title="Autos:"
              concluded={state.concluded}
              notice_event_type={state.notice_event_type}
            />
          </div>
          <div className="col col-12 col-lg-4">
            <SurveyEventList
              title="Vistorias:"
              concluded={state.concluded}
              survey_event_type={state.survey_event_type}
            />
          </div>
          <div className="col col-12 col-lg-4">
            <ReportEventList
              title="Relatórios:"
              concluded={state.concluded}
              report_event_type={state.report_event_type}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
