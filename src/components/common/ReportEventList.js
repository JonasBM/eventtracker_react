import React from "react";
import { useSelector } from "react-redux";
import ReportEvent from "../calendario/ReportEvent";
import moment from "moment";

const ReportEventList = ({ title, concluded, report_event_type }) => {
  const currentUser = useSelector((state) => state.user.users.current);
  const reports = useSelector((state) =>
    state.report.reports.reports.filter((notice) => {
      return notice.owner === currentUser.id;
    })
  );

  const filterReportEventbyConcluded = (report) => {
    if (concluded === "0") {
      return !report.concluded;
    } else if (concluded === "1") {
      return report.concluded;
    }
    return true;
  };

  const filterReportEventbyType = (report) => {
    if (report_event_type === "") {
      return false;
    }
    if (report_event_type === "0") {
      return true;
    }
    if (report.report_event_type.toString() === report_event_type) {
      return true;
    }
    return false;
  };

  return (
    <div className="border p-2 m-1">
      <span>
        <strong>{title ? title : ""}</strong>
      </span>
      {reports &&
        reports
          .filter(filterReportEventbyType)
          .filter(filterReportEventbyConcluded)
          .map((report) => (
            <ReportEvent
              key={report.id}
              report={report}
              day={moment(report.date)}
            />
          ))}
    </div>
  );
};

export default ReportEventList;
