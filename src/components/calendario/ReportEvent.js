import {
  CompleteButton,
  EventButton,
  MapButton,
} from "./common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCRUDReport } from "../../actions/report/actionReport";
import { getReportEventType } from "./utils";

const ReportEventSpan = ({ report }) => {
  let report_event_type = getReportEventType(report);
  if (report && report_event_type) {
    return (
      <span className="row no-gutters py-1 text-truncate d-inline-block font-weight-bold">
        {"R. " + report_event_type.short_name + ": "}
        {report.identification !== null && report.identification}
      </span>
    );
  }
  return null;
};

const ReportEventButton = ({ report, day }) => {
  let report_event_type = getReportEventType(report);
  const dispatch = useDispatch();
  const authuser = useSelector((state) => state.auth.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && report !== undefined) {
      setIsOwner(authuser.id === report.owner);
    } else if (authuser === undefined) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  }, [authuser, report]);

  const completeTask = () => {
    report.concluded = !report.concluded;
    dispatch(actionCRUDReport.update(report));
  };
  return (
    <div
      style={{
        backgroundColor: report_event_type
          ? report_event_type.css_color
          : "yellow",
      }}
      className={
        "row no-gutters event user-select-none text-truncate " +
        (report.concluded ? " concluded" : "")
      }
    >
      <EventButton
        report_id={report.id}
        modalcall="report"
        title={report.imovel ? report.imovel.name_string : ""}
        day={day.format("YYYY-MM-DD")}
      >
        <ReportEventSpan report={report} />
      </EventButton>
      <CompleteButton
        concluded={report.concluded}
        onclick={isOwner ? () => completeTask() : () => {}}
        disabled={!isOwner}
      />
      {/* <GeoItajaiButton
        codigo_lote={report.imovel ? report.imovel.codigo_lote : ""}
      />
      <GeoItajaiAlvaraButton
        codigo_lote={report.imovel ? report.imovel.codigo_lote : ""}
      /> */}
      <MapButton
        address={
          report.imovel
            ? report.imovel.logradouro +
              "," +
              report.imovel.numero +
              "-" +
              report.imovel.bairro +
              "-itajaí"
            : ""
        }
      />
    </div>
  );
};

const ReportEvent = ({ report, day }) => {
  return <ReportEventButton report={report} day={day} />;
};

export default ReportEvent;
