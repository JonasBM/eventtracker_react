import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDNoticeColor } from "../../actions/notice/actionNoticeColor";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import { actionCRUDActivity } from "../../actions/activity/actionActivity";
import { actionCRUDUser } from "../../actions/user/actionUser";
import Day from "../calendario/Day";
import "./CalendarioTarefa.css";

const CalendarioTarefa = ({ momentdate }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    moment.locale("pt-br");
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDNoticeColor.read());
    dispatch(actionCRUDSurveyEventType.read());
    const params = {
      start_date: momentdate.clone().format("YYYY-MM-DD"),
      end_date: momentdate.clone().format("YYYY-MM-DD"),
    };
    dispatch(actionCRUDNotice.read(params));
    dispatch(actionCRUDSurvey.read(params));
    dispatch(actionCRUDActivity.read(params));
  }, [dispatch, momentdate]);

  return (
    <table id="calendartarefa" className="table table-light table-bordered ">
      <tbody>
        <tr>
          <Day day={momentdate} momentdate={momentdate}>
            {momentdate.format("D").toString()}
          </Day>
        </tr>
      </tbody>
    </table>
  );
};

export default CalendarioTarefa;
