import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Day.css";
import NoticeEvent from "./NoticeEvent";

import { filterNoticeDate } from "./utils";

const Day = ({ day }) => {
  const notices = useSelector((state) =>
    state.notice.notices.notices.filter(
      filterNoticeDate(day.format("YYYY-MM-DD"))
    )
  );

  return (
    <td className="">
      <div className="text-right pb-1">
        <button className="btn btn-primary btn-circle">
          {day.format("DD").toString()}
        </button>
      </div>
      {notices.map((notice) => (
        <NoticeEvent
          key={notice.date + "" + notice.id}
          notice={notice}
          day={day}
        />
      ))}
    </td>
  );
};

export default Day;
