import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionCRUDNotice,
  getLatest,
} from "../../../actions/notice/actionNotice";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import moment from "moment";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import {
  getNoticeEventType,
  filterOnlyInArrayByID,
  getFirstVA,
} from "../utils";
import {
  InputFormGroup,
  CheckboxFormGroup,
  SelectFormGroup,
  ToogleFieldSet,
  required,
} from "../../common/Forms";
import CommonModalFooter from "../../common/CommonModalFooter";
import AutocompleteImovel from "../../common/AutocompleteImovel";
import formatString from "format-string-by-pattern";
import {
  getnoticereportdocx,
  getVArequestdocx,
} from "../../../actions/actionFiles";

const FormNoticeFine = ({ fields, name, index, isOwner }) => {
  return (
    <div key={name} className="row px-4 py-1 form-inline">
      <InputFormGroup
        name={name + ".identification"}
        label="Nº:"
        size="10"
        maxLength="255"
        placeholder="identificação"
        className="mx-1"
      />
      <InputFormGroup
        name={name + ".date"}
        label="Data:"
        type="date"
        className="mx-1"
      />
      {isOwner && (
        <button
          type="button"
          className="btn btn-outline-danger border-0 btn-sm"
          onClick={() => fields.remove(index)}
        >
          <i className="fa fa-trash fa-sm"></i>
        </button>
      )}
    </div>
  );
};

