import React from "react";
import moment from "moment";

export const IconButton = ({ icon, href = null, onclick = null, title }) => {
  return (
    <div className="col col-auto p-0 d-flex flex-column justify-content-center">
      <a
        href={href}
        onClick={onclick}
        target="_blank"
        rel="noreferrer noopener"
        className="btn btn-secondary d-flex justify-content-center align-content-between p-1 mr-1 float-right"
        type="button"
        title={title}
      >
        <i className={"fa " + icon}></i>
      </a>
    </div>
  );
};

export const CompleteButton = ({ concluded, onclick }) => {
  return (
    <IconButton
      icon={concluded ? "fa-check-square-o" : "fa-square-o"}
      onclick={onclick}
      title="Marcar como finalizado"
    />
  );
};

export const MapButton = ({ address }) => {
  return (
    <IconButton
      href={"https://www.google.com/maps/place/" + address}
      icon="fa-map"
      title="Procurar endereço no GMaps"
    />
  );
};

export const GeoItajaiButton = ({ codigo }) => {
  return (
    <IconButton
      href={
        "https://geoitajai.github.io/geo/consultazoneamento_openlayers.html#" +
        codigo
      }
      icon="fa-file-text-o"
      title="Abrir no GeoItajaí"
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
