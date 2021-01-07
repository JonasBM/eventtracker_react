import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoticeEventType } from "../calendario/utils";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import moment from "moment";
import {
  CompleteButton,
  EventButton,
  GeoItajaiButton,
  MapButton,
} from "../calendario/common";

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

export const NoticeEventButton = ({ notice, concluded, notice_event_type }) => {
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

  const filterNoticeEventbyConcluded = (notice_event) => {
    let show_concluded;
    let notice_event_type = getNoticeEventType(notice_event);
    if (notice_event_type) {
      show_concluded = notice_event_type.show_concluded;
    } else {
      show_concluded = true;
    }
    if (concluded === "0") {
      if (show_concluded) {
        return !notice_event.concluded;
      } else {
        return false;
      }
    } else if (concluded === "1") {
      if (show_concluded) {
        return notice_event.concluded;
      } else {
        return true;
      }
    }
    return true;
  };

  const filterNoticeEventbyType = (notice_event) => {
    if (notice_event_type === "") {
      return false;
    }
    if (notice_event_type === "0") {
      return true;
    }
    if (notice_event.notice_event_type.toString() === notice_event_type) {
      return true;
    }
    return false;
  };

  return notice.notice_events
    .filter(filterNoticeEventbyType)
    .filter(filterNoticeEventbyConcluded)
    .map((notice_event) => {
      let notice_event_type = getNoticeEventType(notice_event);
      return (
        <div
          key={notice_event.id}
          style={{
            backgroundColor: notice_event_type
              ? notice_event_type.css_color
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
            day={moment().format("YYYY-MM-DD")}
          >
            <NoticeEventSpan notice_event={notice_event} />
          </EventButton>
          {notice_event_type && notice_event_type.show_concluded && (
            <CompleteButton
              concluded={notice_event.concluded}
              onclick={isOwner ? () => completeTask(notice_event) : () => {}}
            />
          )}
          <GeoItajaiButton
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
    });
};

const NoticeEventList = ({ title, concluded, notice_event_type }) => {
  const currentUser = useSelector((state) => state.user.users.current);
  const notices = useSelector((state) =>
    state.notice.notices.notices.filter((notice) => {
      return notice.owner === currentUser.id;
    })
  );
  return (
    <div className="border p-2 m-1">
      <span>
        <strong>{title ? title : ""}</strong>
      </span>
      {notices &&
        notices.map((notice) => (
          <NoticeEventButton
            key={notice.id}
            notice={notice}
            concluded={concluded}
            notice_event_type={notice_event_type}
          />
        ))}
    </div>
  );
};

export default NoticeEventList;
