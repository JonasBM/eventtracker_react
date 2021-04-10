import React from "react";
import CommonModalFooter from "../../common/CommonModalFooter";
import { Form } from "react-final-form";
import { InputFormGroup, required } from "../../common/Forms";

import { useDispatch } from "react-redux";
import { actionCRUDReportEventType } from "../../../actions/report/actionReportEventType";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import formatString from "format-string-by-pattern";

const FormReportType = ({ reportType }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar este Tipo de Relatório?";
    confirm_alert += newLine;
    confirm_alert += "Tipo de Relatório: " + reportType.name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDReportEventType.delete(reportType.id));
      bootstrap.Modal.getInstance(
        document.getElementById("ModalReportType")
      ).hide();
    }
  };

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(actionCRUDReportEventType.create(values));
        closeModal = true;
      } else {
        dispatch(actionCRUDReportEventType.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      bootstrap.Modal.getInstance(
        document.getElementById("ModalReportType")
      ).hide();
    }
  };
  return (
    <Form
      initialValues={reportType}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="modal-body container">
            <div className="container">
              <div className="form-inline">
                <InputFormGroup
                  name="order"
                  label="Ordem:"
                  type="number"
                  className="m-1"
                  min="1"
                  max="99"
                  validate={required}
                />
              </div>
              <div className="form-inline">
                <InputFormGroup
                  name="name"
                  label="Nome:"
                  className="m-1"
                  validate={required}
                />
              </div>
              <div className="form-inline">
                <InputFormGroup
                  name="short_name"
                  label="Abreviação:"
                  className="m-1"
                  validate={required}
                />
              </div>
              <div className="form-inline">
                <InputFormGroup
                  name="css_color"
                  parse={formatString("#AAAAAA")}
                  label="Cor:"
                  className="m-1"
                  validate={required}
                />
                <InputFormGroup
                  name="css_color"
                  type="color"
                  className="m-1"
                  validate={required}
                />
              </div>
            </div>
          </div>
          <CommonModalFooter
            canDelete={
              reportType !== undefined
                ? reportType.id !== 0
                  ? true
                  : false
                : false
            }
            canCopy={false}
            onDelete={onDelete}
            form={form}
          />
        </form>
      )}
    />
  );
};

export default FormReportType;
