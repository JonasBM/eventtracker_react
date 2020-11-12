import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../common/Forms";

import { getSheetCSV } from "../../actions/actionFiles";

const FormSheetCSV = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(getSheetCSV(values));
  };

  return (
    <Form
      initialValues={{
        month: moment().format("YYYY-MM"),
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h5>{"Baixar planilha em formato csv"}</h5>
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
              Baixar planilha
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default FormSheetCSV;
