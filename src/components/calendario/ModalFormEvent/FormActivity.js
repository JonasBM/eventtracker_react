import {
  InputFormGroup,
  SelectFormGroup,
  ToogleFieldSet,
  required,
} from "../../common/Forms";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommonModalFooter from "../../common/CommonModalFooter";
import { Form } from "react-final-form";
import { actionCRUDActivity } from "../../../actions/activity/actionActivity";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { createMessage } from "../../../actions/actionMessages";
import { hasPermission } from "../utils";
import moment from "moment";

const FormActivity = ({ activity, day, isModalOpen }) => {
  const dispatch = useDispatch();
  const activitys = useSelector((state) => state.activity.activitys.activitys);
  const users = useSelector((state) => state.user.users.users);
  const authuser = useSelector((state) => state.auth.user);
  const [hasOwnerPermission, setHasOwnerPermission] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && activity !== undefined) {
      setHasOwnerPermission(hasPermission(authuser, activity.owner));
    } else if (authuser === undefined) {
      setHasOwnerPermission(false);
    } else {
      setHasOwnerPermission(true);
    }
  }, [authuser, activity]);

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar esta Atividade?";
    confirm_alert += newLine;
    confirm_alert += "Data: " + moment(activity.date).format("DD/MM/YYYY");
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDActivity.delete(activity.id));
      bootstrap.Modal.getInstance(document.getElementById("ModalEvent")).hide();
    }
  };

  const confirmSave = () => {
    return true;
  };

  const onSubmit = (values) => {
    let criarnovo = values.criarnovo;
    delete values["criarnovo"];
    let closeModal = false;
    let errormgs = {
      ERROR: "Apenas é permitido um registro de atividade por data",
    };
    if (values.id !== undefined) {
      if (values.id === 0 || criarnovo) {
        if (
          activitys.filter(
            (activity) =>
              activity.date === values.date && activity.owner === values.owner
          ).length > 0
        ) {
          dispatch(createMessage(errormgs));
          return;
        }
        dispatch(actionCRUDActivity.create(values));
        closeModal = true;
      } else {
        if (confirmSave(values)) {
          if (
            activitys.filter(
              (activity) =>
                activity.id !== values.id &&
                activity.date === values.date &&
                activity.owner === values.owner
            ).length > 0
          ) {
            dispatch(createMessage(errormgs));
            return;
          }
          dispatch(actionCRUDActivity.update(values));
          closeModal = true;
        }
      }
    }
    if (closeModal) {
      bootstrap.Modal.getInstance(document.getElementById("ModalEvent")).hide();
    }
  };

  return (
    <Form
      initialValues={activity}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="modal-body container">
            <div className="container">
              <div className="form-inline">
                <ToogleFieldSet isDisabled={true}>
                  <SelectFormGroup
                    name="owner"
                    label="AFM:"
                    className="m-1"
                    classNameDiv="mx-1"
                    validate={required}
                  >
                    <option value="">---------</option>
                    {users
                      .filter((user) => {
                        if (!hasOwnerPermission) {
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
                </ToogleFieldSet>
                <ToogleFieldSet isDisabled={!hasOwnerPermission}>
                  <InputFormGroup
                    name="date"
                    label="Data:"
                    type="date"
                    className="m-1"
                    classNameDiv="mx-1"
                    validate={required}
                  />
                </ToogleFieldSet>
              </div>
              <ToogleFieldSet isDisabled={!hasOwnerPermission}>
                <InputFormGroup
                  name="description"
                  label="Descrição:"
                  component="textarea"
                  cols="40"
                  rows="20"
                  validate={required}
                />
              </ToogleFieldSet>
            </div>
          </div>
          <CommonModalFooter
            isDisabled={!hasOwnerPermission}
            canDelete={
              activity !== undefined
                ? activity.id !== 0
                  ? true
                  : false
                : false
            }
            canCopy={
              activity !== undefined
                ? activity.id !== 0
                  ? true
                  : false
                : false
            }
            onDelete={onDelete}
            form={form}
          />
        </form>
      )}
    />
  );
};

export default FormActivity;
