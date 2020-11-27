import React from "react";
import { useSelector } from "react-redux";
import SurveyEvent from "../calendario/SurveyEvent";
import moment from "moment";

const SurveyEventList = ({ title, concluded, survey_event_type }) => {
  const currentUser = useSelector((state) => state.user.users.current);
  const surveys = useSelector((state) =>
    state.survey.surveys.surveys.filter((notice) => {
      return notice.owner === currentUser.id;
    })
  );

  const filterSurveyEventbyConcluded = (survey) => {
    if (concluded === "0") {
      return !survey.concluded;
    } else if (concluded === "1") {
      return survey.concluded;
    }
    return true;
  };

  const filterSurveyEventbyType = (survey) => {
    if (survey_event_type === "") {
      return false;
    }
    if (survey_event_type === "0") {
      return true;
    }
    if (survey.survey_event_type.toString() === survey_event_type) {
      return true;
    }
    return false;
  };

  return (
    <div className="border p-2 m-1">
      <span>
        <strong>{title ? title : ""}</strong>
      </span>
      {surveys &&
        surveys
          .filter(filterSurveyEventbyType)
          .filter(filterSurveyEventbyConcluded)
          .map((survey) => (
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
