import React from "react";
import CommonModalFooter from "../../common/CommonModalFooter";
import { Form } from "react-final-form";
import {
  InputFormGroup,
  CheckboxFormGroup,
  required,
} from "../../common/Forms";

import { useDispatch } from "react-redux";
import { actionCRUDNoticeEventType } from "../../../actions/notice/actionNoticeEventType";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import formatString from "format-string-by-pattern";

const FormNoticeType = ({ noticeType }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar este Tipo de Auto?";
    confirm_alert += newLine;
    confirm_alert += "Tipo de Auto: " + noticeType.name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNoticeEventType.delete(noticeType.id));
      bootstrap.Modal.getInstance(
        document.getElementById("ModalNoticeType")
      ).hide();
    }
  };

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(actionCRUDNoticeEventType.create(values));
        closeModal = true;
      } else {
        dispatch(actionCRUDNoticeEventType.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      bootstrap.Modal.getInstance(
        document.getElementById("ModalNoticeType")
      ).hide();
    }
  };
  return (
    <Form
      initialValues={noticeType}
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
                  name="default_deadline"
                  label="Prazo padrão (dias):"
                  type="number"
                  min="0"
                  max="999"
                  className="m-1"
                  validate={required}
                />
                <CheckboxFormGroup
                  name="default_deadline_working_days"
                  label="apenas dias úteis"
                />
              </div>
              <div className="form-inline">
                <CheckboxFormGroup
                  name="default_concluded"
                  label="Concluido por padrão"
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
              <div className="form-inline">
                <CheckboxFormGroup
                  name="show_concluded"
                  label="Tem conclusão?"
                />
              </div>
              <div className="form-inline">
                <CheckboxFormGroup
                  name="show_report_number"
                  label="Tem Relatório Fiscal?"
                />
              </div>
              <div className="form-inline">
                <CheckboxFormGroup name="show_deadline" label="Tem prazo?" />
              </div>
              <div className="form-inline">
                <CheckboxFormGroup name="show_fine" label="Tem Multas?" />
              </div>
              <div className="form-inline">
                <CheckboxFormGroup
                  name="show_start"
                  label="Mostrar evento na data de início?"
                />
              </div>
            </div>
          </div>
          <CommonModalFooter
            canDelete={
              noticeType !== undefined
                ? noticeType.id !== 0
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

export default FormNoticeType;
