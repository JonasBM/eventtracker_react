import React from "react";
import { CompleteButton, MapButton, EventButton } from "./common";
import { useDispatch } from "react-redux";
import { getSurveyEventType } from "./utils";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";

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

const SurveyEventButton = ({ survey, day }) => {
  const dispatch = useDispatch();
  const completeTask = () => {
    survey.concluded = !survey.concluded;
    dispatch(actionCRUDSurvey.update(survey));
  };
  return (
    <div
      className={
        "row no-gutters event user-select-none text-truncate " +
        survey.css_class_name +
        (survey.concluded ? " concluded" : "")
      }
    >
      <EventButton
        survey_id={survey.id}
        modalcall="survey"
        title={survey.address}
        day={day.format("YYYY-MM-DD")}
      >
        <SurveyEventSpan survey={survey} />
      </EventButton>
      <CompleteButton
        concluded={survey.concluded}
        onclick={() => completeTask()}
      />
      <MapButton address={survey.address} />
    </div>
  );
};

const SurveyEvent = ({ survey, day }) => {
  return <SurveyEventButton survey={survey} day={day} />;
};

export default SurveyEvent;
