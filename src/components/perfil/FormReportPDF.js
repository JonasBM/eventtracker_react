import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../common/Forms";

import { getReportPDF } from "../../actions/actionFiles";

const FormReportPDF = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(getReportPDF(values));
  };

  return (
    <Form
      initialValues={{
        month: moment().format("YYYY-MM"),
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h5>{"Baixar relatório"}</h5>
          <div className="form-inline">
            <InputFormGroup
              name="month"
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

export default FormReportPDF;
