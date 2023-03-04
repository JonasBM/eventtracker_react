import React from "react";
import CommonModalFooter from "../../common/CommonModalFooter";
import { Form } from "react-final-form";
import { InputFormGroup, required, SelectFormGroup } from "../../common/Forms";

import { useDispatch, useSelector } from "react-redux";
import { actionCRUDNoticeColor } from "../../../actions/notice/actionNoticeColor";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import formatString from "format-string-by-pattern";

const FormNoticeColor = ({ noticeColor }) => {
  const dispatch = useDispatch();
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar esta cor de Auto?";
    confirm_alert += newLine;
    confirm_alert += "Combinação: " + noticeColor.css_name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNoticeColor.delete(noticeColor.id));
      bootstrap.Modal.getInstance(
        document.getElementById("ModalNoticeColor")
      ).hide();
    }
  };

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(actionCRUDNoticeColor.create(values));
        closeModal = true;
      } else {
        dispatch(actionCRUDNoticeColor.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      bootstrap.Modal.getInstance(
        document.getElementById("ModalNoticeColor")
      ).hide();
    }
  };
  return (
    <Form
      initialValues={noticeColor}
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="modal-body container">
            <div className="container">
              <SelectFormGroup
                name="notice_event_types"
                label="Combinação de Autos:"
                validate={required}
                className="m-1 custom-select"
                multiple
                classNameDiv="mx-1"
                size={notice_event_types.length}
              >
                {notice_event_types.map((notice_event_type, index) => (
                  <option
                    key={notice_event_type.id}
                    value={notice_event_type.id}
                  >
                    {notice_event_type.name}
                  </option>
                ))}
              </SelectFormGroup>
              <span>Obs.: Precione CTRL para multiplas seleções.</span>
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
              noticeColor !== undefined
                ? noticeColor.id !== 0
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

export default FormNoticeColor;
