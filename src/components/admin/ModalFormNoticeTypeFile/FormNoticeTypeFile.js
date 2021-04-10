import React from "react";
import CommonModalFooter from "../../common/CommonModalFooter";
import { Form } from "react-final-form";
import {
  InputFormGroup,
  SelectFormGroup,
  FileField,
  required,
} from "../../common/Forms";

import { useSelector, useDispatch } from "react-redux";
import { actionCRUDNoticeEventTypeFile } from "../../../actions/notice/actionNoticeEventTypeFile";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

const FormNoticeTypeFile = ({ noticeTypeFile }) => {
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );

  const dispatch = useDispatch();

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert =
      "Tem certeza que gostaria de deletar esta Notificação de Auto?";
    confirm_alert += newLine;
    confirm_alert += "Notificação de Auto: " + noticeTypeFile.name;
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNoticeEventTypeFile.delete(noticeTypeFile.id));
      bootstrap.Modal.getInstance(
        document.getElementById("ModalNoticeTypeFile")
      ).hide();
    }
  };

  const onSubmit = (values) => {
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0) {
        dispatch(actionCRUDNoticeEventTypeFile.create(values));
        closeModal = true;
      } else {
        if (!values.file_doc || values.file_doc.toString().startsWith("http")) {
          delete values.file_doc;
        }
        dispatch(actionCRUDNoticeEventTypeFile.update(values));
        closeModal = true;
      }
    }
    if (closeModal) {
      bootstrap.Modal.getInstance(
        document.getElementById("ModalNoticeTypeFile")
      ).hide();
    }
  };
  return (
    <Form
      initialValues={{
        ...noticeTypeFile,
        file_doc: "",
      }}
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
                <FileField
                  name="file_doc"
                  id="file_doc"
                  label="Escolha um arquivo"
                />

                {noticeTypeFile && noticeTypeFile.file_doc && (
                  <a
                    href={noticeTypeFile.file_doc}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Baixar arquivo
                  </a>
                )}
              </div>
              <div className="form-inline">
                <SelectFormGroup
                  name="notice_event_type"
                  label="Tipo:"
                  className="m-1"
                  classNameDiv="mx-1"
                  validate={required}
                >
                  <option value="">---------</option>
                  {notice_event_types.map((notice_event_type, index) => (
                    <option
                      key={notice_event_type.id}
                      value={notice_event_type.id}
                    >
                      {notice_event_type.order} - {notice_event_type.name}
                    </option>
                  ))}
                </SelectFormGroup>
              </div>
            </div>
          </div>
          <CommonModalFooter
            canDelete={
              noticeTypeFile !== undefined
                ? noticeTypeFile.id !== 0
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

export default FormNoticeTypeFile;
