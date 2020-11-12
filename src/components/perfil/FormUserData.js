import React from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../common/Forms";

import { actionCRUDUser } from "../../actions/user/actionUser";

const FormUserData = ({ currentUser }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(actionCRUDUser.update(values));
  };

  return (
    <Form
      initialValues={currentUser}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <InputFormGroup
            name="username"
            label="Username:"
            validate={required}
          />
          <InputFormGroup name="first_name" label="Nome:" validate={required} />
          <InputFormGroup name="last_name" label="Sobrenome:" />
          <InputFormGroup name="email" label="email:" />
          <button
            type="submit"
            className="btn btn-primary font-weight-bold mt-2"
          >
            Salvar
          </button>
        </form>
      )}
    />
  );
};

export default FormUserData;
