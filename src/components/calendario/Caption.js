import React from "react";

const CalendarCaption = () => {
  return (
    <caption className="bg-primary text-center">
      <div className="float-left ml-2">
        <div className="btn-group" role="group">
          <button className="btn btn-secondary border-right">
            <i className="fa fa-chevron-left"></i>
          </button>
          <button className="btn btn-secondary border-left">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
        <button className="btn btn-secondary mx-2">Hoje</button>
      </div>
      <h4 className="text-uppercase font-weight-bold"> </h4>
    </caption>
  );
};

export default CalendarCaption;
