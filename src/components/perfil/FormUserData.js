import { CheckboxFormGroup, InputFormGroup, SelectFormGroup, required } from "../common/Forms";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "react-final-form";
import React from "react";
import { actionCRUDUserProfile } from "../../actions/user/actionUserProfile";

const FormUserData = ({ authUser }) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users.users);

  const onSubmit = (values) => {
    dispatch(actionCRUDUserProfile.update(values));
  };

  return (
    <Form
      initialValues={authUser}
      onSubmit={onSubmit}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { setValue },
        },
        form,
      }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <InputFormGroup name="username" label="Username:" validate={required} />
          <InputFormGroup name="first_name" label="Nome:" validate={required} />
          <InputFormGroup name="last_name" label="Sobrenome:" />
          <InputFormGroup name="email" label="email:" />
          <InputFormGroup name="profile.matricula" label="Matrícula:" />

          {!authUser.profile.is_assistente && (
            <div>
              <label className="mb-0">Assistentes:</label>
              {users
                .filter((user) => {
                  return user.is_assistente;
                })
                .map((user, index) => (
                  <CheckboxFormGroup
                    key={user.id}
                    name={"profile.assistentes" + user.id}
                    label={user.first_name + " " + user.last_name}
                    className="m-1"
                    onClick={(e) => {
                      if (e.target.checked) {
                        form.getFieldState("profile.assistentes").value.push(user.id);
                      } else {
                        form.mutators.setValue(
                          "profile.assistentes",
                          form.getFieldState("profile.assistentes").value.filter((assistenteID) => {
                            return assistenteID !== user.id;
                          })
                        );
                      }
                    }}
                    checked={form.getFieldState("profile.assistentes")?.value.includes(user.id)}
                  />
                ))}
              <SelectFormGroup
                name="profile.assistentes"
                label="Assistentes:"
                validate={required}
                className="m-1 custom-select"
                multiple
                classNameDiv="mx-1 d-none"
                size={Math.min(users.length, 12)}
              >
                {users.map((user, index) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </SelectFormGroup>
            </div>
          )}

          <div className="row">
            <div className="col text-left">
              <button type="submit" className="btn btn-primary font-weight-bold mt-2 px-5">
                Salvar
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default FormUserData;
