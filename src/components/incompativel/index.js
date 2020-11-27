import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import "./index.css";
import { actionCRUDNoticeColor } from "../../actions/notice/actionNoticeColor";
import { actionCRUDUser } from "../../actions/user/actionUser";
import ModalFormEvent from "../calendario/ModalFormEvent";
import TaskBar from "../common/TaskBar";
import NoticeEventList from "../common/NoticeEventList";
import SurveyEventList from "../common/SurveyEventList";

export default function () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDNoticeColor.read());
    dispatch(actionCRUDSurveyEventType.read());
    const params = { incompatible: true };
    dispatch(actionCRUDNotice.read(params));
    dispatch(actionCRUDSurvey.read(params));
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row no-gutters justify-content-md-center">
        <ModalFormEvent />
        <div className="col col-12 col-lg-9">
          <TaskBar />
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col">
              <NoticeEventList
                title="Autos sem imóvel:"
                concluded=""
                notice_event_type="0"
              />
            </div>
            <div className="col">
              <SurveyEventList
                title="Vistorias sem imóvel:"
                concluded=""
                survey_event_type="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
