import React from "react";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../common/Forms";
import { useDispatch } from "react-redux";
import { changePassword } from "../../actions/user/actionUser";

const FormChangePassword = ({ currentUser }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    if (values.new_password === values.new_password_check) {
      dispatch(changePassword({ user: currentUser, ...values }));
    }
  };

  return (
    <Form
      validate={(values) => {
        const errors = {};
        if (values.new_password !== values.new_password_check) {
          errors.new_password = "As novas senhas devem ser a iguais";
        }
        return errors;
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          {submitError && <div className="error">{submitError}</div>}
          <div className="form-inline p-1">
            <InputFormGroup
              name="old_password"
              label="Senha atual:"
              type="password"
              validate={required}
            />
          </div>
          <div className="form-inline p-1">
            <InputFormGroup
              name="new_password"
              label="Nova Senha:"
              type="password"
              validate={required}
            />
          </div>
          <div className="form-inline p-1">
            <InputFormGroup
              name="new_password_check"
              label="Nova Senha:"
              type="password"
              validate={required}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary font-weight-bold mt-2"
          >
            Alterar Senha
          </button>
        </form>
      )}
    />
  );
};

export default FormChangePassword;
