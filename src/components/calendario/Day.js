import "./Day.css";

import { NoticeButton, NoticeEventButton } from "./NoticeEvent";
import React, { useEffect, useState } from "react";
import {
  filterActivityByDate,
  filterNoticebyDateDeadline,
  filterNoticebyDateStart,
  filterReportByDate,
  filterSurveyByDate,
  hasPermission,
} from "./utils";

import ReportEvent from "./ReportEvent";
import SurveyEvent from "./SurveyEvent";
import moment from "moment";
import { useSelector } from "react-redux";

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

  const reports = useSelector((state) =>
    state.report.reports.reports
      .filter((report) => {
        return report.owner === currentUser.id;
      })
      .filter(filterReportByDate(day.format("YYYY-MM-DD")))
  );

  const activity = useSelector((state) =>
    state.activity.activitys.activitys
      .filter((activity) => {
        return activity.owner === currentUser.id;
      })
      .find(filterActivityByDate(day.format("YYYY-MM-DD")))
  );

  const authuser = useSelector((state) => state.auth.user);
  const [hasOwnerPermission, setHasOwnerPermission] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && activity !== undefined) {
      setHasOwnerPermission(hasPermission(authuser, activity.owner));
    } else if (authuser === undefined) {
      setHasOwnerPermission(false);
    } else {
      setHasOwnerPermission(true);
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
            hasOwnerPermission
              ? activity !== undefined
                ? "activity_all"
                : "none"
              : "activity"
          }
          data-notice_id="0"
          data-survey_id="0"
          data-report_id="0"
          data-activity_id={activity !== undefined ? activity.id : "0"}
          data-day={day.format("YYYY-MM-DD")}
          disabled={
            activity !== undefined || hasPermission(authuser, currentUser.id)
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
      {reports.map((report) => (
        <ReportEvent key={report.id} report={report} day={day} />
      ))}
    </td>
  );
};

export default Day;
