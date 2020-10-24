import React from "react";
import { getNoticeEventType } from "./utils";
import { CompleteButton, MapButton, EventButton } from "./common";

const noticeEventName = (notice_event, showVA = false) => {
  console.log(notice_event);
  let notice_event_type = getNoticeEventType(notice_event);
  if (notice_event && notice_event_type) {
    if (notice_event_type.id !== 4 || showVA) {
      return (
        <span className="row no-gutters py-1 text-truncate d-inline-block font-weight-bold">
          {"A. " + notice_event_type.short_name + ": "}
          {notice_event.identification !== null && notice_event.identification}
        </span>
      );
    }
  }
  return (
    <span className="row no-gutters py-1 text-truncate d-inline-block font-weight-bold">
      TESTEEEEE
    </span>
  );
};

const NoticeButton = ({ notice, day }) => {
  return (
    <div className="row no-gutters event user-select-none text-truncate">
      <EventButton
        notice_id={notice.id}
        modalcall="notice"
        title={notice.address}
        day={day.format("YYYY-MM-DD")}
      >
        {notice.notice_events.map((notice_event) => (
          <div key={"noticeevent" + notice_event.id}>
            {notice_event.identification}
          </div>
        ))}
      </EventButton>
      <MapButton address={notice.address} />
    </div>
  );
};

const NoticeEventButton = ({ notice, day }) => {
  return notice.notice_events.map(
    (notice_event) =>
      notice_event.deadline_date === day.format("YYYY-MM-DD") && (
        <div
          key={"noticedeadline" + notice_event.id}
          className="row no-gutters event user-select-none text-truncate"
        >
          <EventButton
            notice_id={notice.id}
            modalcall="notice"
            title={notice.address}
            day={day.format("YYYY-MM-DD")}
          >
            {notice_event.identification}
          </EventButton>
          <CompleteButton href="/notice/conclude/" />
          <MapButton address={notice.address} />
        </div>
      )
  );
};

const NoticeEvent = ({ notice, day }) => {
  if (notice.date === day.format("YYYY-MM-DD")) {
    return <NoticeButton notice={notice} day={day} />;
  } else {
    return <NoticeEventButton notice={notice} day={day} />;
  }
};

export default NoticeEvent;
