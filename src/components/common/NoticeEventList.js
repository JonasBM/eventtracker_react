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

export const NoticeEventButton = ({ notice }) => {
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
    .filter((notice_event) => !notice_event.concluded)
    .map((notice_event) => (
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
          day={moment().format("YYYY-MM-DD")}
        >
          <NoticeEventSpan notice_event={notice_event} />
        </EventButton>
        <CompleteButton
          concluded={notice_event.concluded}
          onclick={isOwner ? () => completeTask(notice_event) : () => {}}
        />
        <GeoItajaiButton
          codigo={notice.imovel ? notice.imovel.lote.codigo : ""}
        />
        <MapButton
          address={
            notice.imovel
              ? notice.imovel.lote.logradouro +
                "," +
                notice.imovel.lote.numero +
                "-" +
                notice.imovel.lote.bairro +
                "-itajaí"
              : ""
          }
        />
      </div>
    ));
};

const NoticeAconcluir = ({ title, notices }) => {
  return (
    <div className="border p-2 m-1">
      <span>
        <strong>{title ? title : ""}</strong>
      </span>
      {notices &&
        notices.map((notice, index) => (
          <NoticeEventButton key={notice.id} notice={notice} />
        ))}
    </div>
  );
};

export default NoticeAconcluir;
