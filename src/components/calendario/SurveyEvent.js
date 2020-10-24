import React, { useEffect, useState } from "react";
import { CompleteButton, MapButton, EventButton } from "./common";
import { useSelector } from "react-redux";
import store from "../../store";
import { openNoticeModal } from "./utils";

const SurveyEventButton = ({ survey, day }) => {
  return (
    <div className="row no-gutters event user-select-none text-truncate">
      <EventButton
        survey_id={survey.id}
        modalcall="survey"
        title={survey.address}
        day={day.format("YYYY-MM-DD")}
      >
        {survey.identification}
      </EventButton>
      <CompleteButton href="/survey/conclude/" />
      <MapButton address={survey.address} />
    </div>
  );
};

const SurveyEvent = ({ survey, day }) => {
  return <SurveyEventButton survey={survey} day={day} />;
};

export default SurveyEvent;
