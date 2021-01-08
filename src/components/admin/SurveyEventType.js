import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";

const SurveyEventType = () => {
  const dispatch = useDispatch();
  const survey_event_types = useSelector(
    (state) => state.survey.survey_event_types.survey_event_types
  );

  useEffect(() => {
    dispatch(actionCRUDSurveyEventType.read());
  }, [dispatch]);

  const onDelete = (survey_event_type) => {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar este Tipo de Vistoria?";
    confirm_alert += newLine;
    confirm_alert += "Tipo de Vistoria: " + survey_event_type.name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDSurveyEventType.delete(survey_event_type.id));
    }
  };

  return (
    <table className="table table-sm table-light table-striped table-bordered my-2">
      <caption>
        Lista de Tipos de Vistorias{" "}
        <button
          data-bs-toggle="modal"
          data-bs-target="#ModalSurveyType"
          data-modalcall="none"
          data-survey_type_id="0"
          type="button"
          className="btn btn-sm btn-outline-primary"
        >
          Adicionar
        </button>
      </caption>
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ordem</th>
          <th scope="col">Nome</th>
          <th scope="col">Abreviação</th>
          <th scope="col">Cor</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {survey_event_types
          .sort((a, b) => a.order - b.order)
          .map((survey_event_type, index) => (
            <tr key={survey_event_type.id}>
              <td>{survey_event_type.id}</td>
              <td>{survey_event_type.order}</td>
              <td>{survey_event_type.name}</td>
              <td>{survey_event_type.short_name}</td>
              <td>
                {survey_event_type.css_color}
                <input
                  type="color"
                  disabled
                  className="mx-1"
                  value={
                    survey_event_type.css_color
                      ? survey_event_type.css_color
                      : ""
                  }
                />
              </td>
              <td>
                <button
                  onClick={() => onDelete(survey_event_type)}
                  className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                  type="button"
                  title="Deletar tipo"
                >
                  <i className={"fa fa-trash"}></i>
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#ModalSurveyType"
                  data-modalcall="surveytype"
                  data-survey_type_id={survey_event_type.id}
                  className="btn btn-outline-primary border-0 d-flex justify-content-center align-content-between p-1 mr-1 float-right"
                  type="button"
                  title="Editar tipo"
                >
                  <i className={"fa fa-pencil-square-o"}></i>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SurveyEventType;