const FormNoticeEvent = ({ fields, name, index, push, isOwner }) => {
  return (
    <div>
      <hr className="m-1" />
      <div className="row text-center">
        <span className="col text-uppercase w-100 font-weight-bold text-nowrap inline-block">
          {getNoticeEventType(fields.value[index]).name}
        </span>
        {isOwner && (
          <button
            type="button"
            className="btn btn-outline-danger border-0"
            onClick={() => fields.remove(index)}
          >
            <i className="fa fa-trash fa-lg"></i>
          </button>
        )}
      </div>
      {getNoticeEventType(fields.value[index]) !== undefined && (
        <div className="row">
          <div className="d-flex flex-row">
            <div className="form-inline">
              <InputFormGroup
                name={name + "date"}
                label="Data:"
                type="date"
                className="mx-1"
                classNameDiv="m-1"
                validate={required}
              />
              <InputFormGroup
                name={name + ".identification"}
                label="Nº:"
                type="text"
                size="15"
                maxLength="255"
                placeholder="identificação"
                className="mx-1"
                classNameDiv="m-1"
              />
              {getNoticeEventType(fields.value[index]).show_report_number && (
                <InputFormGroup
                  name={name + "report_number"}
                  label="RF:"
                  type="text"
                  size="10"
                  maxLength="255"
                  className="mx-1"
                  classNameDiv="m-1"
                />
              )}
              {getNoticeEventType(fields.value[index]).show_concluded && (
                <CheckboxFormGroup
                  name={name + ".concluded"}
                  label="Concluído"
                  className="mx-1"
                  classNameDiv="m-1"
                />
              )}
              {getNoticeEventType(fields.value[index]).show_deadline && (
                <div className="form-inline">
                  <InputFormGroup
                    name={name + ".deadline"}
                    label="Prazo (dias):"
                    type="number"
                    min="0"
                    max="999"
                    placeholder="prazo"
                    className="mx-1"
                    classNameDiv="m-1"
                    validate={required}
                  />
                  <CheckboxFormGroup
                    name={name + ".deadline_working_days"}
                    label="Apenas dias úteis"
                    className="mx-1"
                    classNameDiv="m-1"
                  />
                </div>
              )}
            </div>
          </div>
          {getNoticeEventType(fields.value[index]).show_fine && (
            <Fragment>
              <div className="row text-left m-1">
                <span className="col-lg w-100">Multas:</span>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    push(name + ".notice_fines", {
                      date: moment().format("YYYY-MM-DD"),
                    })
                  }
                >
                  Adicionar multa
                </button>
              </div>
              <div className="row pr-1 pb-1 w-100 justify-content-center">
                <FieldArray name={name + ".notice_fines"}>
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <FormNoticeFine
                        key={name}
                        fields={fields}
                        name={name}
                        index={index}
                        isOwner={isOwner}
                      />
                    ))
                  }
                </FieldArray>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

const requiredArray = (value) =>
  value && value.length > 0 ? undefined : "Required";

const FormNotice = ({ notice, day, isModalOpen }) => {
  const dispatch = useDispatch();
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );
  const users = useSelector((state) => state.user.users.users);
  const authuser = useSelector((state) => state.auth.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && notice !== undefined) {
      setIsOwner(authuser.id === notice.owner);
    } else if (authuser === undefined) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  }, [authuser, notice]);

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar este Auto?";
    confirm_alert += newLine;
    confirm_alert += "Data: " + moment(notice.date).format("DD/MM/YYYY");

    for (let index = 0; index < notice.notice_events.length; index++) {
      confirm_alert += newLine;
      confirm_alert += "Nº: " + notice.notice_events[index].identification;
      confirm_alert +=
        " (" +
        notice_event_types.find(
          (element) =>
            element.id === notice.notice_events[index].notice_event_type
        ).name +
        ")";
    }
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNotice.delete(notice.id));
      bootstrap.Modal.getInstance(document.getElementById("ModalEvent")).hide();
    }
  };

  const confirmSave = (values) => {
    let removedNoticeEvents = notice.notice_events.filter(
      filterOnlyInArrayByID(values.notice_events)
    );
    if (removedNoticeEvents.length === 0) {
      return true;
    }
    let newLine = "\r\n";
    let confirm_alert = "Salvando este Auto você estará removendo:";
    for (let index = 0; index < removedNoticeEvents.length; index++) {
      confirm_alert += newLine;
      confirm_alert += "Nº: " + removedNoticeEvents[index].identification;
      confirm_alert +=
        " (" +
        notice_event_types.find(
          (element) =>
            element.id === removedNoticeEvents[index].notice_event_type
        ).name +
        ")";
    }
    confirm_alert += newLine;
    confirm_alert += "Gostaria de continuar?";

    return window.confirm(confirm_alert);
  };

  const onSubmit = (values) => {
    let criarnovo = values.criarnovo;
    delete values["criarnovo"];
    let closeModal = false;
    if (values.id !== undefined) {
      if (values.id === 0 || criarnovo) {
        dispatch(actionCRUDNotice.create(values));
        closeModal = true;
      } else {
        if (confirmSave(values)) {
          dispatch(actionCRUDNotice.update(values));
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
      initialValues={notice}
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators,
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { push },
        },
        form,
      }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="modal-body container">
            <div className="container">
              <ToogleFieldSet isDisabled={true}>
                <div className="row no-gutters form-inline">
                  <SelectFormGroup
                    name="owner"
                    label="AFM:"
                    validate={required}
                    className="mx-1"
                  >
                    <option value="">---------</option>
                    {users.map((user, index) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </SelectFormGroup>
                </div>
              </ToogleFieldSet>
              <AutocompleteImovel
                name="imovel"
                name_string="imovel.name_string"
                label="Imóvel:"
                form={form}
                disabled={!isOwner}
              />
              {form &&
                notice &&
                notice.id === 0 &&
                form.getFieldState("imovel") !== undefined &&
                form.getFieldState("imovel").value && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      dispatch(
                        getLatest(form.getFieldState("imovel").value.id)
                      );
                    }}
                  >
                    Carregar Autos passados deste Imóvel
                  </button>
                )}
              <ToogleFieldSet isDisabled={!isOwner}>
                <InputFormGroup
                  name="document"
                  label="CPF/CNPJ:"
                  maxLength="255"
                  parse={(value) => {
                    if (!value) return value;
                    const onlyNumbers = value.replace(/[^\d]/g, "");
                    if (value.length > 14) {
                      return formatString("99.999.999/9999-99", onlyNumbers);
                    } else {
                      return formatString("999.999.999-99", onlyNumbers);
                    }
                  }}
                />
                <InputFormGroup
                  name="address"
                  label="Endereço:"
                  maxLength="255"
                />
                <InputFormGroup
                  name="description"
                  label="Descrição:"
                  component="textarea"
                  cols="40"
                  rows="3"
                />
                <div className="row">
                  <div className="col-auto">Adicionar:</div>
                  <div className="col text-left">
                    {notice_event_types.map((notice_event_type, index) => (
                      <button
                        key={index}
                        type="button"
                        className="btn btn-outline-primary btn-sm m-1"
                        onClick={() =>
                          push("notice_events", {
                            date: day.format("YYYY-MM-DD"),
                            deadline: notice_event_type.default_deadline,
                            deadline_working_days:
                              notice_event_type.default_deadline_working_days,
                            concluded: notice_event_type.default_concluded,
                            notice_event_type: notice_event_type.id,
                          })
                        }
                      >
                        {notice_event_type.name}
                      </button>
                    ))}
                  </div>
                </div>
              </ToogleFieldSet>
              <div className="row">
                <div className="col text-left">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm m-1"
                    onClick={() => {
                      console.log("getnoticereportdocx");
                      dispatch(getnoticereportdocx(notice));
                    }}
                  >
                    Gerar Relatório de Fiscalização
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm m-1"
                    onClick={() => {
                      console.log("getVArequestdocx");
                      dispatch(getVArequestdocx(getFirstVA(notice)));
                    }}
                  >
                    Gerar Pedido de VA
                  </button>
                </div>
              </div>
              <ToogleFieldSet isDisabled={!isOwner}>
                <div className="container">
                  <FieldArray name="notice_events" validate={requiredArray}>
                    {({ fields, meta: { touched } }) => (
                      <div>
                        {fields.map((name, index) => (
                          <FormNoticeEvent
                            key={name}
                            fields={fields}
                            name={name}
                            index={index}
                            push={push}
                            isOwner={isOwner}
                          />
                        ))}
                        {fields.length === 0 && touched ? (
                          <div className="invalid-feedback d-block">
                            É necessario adicionar ao menos um Auto ou VA
                          </div>
                        ) : null}
                      </div>
                    )}
                  </FieldArray>
                </div>
              </ToogleFieldSet>
            </div>
          </div>
          <CommonModalFooter
            isDisabled={!isOwner}
            canDelete={
              notice !== undefined ? (notice.id !== 0 ? true : false) : false
            }
            canCopy={
              notice !== undefined ? (notice.id !== 0 ? true : false) : false
            }
            onDelete={onDelete}
            form={form}
          />
        </form>
      )}
    />
  );
};

export default FormNotice;
