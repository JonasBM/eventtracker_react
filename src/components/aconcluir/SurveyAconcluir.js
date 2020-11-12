import React from "react";
import { useSelector } from "react-redux";
import { getSurveyEventType } from "../calendario/utils";
import { filterSurveybyUnConcluded } from "../calendario/utils";
import { Link } from "react-router-dom";

const SurveyEventSpan = ({ survey }) => {
  let survey_event_type = getSurveyEventType(survey);
  if (survey && survey_event_type) {
    return (
      <span className="row no-gutters py-1 text-truncate d-inline-block font-weight-bold">
        {"V. " + survey_event_type.short_name + ": "}
        {survey.identification !== null && survey.identification}
      </span>
    );
  }
  return null;
};

const SurveyButton = ({ survey }) => {
  return (
    <Link
      className={
        "row no-gutters event user-select-none text-truncate text-decoration-none " +
        survey.css_class_name
      }
      to={"/#" + survey.date}
    >
      <div
        className="col p-1 text-truncate d-flex flex-column justify-content-center"
        title={survey.address}
      >
        <span className="d-inline-block font-weight-bold text-right">
          {survey.date}
        </span>
        <SurveyEventSpan survey={survey} />
      </div>
    </Link>
  );
};

const SurveyAconcluir = () => {
  const surveys = useSelector((state) =>
    state.survey.surveys.surveys.filter(filterSurveybyUnConcluded())
  );

  return (
    <div className="col border p-2 m-1">
      <span>
        <strong>Vistorias à concluir:</strong>
      </span>
      {surveys.map((survey) => (
        <SurveyButton key={survey.id} survey={survey} />
      ))}
    </div>
  );
};

export default SurveyAconcluir;
