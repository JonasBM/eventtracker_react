import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";
import { useSelector } from "react-redux";
import store from "../../store";
import { openNoticeModal } from "./utils";

const getNoticeEventType = (notice_event) => {
  if (notice_event) {
    const notice_event_types = store.getState().notice.notice_event_types
      .notice_event_types;

    let notice_event_type = notice_event_types.filter(
      (notice_event_type) =>
        notice_event_type.id === notice_event.notice_event_type
    );
    return notice_event_type[0];
  }
};
const CompleteButton = ({ notice }) => {
  return <IconButton href="/survey/conclude/" icon="fa-check-square-o" />;
};

const MapButton = ({ notice }) => {
  return (
    <IconButton
      href={"https://www.google.com/maps/place/" + notice.address}
      icon="fa-map"
    />
  );
};

const EventButton = ({ notice, children }) => {
  return (
    <div
      className="col p-1 text-truncate d-flex flex-column justify-content-center"
      role="button"
      title={notice.address}
      data-toggle="modal"
      data-target="#ModalEvent"
      data-event="notice"
      data-notice_id={notice.id}
      data-survey_id="0"
      data-activity_id="0"
    >
      {children}
    </div>
  );
};

// const noticeEventName = (notice_event, showVA = false) => {
//   let arrayNames = [];
//   let notice_event_type = getNoticeEventType(notice_event);
//   if (notice_event && notice_event_type) {
//     if (notice_event_type.id !== 4 || showVA) {
//       arrayNames.push(
//         "A. " +
//           notice_event_type.short_name +
//           ": " +
//           notice_event.identification !==
//           null && notice_event.identification
//       );
//     }
//   }
//   return arrayNames;
// };

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
      <EventButton notice={notice}>
        {notice.notice_events.map((notice_event) => (
          <div key={"noticeevent" + notice_event.id}>
            {notice_event.identification}
          </div>
        ))}
      </EventButton>
      <MapButton notice={notice} />
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
          <EventButton notice={notice}>
            {notice_event.identification}
          </EventButton>
          <CompleteButton notice={notice} />
          <MapButton notice={notice} />
        </div>
      )
  );
};

const NoticeEvent = ({ notice, day }) => {
  if (notice.date === day.format("YYYY-MM-DD")) {
    return <NoticeButton notice={notice} />;
  } else {
    return <NoticeEventButton notice={notice} day={day} />;
  }
};

export default NoticeEvent;
