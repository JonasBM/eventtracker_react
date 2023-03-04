import { InputFormGroup, SelectFormGroup, required } from "../common/Forms";

import { Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import React from "react";
import { hasPermission } from "../calendario/utils";
import moment from "moment";
import { newDate } from "../../actions/actionDate";
import { newUser } from "../../actions/user/actionUser";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TaskBar = ({ momentdate, dateType }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users.users);
  const currentUser = useSelector((state) => state.user.users.current);
  const authuser = useSelector((state) => state.auth.user);
  const momentDate = useSelector((state) => state.date);

  const onSubmit = (values) => {};

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
      <div className="form-inline">
        <button
          className="btn btn-sm btn-outline-primary mx-1 d-none d-lg-inline-block"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#ModalEvent"
          data-modalcall="none"
          data-day={momentDate ? momentDate.format("YYYY-MM-DD") : ""}
          disabled={!hasPermission(authuser, currentUser.id)}
        >
          Novo Evento
        </button>
        <Form
          initialValues={{ momentdate, currentUser }}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="needs-validation d-flex"
                noValidate
              >
                <div className="col form-inline">
                  <SelectFormGroup
                    name="currentUser.id"
                    label="AFM:"
                    className="mx-1 max-width-300"
                  >
                    {users
                      .filter((user) => {
                        if (authuser.profile.is_auditor) {
                          return true;
                        }
                        if (authuser.id === user.id) {
                          return true;
                        }
                        return hasPermission(authuser, user.id);
                      })
                      .map((user, index) => (
                        <option key={user.id} value={user.id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))}
                  </SelectFormGroup>
                  <OnChange name="currentUser.id">
                    {(value, previous) => {
                      let user = users.find(
                        (user) => user.id.toString() === value
                      );
                      if (user !== undefined) {
                        dispatch(newUser(user));
                      }
                    }}
                  </OnChange>
                </div>
                {momentdate && dateType && (
                  <div className="col form-inline ml-2">
                    <InputFormGroup
                      name="momentdate"
                      label="data:"
                      type={dateType}
                      className="mx-1"
                      validate={required}
                      parse={
                        dateType === "month"
                          ? (value) => value && moment(value + "-01")
                          : (value) => value && moment(value)
                      }
                      format={
                        dateType === "month"
                          ? (value) => (value ? value.format("YYYY-MM") : "")
                          : (value) => (value ? value.format("YYYY-MM-DD") : "")
                      }
                    />
                    <OnChange name="momentdate">
                      {(value, previous) => {
                        dispatch(newDate(value));
                      }}
                    </OnChange>
                  </div>
                )}
              </form>
            );
          }}
        />
      </div>
    </nav>
  );
};

export default TaskBar;
