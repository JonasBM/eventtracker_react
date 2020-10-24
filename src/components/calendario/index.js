import React, { useState, useEffect } from "react";
import moment from "moment";
import Calendario from "./Calendario";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import { actionCRUDActivity } from "../../actions/activity/actionActivity";
import { getDateFromString } from "./utils";

export default function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCRUDNotice.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDSurvey.read());
    dispatch(actionCRUDSurveyEventType.read());
    dispatch(actionCRUDActivity.read());
  }, [dispatch]);

  let thedate = new Date();
  if (window.location.hash !== "") {
    thedate = getDateFromString(window.location.hash.substring(1));
  }
  const [momentdate, setMomentdate] = useState(moment(thedate));
  return <Calendario momentdate={momentdate} onChange={setMomentdate} />;
}
