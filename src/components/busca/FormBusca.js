import React from "react";
import { Form } from "react-final-form";
import { InputFormGroup, SelectFormGroup } from "../common/Forms";
import AutocompleteImovel from "../common/AutocompleteImovel";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "../calendario/common";
import { actionCRUDNotice } from "../../actions/notice/actionNotice";
import { actionCRUDSurvey } from "../../actions/survey/actionSurvey";
import { actionCRUDReport } from "../../actions/report/actionReport";
import formatString from "format-string-by-pattern";

const FormBusca = ({ state, setstate }) => {
  const dispatch = useDispatch();
  const report_event_types = useSelector(
    (state) => state.report.report_event_types.report_event_types
  );
  const survey_event_types = useSelector(
    (state) => state.survey.survey_event_types.survey_event_types
  );
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );

  const onSubmit = (values) => {
    if (values.notice_event_type !== "") {
      dispatch(actionCRUDNotice.read(values));
    }
    if (values.survey_event_type !== "") {
      dispatch(actionCRUDSurvey.read(values));
    }
    if (values.report_event_type !== "") {
      dispatch(actionCRUDReport.read(values));
    }
    setstate(values);
  };

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
                  <InputFormGroup
                    name="document"
                    label="CPF/CNPJ:"
                    maxLength="255"
                    parse={(value) => {
                      if (!value) return value;
                      const onlyNumbers = value.replace(/[^\d]/g, "");
                      if (value.length > 14) {
                        return formatString("99.999.999/9999-99", onlyNumbers);
                      } else {
                        return formatString("999.999.999-99", onlyNumbers);
                      }
                    }}
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
                  <SelectFormGroup
                    name="report_event_type"
                    label="Tipo de Relatório:"
                    className="m-1"
                    classNameDiv="mx-1"
                  >
                    <option value="">Nenhum</option>
                    <option value="0">Todos</option>
                    {report_event_types.map((report_event_type, index) => (
                      <option
                        key={report_event_type.id}
                        value={report_event_type.id}
                      >
                        {report_event_type.order} - {report_event_type.name}
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
