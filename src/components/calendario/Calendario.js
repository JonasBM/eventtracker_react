import React, { useEffect, useState } from "react";
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
import "./Calendario.css";

import buildCalendar from "./utils";

import Caption from "./Caption";
import Day from "./Day";

const Calendario = ({ momentdate }) => {
  const [calendar, setCalendar] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    moment.locale("pt-br");
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDNoticeColor.read());
    dispatch(actionCRUDSurveyEventType.read());
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
    };
    dispatch(actionCRUDNotice.read(params));
    dispatch(actionCRUDSurvey.read(params));
    dispatch(actionCRUDActivity.read(params));

    setCalendar(buildCalendar(momentdate));
  }, [dispatch, momentdate]);

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
