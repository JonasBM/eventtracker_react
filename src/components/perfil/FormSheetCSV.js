import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Form } from "react-final-form";
import { InputFormGroup, required, SelectFormGroup } from "../common/Forms";

import { getSheetCSV } from "../../actions/actionFiles";

const FormSheetCSV = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.user.users.users);

  const onSubmit = (values) => {
    dispatch(getSheetCSV(values));
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
          <h5>{"Baixar planilha em formato csv"}</h5>
          <div className="form-inline">
            <SelectFormGroup name="user_id" label="AFM:" className="m-1">
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
