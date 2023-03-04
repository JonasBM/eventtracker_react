import "moment/locale/pt-br";
import "./Calendario.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Caption from "./Caption";
import Day from "./Day";
import { actionCRUDActivity } from "../../actions/activity/actionActivity";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDNoticeColor } from "../../actions/notice/actionNoticeColor";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDNoticeEventTypeFile } from "../../actions/notice/actionNoticeEventTypeFile";
import { actionCRUDReport } from "../../actions/report/actionReport";
import { actionCRUDReportEventType } from "../../actions/report/actionReportEventType";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import { actionCRUDUser } from "../../actions/user/actionUser";
import buildCalendar from "./utils";
import moment from "moment";

const Calendario = ({ momentdate }) => {
  const [calendar, setCalendar] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.users.current);
  useEffect(() => {
    moment.locale("pt-br");
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDNoticeColor.read());
    dispatch(actionCRUDSurveyEventType.read());
    dispatch(actionCRUDReportEventType.read());
    dispatch(actionCRUDNoticeEventTypeFile.read());
    const params = {
      start_date: momentdate
        .clone()
        .startOf("month")
        .startOf("week")
        .format("YYYY-MM-DD"),
      end_date: momentdate
        .clone()
        .endOf("month")
        .endOf("week")
        .format("YYYY-MM-DD"),
      user_id: currentUser.id,
    };
    dispatch(actionCRUDNotice.read(params));
    dispatch(actionCRUDSurvey.read(params));
    dispatch(actionCRUDReport.read(params));
    dispatch(actionCRUDActivity.read(params));

    setCalendar(buildCalendar(momentdate));
  }, [dispatch, momentdate, currentUser]);

  return (
    <section>
      <table id="calendar" className="table table-light table-bordered">
        <Caption momentdate={momentdate} />
        <thead className="thead-dark">
          <tr className="text-center text-uppercase">
            {moment.weekdays().map((d, index) => (
              <th key={"week" + index} className="weekdays ">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, weekindex) => (
            <tr key={"week" + weekindex}>
              {week.map((day) => (
                <Day
                  key={day.format("YYYY-MM-DD")}
                  day={day}
                  momentdate={momentdate}
                >
                  {day.format("D").toString()}
                </Day>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Calendario;
