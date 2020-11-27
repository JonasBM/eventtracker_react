import React from "react";
import SurveyEvent from "../calendario/SurveyEvent";
import moment from "moment";

const SurveyEventList = ({ title, surveys }) => {
  return (
    <div className="border p-2 m-1">
      <span>
        <strong>{title ? title : ""}</strong>
      </span>
      {surveys &&
        surveys.map((survey) => (
          <SurveyEvent
            key={survey.id}
            survey={survey}
            day={moment(survey.date)}
          />
        ))}
    </div>
  );
};

export default SurveyEventList;
