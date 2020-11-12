import React, { useEffect } from "react";
import NoticeAconcluir from "./NoticeAconcluir";
import SurveyAconcluir from "./SurveyAconcluir";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import "./index.css";

export default function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDSurveyEventType.read());
    const params = { unfinished: true };
    dispatch(actionCRUDNotice.read(params));
    dispatch(actionCRUDSurvey.read(params));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 m-2">
        <NoticeAconcluir />
        <SurveyAconcluir />
      </div>
    </div>
  );
}

export const AconcluirPanel = () => {
  return (
    <div className="container p-0">
      <div className="row row-cols-1 m-2">
        <NoticeAconcluir />
        <SurveyAconcluir />
      </div>
    </div>
  );
};
