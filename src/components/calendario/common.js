import React from "react";
import moment from "moment";

const IconButton = ({ href, icon }) => {
  return (
    <div className="col col-auto p-0 d-flex flex-column justify-content-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="btn btn-secondary d-flex justify-content-center align-content-between p-1 mr-1 float-right"
        type="button"
        title="Procurar endereço no GMaps"
      >
        <i className={"fa " + icon}></i>
      </a>
    </div>
  );
};

export const CompleteButton = ({ href }) => {
  return <IconButton href={href} icon="fa-check-square-o" />;
};

export const MapButton = ({ address }) => {
  return (
    <IconButton
      href={"https://www.google.com/maps/place/" + address}
      icon="fa-map"
    />
  );
};

export const EventButton = ({
  notice_id = "0",
  survey_id = "0",
  activity_id = "0",
  modalcall = "none",
  title = "",
  day = moment().format("YYYY-MM-DD"),
  children,
}) => {
  return (
    <div
      className="col p-1 text-truncate d-flex flex-column justify-content-center"
      role="button"
      title={title}
      data-toggle="modal"
      data-target="#ModalEvent"
      data-modalcall={modalcall}
      data-notice_id={notice_id}
      data-survey_id={survey_id}
      data-activity_id={activity_id}
      data-day={day}
    >
      {children}
    </div>
  );
};
