import React from "react";
import { useSelector } from "react-redux";
import { getNoticeEventType } from "../calendario/utils";
import { filterNoticebyUnConcluded } from "../calendario/utils";
import { Link } from "react-router-dom";

const NoticeEventSpan = ({ notice_event }) => {
  let notice_event_type = getNoticeEventType(notice_event);
  if (notice_event && notice_event_type) {
    return (
      <span className="row no-gutters py-1 text-truncate d-inline-block font-weight-bold">
        {"A. " + notice_event_type.short_name + ": "}
        {notice_event.identification !== null && notice_event.identification}
        {" (" + notice_event.deadline_date + ")"}
      </span>
    );
  }
  return null;
};

const NoticeButton = ({ notice }) => {
  return (
    <Link
      className={
        "row no-gutters event user-select-none text-truncate text-decoration-none " +
        notice.css_class_name
      }
      to={"/#" + notice.date}
    >
      <div
        className="col p-1 text-truncate d-flex flex-column justify-content-center"
        title={notice.address}
      >
        <span className="d-inline-block font-weight-bold text-right">
          {notice.date}
        </span>
        {notice.notice_events.map((notice_event, index) => (
          <NoticeEventSpan key={notice_event.id} notice_event={notice_event} />
        ))}
      </div>
    </Link>
  );
};

const NoticeAconcluir = () => {
  const notices = useSelector((state) =>
    state.notice.notices.notices.filter(filterNoticebyUnConcluded())
  );

  return (
    <div className="col border p-2 m-1">
      <span>
        <strong>Autos à concluir:</strong>
      </span>
      {notices.map((notice) => (
        <NoticeButton key={notice.id} notice={notice} day={notice.date} />
      ))}
    </div>
  );
};

export default NoticeAconcluir;
