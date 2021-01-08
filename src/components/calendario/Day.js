import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Day.css";
import { NoticeButton, NoticeEventButton } from "./NoticeEvent";
import SurveyEvent from "./SurveyEvent";
import moment from "moment";
import {
  filterNoticebyDateStart,
  filterNoticebyDateDeadline,
  filterSurveyByDate,
  filterActivityByDate,
} from "./utils";

const Day = ({ day, momentdate }) => {
  const currentUser = useSelector((state) => state.user.users.current);

  const notices = useSelector((state) =>
    state.notice.notices.notices
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterNoticebyDateStart(day.format("YYYY-MM-DD")))
  );

  const notices_deadline = useSelector((state) =>
    state.notice.notices.notices
      .filter((notice) => {
        return notice.owner === currentUser.id;
      })
      .filter(filterNoticebyDateDeadline(day.format("YYYY-MM-DD")))
  );

  const surveys = useSelector((state) =>
    state.survey.surveys.surveys
      .filter((survey) => {
        return survey.owner === currentUser.id;
      })
      .filter(filterSurveyByDate(day.format("YYYY-MM-DD")))
  );

  const activity = useSelector((state) =>
    state.activity.activitys.activitys
      .filter((activity) => {
        return activity.owner === currentUser.id;
      })
      .find(filterActivityByDate(day.format("YYYY-MM-DD")))
  );

  const authuser = useSelector((state) => state.auth.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && activity !== undefined) {
      setIsOwner(authuser.id === activity.owner);
    } else if (authuser === undefined) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  }, [authuser, activity]);

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
    <td
      id={day.format("YYYY-MM-DD")}
      className={day.isSame(moment(), "day") ? "bg-dark" : ""}
    >
      <div className="text-right pb-1">
        <button
          className={
            "btn btn-circle" + (activity ? " btn-primary" : " btn-secondary")
          }
          data-bs-toggle="modal"
          data-bs-target="#ModalEvent"
          data-modalcall={
            isOwner
              ? activity !== undefined
                ? "activity"
                : "none"
              : "activity"
          }
          data-notice_id="0"
          data-survey_id="0"
          data-activity_id={activity !== undefined ? activity.id : "0"}
          data-day={day.format("YYYY-MM-DD")}
          disabled={
            activity !== undefined || authuser.id === currentUser.id
              ? ""
              : "disabled"
          }
        >
          {day.format("DD").toString()}
        </button>
      </div>
      {notices.map((notice) => (
        <NoticeButton key={notice.id} notice={notice} day={day} />
      ))}
      {notices_deadline.map((notice) => (
        <NoticeEventButton key={notice.id} notice={notice} day={day} />
      ))}
      {surveys.map((survey) => (
        <SurveyEvent key={survey.id} survey={survey} day={day} />
      ))}
    </td>
  );
};

export default Day;
