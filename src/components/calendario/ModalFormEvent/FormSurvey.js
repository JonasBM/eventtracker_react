import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDSurvey } from "../../../actions/survey/actionSurvey";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { Form } from "react-final-form";
import {
  InputFormGroup,
  CheckboxFormGroup,
  SelectFormGroup,
  required,
} from "../../common/Forms";
import CommonModalFooter from "./CommonModalFooter";
import moment from "moment";

const FormSurvey = ({ survey }) => {
  const dispatch = useDispatch();
  const survey_event_types = useSelector(
    (state) => state.survey.survey_event_types.survey_event_types
  );

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar esta Vistoria de ";
    confirm_alert +=
      survey_event_types.find(
        (element) => element.id === survey.survey_event_type
      ).name + "?";
    confirm_alert += newLine;
    confirm_alert += "Nº: " + survey.identification;
    confirm_alert += newLine;
    confirm_alert += "Data: " + moment(survey.date).format("DD/MM/YYYY");
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDSurvey.delete(survey.id));
      bootstrap.Modal.getInstance(document.getElementById("ModalEvent")).hide();
    }
  };

  const confirmSave = () => {
    return true;
  };

  const onSubmit = (values) => {
    let criarnovo = values.criarnovo;
    delete values["criarnovo"];
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0 || criarnovo) {
        dispatch(actionCRUDSurvey.create(values));
        closeModal = true;
      } else {
        if (confirmSave(values)) {
          dispatch(actionCRUDSurvey.update(values));
          closeModal = true;
        }
      }
    }
    if (closeModal) {
      bootstrap.Modal.getInstance(document.getElementById("ModalEvent")).hide();
    }
  };

  return (
    <Form
      initialValues={survey}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="modal-body container">
            <div className="container">
              <InputFormGroup
                name="date"
                label="data:"
                type="date"
                validate={required}
              />
              <InputFormGroup
                name="address"
                label="endereço:"
                maxLength="255"
              />
              <InputFormGroup
                name="description"
                label="descrição:"
                component="textarea"
                cols="40"
                rows="3"
              />
              <InputFormGroup
                name="identification"
                label="identificação:"
                maxLength="255"
                validate={required}
              />
              <SelectFormGroup
                name="survey_event_type"
                label="tipo:"
                validate={required}
              >
                <option value="">---------</option>
                {survey_event_types.map((survey_event_type, index) => (
                  <option
                    key={survey_event_type.id}
                    value={survey_event_type.id}
                  >
                    {survey_event_type.order} - {survey_event_type.name}
                  </option>
                ))}
              </SelectFormGroup>
              <CheckboxFormGroup name="concluded" label="concluído" />
            </div>
          </div>
          <CommonModalFooter
            isEdit={
              survey !== undefined ? (survey.id !== 0 ? true : false) : false
            }
            onDelete={onDelete}
          />
        </form>
      )}
    />
  );
};

export default FormSurvey;
