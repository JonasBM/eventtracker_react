import {
  CompleteButton,
  EventButton,
  MapButton,
} from "./common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { getSurveyEventType } from "./utils";

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
  let survey_event_type = getSurveyEventType(survey);
  const dispatch = useDispatch();
  const authuser = useSelector((state) => state.auth.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && survey !== undefined) {
      setIsOwner(authuser.id === survey.owner);
    } else if (authuser === undefined) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  }, [authuser, survey]);

  const completeTask = () => {
    survey.concluded = !survey.concluded;
    dispatch(actionCRUDSurvey.update(survey));
  };
  return (
    <div
      style={{
        backgroundColor: survey_event_type
          ? survey_event_type.css_color
          : "green",
      }}
      className={
        "row no-gutters event user-select-none text-truncate " +
        (survey.concluded ? " concluded" : "")
      }
    >
      <EventButton
        survey_id={survey.id}
        modalcall="survey"
        title={survey.imovel ? survey.imovel.name_string : ""}
        day={day.format("YYYY-MM-DD")}
      >
        <SurveyEventSpan survey={survey} />
      </EventButton>
      <CompleteButton
        concluded={survey.concluded}
        onclick={isOwner ? () => completeTask() : () => {}}
        disabled={!isOwner}
      />
      {/* <GeoItajaiButton
        codigo_lote={survey.imovel ? survey.imovel.codigo_lote : ""}
      />
      <GeoItajaiAlvaraButton
        codigo_lote={survey.imovel ? survey.imovel.codigo_lote : ""}
      /> */}
      <MapButton
        address={
          survey.imovel
            ? survey.imovel.logradouro +
              "," +
              survey.imovel.numero +
              "-" +
              survey.imovel.bairro +
              "-itajaí"
            : ""
        }
      />
    </div>
  );
};

const SurveyEvent = ({ survey, day }) => {
  return <SurveyEventButton survey={survey} day={day} />;
};

export default SurveyEvent;
