import React from "react";
import { Form } from "react-final-form";
import {
  InputFormGroup,
  CheckboxFormGroup,
  SelectFormGroup,
} from "../common/Forms";
import { actionCRUDUser } from "../../actions/user/actionUser";
import { actionCRUDNoticeEventType } from "../../actions/notice/actionNoticeEventType";
import { actionCRUDSurveyEventType } from "../../actions/survey/actionSurveyEventType";
import AutocompleteImovel from "../common/AutocompleteImovel";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IconButton } from "../calendario/common";
import { useState } from "react";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { OnChange } from "react-final-form-listeners";

const FormBusca = ({ imovelID, state, setstate }) => {
  const dispatch = useDispatch();
  const survey_event_types = useSelector(
    (state) => state.survey.survey_event_types.survey_event_types
  );
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );

  const onSubmit = (values) => {
    console.log(values);
    if (values.notice_event_type !== "") {
      console.log("notice_event_type");
      dispatch(actionCRUDNotice.read(values));
    }
    if (values.survey_event_type !== "") {
      console.log("survey_event_type");
      dispatch(actionCRUDSurvey.read(values));
    }
  };

  useEffect(() => {
    dispatch(actionCRUDUser.read());
    dispatch(actionCRUDNoticeEventType.read());
    dispatch(actionCRUDSurveyEventType.read());
  }, [dispatch]);

  return (
    <Form
      initialValues={state}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        return (
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="modal-body container">
              <div className="container">
                <div className="form-inline">
                  <InputFormGroup
                    name="start_date"
                    label="Desde:"
                    type="date"
                    className="ml-1"
                    classNameDiv="mx-1"
                  />
                  <IconButton
                    icon={"fa-times-circle-o"}
                    onclick={() => {
                      form.mutators.setValue("start_date", "");
                    }}
                    title="Limpar data"
                  />
                  <InputFormGroup
                    name="end_date"
                    label="Até:"
                    type="date"
                    className="ml-1"
                    classNameDiv="mx-1"
                  />
                  <IconButton
                    icon={"fa-times-circle-o"}
                    onclick={() => {
                      form.mutators.setValue("end_date", "");
                    }}
                    title="Limpar data"
                  />
                </div>
                <AutocompleteImovel
                  name="imovel"
                  name_string="imovel.name_string"
                  label="Imóvel:"
                  form={form}
                />
                <div className="form-inline">
                  <InputFormGroup
                    name="identification"
                    label="Identificação/Nº:"
                    maxLength="255"
                    className="m-1"
                    classNameDiv="mx-1"
                  />
                  <SelectFormGroup
                    name="concluded"
                    label="Concluído:"
                    className="m-1"
                    classNameDiv="mx-1"
                  >
                    <option value="">Nenhum</option>
                    <option value="0">Não concluído</option>
                    <option value="1">Concluído</option>
                  </SelectFormGroup>
                  <OnChange name="concluded">
                    {(value, previous) => {
                      setstate({ ...state, concluded: value });
                    }}
                  </OnChange>
                </div>
                <div className="form-inline">
                  <SelectFormGroup
                    name="notice_event_type"
                    label="Tipo de Auto:"
                    className="m-1"
                    classNameDiv="mx-1"
                  >
                    <option value="">Nenhum</option>
                    <option value="0">Todos</option>
                    {notice_event_types.map((notice_event_type, index) => (
                      <option
                        key={notice_event_type.id}
                        value={notice_event_type.id}
                      >
                        {notice_event_type.order} - {notice_event_type.name}
                      </option>
                    ))}
                  </SelectFormGroup>
                  <SelectFormGroup
                    name="survey_event_type"
                    label="Tipo de Vistoria:"
                    className="m-1"
                    classNameDiv="mx-1"
                  >
                    <option value="">Nenhum</option>
                    <option value="0">Todos</option>
                    {survey_event_types.map((survey_event_type, index) => (
                      <option
                        key={survey_event_type.id}
                        value={survey_event_type.id}
                      >
                        {survey_event_type.order} - {survey_event_type.name}
                      </option>
                    ))}
                  </SelectFormGroup>
                </div>
              </div>
              <div className="row justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => {
                    form.reset();
                  }}
                  title="Recarregar"
                >
                  <i className="fa fa-refresh" />
                </button>
                <button type="submit" className="btn btn-primary">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};

export default FormBusca;
