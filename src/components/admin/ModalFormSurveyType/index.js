import React, { useEffect, useState } from "react";
import store from "../../../store";
import FormSurveyType from "./FormSurveyType";

export default function () {
  const [surveyType, setSurveyType] = useState();

  const handleShowModal = (e) => {
    const surveyTypes = store.getState().survey.survey_event_types
      .survey_event_types;

    let surveyType;
    if (e.relatedTarget.dataset.survey_type_id !== "0") {
      surveyType = surveyTypes.find(
        (surveyType) =>
          surveyType.id.toString() === e.relatedTarget.dataset.survey_type_id
      );
    }
    if (surveyType !== undefined) {
      setSurveyType(surveyType);
    } else {
      setSurveyType({
        id: 0,
        order: "",
        name: "",
        short_name: "",
        css_color: "",
        resethack: [],
      });
    }
  };

  useEffect(() => {
    window.addEventListener("show.bs.modal", handleShowModal);
    return () => window.removeEventListener("show.bs.modal", handleShowModal);
  }, []);

  return (
    <div
      id="ModalSurveyType"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold">
              {surveyType !== undefined
                ? surveyType.id !== 0
                  ? "Editar " + surveyType.name
                  : "Novo tipo de Vistoria"
                : "Novo tipo de Vistoria"}
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <FormSurveyType surveyType={surveyType} />
        </div>
      </div>
    </div>
  );
}
