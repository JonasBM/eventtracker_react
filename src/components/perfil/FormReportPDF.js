import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form } from "react-final-form";
import { InputFormGroup, required, SelectFormGroup } from "../common/Forms";

import { getReportPDF } from "../../actions/actionFiles";

const FormReportPDF = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.user.users.users);

  const onSubmit = (values) => {
    dispatch(getReportPDF(values));
  };

  return (
    <Form
      initialValues={{
        user_id: authUser.id,
        month: moment().format("YYYY-MM"),
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h5>{"Baixar relatório"}</h5>
          <div className="form-inline">
            <SelectFormGroup
              name="user_id"
              id="id_user_id_report"
              label="AFM:"
              className="m-1"
            >
              {users.map((user, index) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </SelectFormGroup>
          </div>
          <div className="form-inline">
            <InputFormGroup
              name="month"
              id="id_month_report"
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
