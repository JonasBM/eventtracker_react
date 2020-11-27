import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { filterSurveybyUnConcluded } from "../calendario/utils";
import { filterNoticebyUnConcluded } from "../calendario/utils";

export default function () {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.users.current);
  const surveys = useSelector((state) =>
    state.survey.surveys.surveys
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterSurveybyUnConcluded())
  );
  const notices = useSelector((state) =>
    state.notice.notices.notices
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterNoticebyUnConcluded())
  );

  useEffect(() => {
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDNoticeColor.read());
    dispatch(actionCRUDSurveyEventType.read());
    const params = { unfinished: true };
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
              <NoticeEventList title="Autos a concluir:" notices={notices} />
            </div>
            <div className="col">
              <SurveyEventList
                title="Vistorias a concluir:"
                surveys={surveys}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
