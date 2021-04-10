import React, { useState, useEffect } from "react";
import {
  getNoticeEventType,
  getAllNoticeConcluded,
  getNoticeColor,
} from "./utils";
import {
  CompleteButton,
  MapButton,
  EventButton,
  GeoItajaiButton,
  GeoItajaiAlvaraButton,
} from "./common";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";

const NoticeEventSpan = ({ notice_event, day }) => {
  let notice_event_type = getNoticeEventType(notice_event);
  if (notice_event && day && notice_event_type) {
    if (
      (notice_event.date === day.format("YYYY-MM-DD") &&
        notice_event_type.show_start) ||
      notice_event.deadline_date === day.format("YYYY-MM-DD")
    ) {
      return (
        <span
          className={
            "row no-gutters py-1 text-truncate d-inline-block" +
            (notice_event.is_frozen ? " text-white" : " font-weight-bold")
          }
        >
          {"A. " + notice_event_type.short_name + ": "}
          {notice_event.identification !== null && notice_event.identification}
        </span>
      );
    }
  }
  return null;
};

export const NoticeButton = ({ notice, day }) => {
  return (
    <div
      style={{
        backgroundColor: getNoticeColor(notice)
          ? getNoticeColor(notice).css_color
          : "red",
      }}
      className={
        "row no-gutters event user-select-none text-truncate" +
        (getAllNoticeConcluded(notice) ? " concluded" : "")
      }
    >
      <EventButton
        notice_id={notice.id}
        modalcall="notice"
        title={notice.imovel ? notice.imovel.name_string : ""}
        day={day.format("YYYY-MM-DD")}
      >
        {notice.notice_events
          .filter(
            (notice_event) => notice_event.date === day.format("YYYY-MM-DD")
          )
          .map((notice_event, index) => (
            <NoticeEventSpan
              key={notice_event.id}
              notice_event={notice_event}
              day={day}
            />
          ))}
      </EventButton>
      <GeoItajaiButton
        codigo_lote={notice.imovel ? notice.imovel.codigo_lote : ""}
      />
      <GeoItajaiAlvaraButton
        codigo_lote={notice.imovel ? notice.imovel.codigo_lote : ""}
      />
      <MapButton
        address={
          notice.imovel
            ? notice.imovel.logradouro +
              "," +
              notice.imovel.numero +
              "-" +
              notice.imovel.bairro +
              "-itajaí"
            : ""
        }
      />
    </div>
  );
};

export const NoticeEventButton = ({ notice, day }) => {
  const dispatch = useDispatch();
  const authuser = useSelector((state) => state.auth.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && notice !== undefined) {
      setIsOwner(authuser.id === notice.owner);
    } else if (authuser === undefined) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  }, [authuser, notice]);

  const completeTask = (notice_event) => {
    notice_event.concluded = !notice_event.concluded;
    dispatch(actionCRUDNotice.update(notice));
  };

  return notice.notice_events
    .filter(
      (notice_event) => notice_event.deadline_date === day.format("YYYY-MM-DD")
    )
    .map((notice_event) => {
      let notice_event_type = getNoticeEventType(notice_event);
      if (notice_event_type) {
        if (notice_event_type.show_deadline && !notice_event.is_frozen) {
          return (
            notice_event.deadline_date === day.format("YYYY-MM-DD") && (
              <div
                key={notice_event.id}
                style={{
                  backgroundColor: getNoticeEventType(notice_event)
                    ? getNoticeEventType(notice_event).css_color
                    : "blue",
                }}
                className={
                  "row no-gutters event user-select-none text-truncate" +
                  (notice_event.concluded ? " concluded" : "")
                }
              >
                <EventButton
                  notice_id={notice.id}
                  modalcall="notice"
                  title={notice.imovel ? notice.imovel.name_string : ""}
                  day={day.format("YYYY-MM-DD")}
                >
                  <NoticeEventSpan notice_event={notice_event} day={day} />
                </EventButton>
                <CompleteButton
                  concluded={notice_event.concluded}
                  onclick={
                    isOwner ? () => completeTask(notice_event) : () => {}
                  }
                />
                <GeoItajaiButton
                  codigo_lote={notice.imovel ? notice.imovel.codigo_lote : ""}
                />
                <GeoItajaiAlvaraButton
                  codigo_lote={notice.imovel ? notice.imovel.codigo_lote : ""}
                />
                <MapButton
                  address={
                    notice.imovel
                      ? notice.imovel.logradouro +
                        "," +
                        notice.imovel.numero +
                        "-" +
                        notice.imovel.bairro +
                        "-itajaí"
                      : ""
                  }
                />
              </div>
            )
          );
        }
      }
      return null;
    });
};

// deprecated
const NoticeEvent = ({ notice, day }) => {
  if (notice.date === day.format("YYYY-MM-DD")) {
    return <NoticeButton notice={notice} day={day} />;
  } else {
    return <NoticeEventButton notice={notice} day={day} />;
  }
};

export default NoticeEvent;
