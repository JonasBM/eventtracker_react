import React from "react";
import { getNoticeEventType, getAllNoticeConcluded } from "./utils";
import { CompleteButton, MapButton, EventButton } from "./common";
import { useDispatch } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";

const NoticeEventSpan = ({ notice_event, showVA = false }) => {
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
  return null;
};

const NoticeButton = ({ notice, day }) => {
  return (
    <div
      className={
        "row no-gutters event user-select-none text-truncate " +
        notice.css_class_name +
        (getAllNoticeConcluded(notice) ? " concluded" : "")
      }
    >
      <EventButton
        notice_id={notice.id}
        modalcall="notice"
        title={notice.address}
        day={day.format("YYYY-MM-DD")}
      >
        {notice.notice_events.map((notice_event, index) => (
          <NoticeEventSpan
            key={notice_event.id}
            notice_event={notice_event}
            showVA={false}
          />
        ))}
      </EventButton>
      <MapButton address={notice.address} />
    </div>
  );
};

const NoticeEventButton = ({ notice, day }) => {
  const dispatch = useDispatch();
  const completeTask = (notice_event) => {
    notice_event.end_concluded = !notice_event.end_concluded;
    dispatch(actionCRUDNotice.update(notice));
  };

  return notice.notice_events.map(
    (notice_event) =>
      notice_event.deadline_date === day.format("YYYY-MM-DD") && (
        <div
          key={notice_event.id}
          className={
            "row no-gutters event user-select-none text-truncate " +
            notice_event.css_class_name +
            (notice_event.end_concluded ? " concluded" : "")
          }
        >
          <EventButton
            notice_id={notice.id}
            modalcall="notice"
            title={notice.address}
            day={day.format("YYYY-MM-DD")}
          >
            <NoticeEventSpan notice_event={notice_event} showVA={true} />
          </EventButton>
          <CompleteButton
            concluded={notice_event.end_concluded}
            onclick={() => completeTask(notice_event)}
          />
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
