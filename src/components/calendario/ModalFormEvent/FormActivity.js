import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCRUDActivity } from "../../../actions/activity/actionActivity";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { Form } from "react-final-form";
import {
  InputFormGroup,
  SelectFormGroup,
  ToogleFieldSet,
  required,
} from "../../common/Forms";
import CommonModalFooter from "../../common/CommonModalFooter";
import moment from "moment";
import { createMessage } from "../../../actions/actionMessages";

const FormActivity = ({ activity, day, isModalOpen }) => {
  const dispatch = useDispatch();
  const activitys = useSelector((state) => state.activity.activitys.activitys);
  const users = useSelector((state) => state.user.users.users);
  const authuser = useSelector((state) => state.auth.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && activity !== undefined) {
      setIsOwner(authuser.id === activity.owner);
    } else if (authuser === undefined) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
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
                    {users.map((user, index) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </SelectFormGroup>
                </ToogleFieldSet>
                <ToogleFieldSet isDisabled={!isOwner}>
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
              <ToogleFieldSet isDisabled={!isOwner}>
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
            isDisabled={!isOwner}
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
