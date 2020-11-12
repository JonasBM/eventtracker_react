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

const Day = ({ day, momentdate }) => {
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

  if (!momentdate.isSame(day, "month")) {
    return (
      <td id={day.format("YYYY-MM-DD")} className="opacity-4">
        <div className="text-right pb-1">
          <button className="btn btn-circle btn-secondary disabled">
            {day.format("DD").toString()}
          </button>
        </div>
      </td>
    );
  }

  return (
    <td id={day.format("YYYY-MM-DD")} className="">
      <div className="text-right pb-1">
        <button
          className={
            "btn btn-circle" + (activity ? " btn-primary" : " btn-secondary")
          }
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
