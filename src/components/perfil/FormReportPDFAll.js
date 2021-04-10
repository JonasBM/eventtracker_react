import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../common/Forms";

import { getReportPDFAll } from "../../actions/actionFiles.js";

const FormReportPDFAll = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(getReportPDFAll(values));
  };

  return (
    <Form
      initialValues={{
        month: moment().format("YYYY-MM"),
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h5>{"Baixar relatório geral da Auditoria"}</h5>
          <div className="form-inline">
            <InputFormGroup
              name="month"
              id="id_month_report_all"
              label="Referência: "
              type="month"
              className="m-1"
              validate={required}
            />
          </div>
          <div className="form-inline">
            <button
              type="submit"
              className="btn btn-primary font-weight-bold m-2"
            >
              Criar relatório
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default FormReportPDFAll;
