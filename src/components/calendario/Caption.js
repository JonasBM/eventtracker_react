import React from "react";
import { newDate } from "../../actions/actionDate";
import moment from "moment";
import { useDispatch } from "react-redux";

const CalendarCaption = ({ momentdate }) => {
  const dispatch = useDispatch();
  const dateBackward = () => {
    dispatch(
      newDate(moment(momentdate.clone().subtract(1, "months").startOf("month")))
    );
  };
  const dateForward = () => {
    dispatch(
      newDate(moment(momentdate.clone().add(1, "months").startOf("month")))
    );
  };
  const dateToday = () => {
    dispatch(newDate(moment()));
  };

  return (
    <caption className="bg-primary text-center">
      <div className="float-left ml-2">
        <div className="btn-group" role="group">
          <button
            className="btn btn-secondary border-right"
            onClick={dateBackward}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            className="btn btn-secondary border-left"
            onClick={dateForward}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
        <button className="btn btn-secondary mx-2" onClick={dateToday}>
          Hoje
        </button>
      </div>
      <h4 className="text-uppercase font-weight-bold">
        {momentdate.format("MMMM Y")}
      </h4>
    </caption>
  );
};

export default CalendarCaption;
