import React from "react";
import { useSelector } from "react-redux";
import "./Day.css";
import NoticeEvent from "./NoticeEvent";
import SurveyEvent from "./SurveyEvent";

import {
  filterNoticebyDate,
  filterSurveyByDate,
  filterActivityByDate,
} from "./utils";

const Day = ({ day }) => {
  const notices = useSelector((state) =>
    state.notice.notices.notices.filter(
      filterNoticebyDate(day.format("YYYY-MM-DD"))
    )
  );

  const surveys = useSelector((state) =>
    state.survey.surveys.surveys.filter(
      filterSurveyByDate(day.format("YYYY-MM-DD"))
    )
  );

  const activity = useSelector((state) =>
    state.activity.activitys.activitys.find(
      filterActivityByDate(day.format("YYYY-MM-DD"))
    )
  );
  return (
    <td className="">
      <div className="text-right pb-1">
        <button
          className="btn btn-primary btn-circle"
          data-toggle="modal"
          data-target="#ModalEvent"
          data-modalcall="none"
          data-notice_id="0"
          data-survey_id="0"
          data-activity_id={activity !== undefined ? activity.id : "0"}
          data-day={day.format("YYYY-MM-DD")}
        >
          {day.format("DD").toString()}
        </button>
      </div>
      {notices.map((notice) => (
        <NoticeEvent key={notice.id} notice={notice} day={day} />
      ))}
      {surveys.map((survey) => (
        <SurveyEvent key={survey.id} survey={survey} day={day} />
      ))}
    </td>
  );
};

export default Day;
