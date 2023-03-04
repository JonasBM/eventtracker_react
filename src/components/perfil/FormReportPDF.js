import {
  CheckboxFormGroup,
  InputFormGroup,
  SelectFormGroup,
  required,
} from "../common/Forms";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "react-final-form";
import React from "react";
import { getReportPDF } from "../../actions/actionFiles.js";
import { hasPermission } from "../calendario/utils";
import moment from "moment";

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
        include_analytic_data: true,
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <h5>{"Baixar relatório individual"}</h5>
          <div className="form-inline">
            <SelectFormGroup
              name="user_id"
              id="id_user_id_report"
              label="AFM:"
              className="m-1 max-width-300"
            >
              {users
                .filter((user) => {
                  if (authUser.profile.is_auditor) {
                    return true;
                  }
                  return hasPermission(authUser, user.id);
                })
                .map((user, index) => (
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
            <CheckboxFormGroup
              name="include_analytic_data"
              label="Incluir relatório analítico"
              className="m-1"
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
