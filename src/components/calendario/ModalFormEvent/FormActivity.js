import React from "react";
import { useDispatch } from "react-redux";
import { actionCRUDActivity } from "../../../actions/activity/actionActivity";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../../common/Forms";
import CommonModalFooter from "./CommonModalFooter";
import moment from "moment";

const FormActivity = ({ activity }) => {
  const dispatch = useDispatch();

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
    if (values.id !== undefined) {
      if (values.id === 0 || criarnovo) {
        dispatch(actionCRUDActivity.create(values));
        closeModal = true;
      } else {
        if (confirmSave(values)) {
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
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="modal-body container">
            <div className="container">
              <InputFormGroup
                name="date"
                label="data:"
                type="date"
                validate={required}
              />
              <InputFormGroup
                name="description"
                label="descrição:"
                component="textarea"
                cols="40"
                rows="20"
                validate={required}
              />
            </div>
          </div>
          <CommonModalFooter
            isEdit={
              activity !== undefined
                ? activity.id !== 0
                  ? true
                  : false
                : false
            }
            onDelete={onDelete}
          />
        </form>
      )}
    />
  );
};

export default FormActivity;
