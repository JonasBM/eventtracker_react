import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pt-br";

import "./Calendario.css";

import buildCalendar from "./utils";

import ModalEvent from "./ModalFormEvent/ModalEvent";

import Caption from "./Caption";
import Day from "./Day";

const Calendario = ({ momentdate }) => {
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {
    console.log("Calendario");
    moment.locale("pt-br");
    setCalendar(buildCalendar(momentdate));
  }, [momentdate]);

  return (
    <section>
      <ModalEvent />
      <table id="calendar" className="table table-light table-bordered">
        <Caption />
        <thead className="thead-dark">
          <tr className="text-center text-uppercase">
            {moment.weekdays().map((d, index) => (
              <th key={"week" + index} className="weekdays ">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, weekindex) => (
            <tr key={"week" + weekindex}>
              {week.map((day) => (
                <Day key={day.format("YYYY-MM-DD")} day={day}>
                  {day.format("D").toString()}
                </Day>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Calendario;
