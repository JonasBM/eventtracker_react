import React from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../common/Forms";

import { actionCRUDUserProfile } from "../../actions/user/actionUserProfile";

const FormUserData = ({ authUser }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(actionCRUDUserProfile.update(values));
  };

  return (
    <Form
      initialValues={authUser}
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
          <InputFormGroup name="profile.matricula" label="Matrícula:" />
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
