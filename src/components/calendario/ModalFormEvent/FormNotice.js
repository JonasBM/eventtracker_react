import { CheckboxFormGroup, InputFormGroup, SelectFormGroup, ToogleFieldSet, required } from "../../common/Forms";
import React, { Fragment, useEffect, useState } from "react";
import { actionCRUDNotice, getLatest } from "../../../actions/notice/actionNotice";
import { filterOnlyInArrayByID, getFirstVA, getNoticeEventType, hasNotification, hasPermission } from "../utils";
import { getVArequestdocx, getnoticereportdocx } from "../../../actions/actionFiles";
import { useDispatch, useSelector } from "react-redux";

import AutocompleteImovel from "../../common/AutocompleteImovel";
import CommonModalFooter from "../../common/CommonModalFooter";
import { FieldArray } from "react-final-form-arrays";
import { Form } from "react-final-form";
import { IconButton } from "../common";
import arrayMutators from "final-form-arrays";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import formatString from "format-string-by-pattern";
import moment from "moment";
import { OnChange } from "react-final-form-listeners";
import { formatCNPJCPF } from "../utils";

const FormNoticeFine = ({ fields, name, index, hasOwnerPermission }) => {
  return (
    <div key={name} className="row px-4 py-1 form-inline border-bottom">
      <InputFormGroup
        name={name + ".identification"}
        label="Nº:"
        size="10"
        maxLength="255"
        placeholder="identificação"
        className="mx-1"
      />
      <InputFormGroup name={name + ".date"} label="Data:" type="date" className="mx-1" />
      {hasOwnerPermission && (
        <button type="button" className="btn btn-outline-danger border-0 btn-sm" onClick={() => fields.remove(index)}>
          <i className="fa fa-trash fa-sm"></i>
        </button>
      )}
    </div>
  );
};

const FormNoticeAppeal = ({ form, fields, name, index, hasOwnerPermission }) => {
  return (
    <Fragment key={name}>
      <div className="row px-4 py-1 form-inline">
        <InputFormGroup
          name={name + ".identification"}
          label="Nº:"
          size="10"
          maxLength="255"
          placeholder="identificação"
          className="mx-1"
        />
        <InputFormGroup
          name={name + ".extension"}
          label="Extensão (dias):"
          type="number"
          min="0"
          max="999"
          placeholder="0"
          className="mx-1"
          classNameDiv="m-1"
        />
        {hasOwnerPermission && (
          <button type="button" className="btn btn-outline-danger border-0 btn-sm" onClick={() => fields.remove(index)}>
            <i className="fa fa-trash fa-sm"></i>
          </button>
        )}
      </div>
      <div className="row px-4 py-1 form-inline border-bottom">
        <InputFormGroup name={name + ".start_date"} label="Inicio:" type="date" className="mx-1" validate={required} />
        <InputFormGroup name={name + ".end_date"} label="Fim:" type="date" className="mx-1" />
        <IconButton
          icon={"fa-times-circle-o"}
          onclick={() => {
            form.mutators.setValue(name + ".end_date", null);
          }}
          title="Limpar data"
        />
      </div>
    </Fragment>
  );
};

const FormNoticeEvent = ({ form, fields, name, index, push, hasOwnerPermission }) => {
  const notice_event_type = getNoticeEventType(fields.value[index]);
  return (
    <div>
      <hr className="m-1" />
      <div className="row text-center">
        <span className="col text-uppercase w-100 font-weight-bold text-nowrap inline-block">
          {notice_event_type.name}
          {hasNotification(notice_event_type) &&
            fields.value[index].id &&
            fields.value[index].id.toString() !== "0" && (
              <button
                type="button"
                className="btn btn-outline-primary border-0 btn-sm mx-1 never-disabled"
                data-bs-toggle="modal"
                data-bs-target="#ModalNoticeNotification"
                data-modalcall="notification"
                data-notice_event_id={fields.value[index].id}
                data-notice_type_id={notice_event_type.id}
              >
                <i className="fa fa-print"></i>
              </button>
            )}
        </span>

        {hasOwnerPermission && (
          <button type="button" className="btn btn-outline-danger border-0" onClick={() => fields.remove(index)}>
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
                <CheckboxFormGroup name={name + ".concluded"} label="Concluído" className="mx-1" classNameDiv="m-1" />
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
                        hasOwnerPermission={hasOwnerPermission}
                      />
                    ))
                  }
                </FieldArray>
              </div>
            </Fragment>
          )}
          {getNoticeEventType(fields.value[index]).show_appeal && (
            <Fragment>
              <div className="row text-left m-1">
                <span className="col-lg w-100">Recursos:</span>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() =>
                    push(name + ".notice_appeals", {
                      start_date: moment().format("YYYY-MM-DD"),
                    })
                  }
                >
                  Adicionar recurso
                </button>
              </div>
              <div className="row pr-1 pb-1 w-100 justify-content-center">
                <FieldArray name={name + ".notice_appeals"}>
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <FormNoticeAppeal
                        key={name}
                        form={form}
                        fields={fields}
                        name={name}
                        index={index}
                        hasOwnerPermission={hasOwnerPermission}
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

const requiredArray = (value) => (value && value.length > 0 ? undefined : "Required");

const FormNotice = ({ notice, day, isModalOpen }) => {
  const dispatch = useDispatch();
  const notice_event_types = useSelector((state) => state.notice.notice_event_types.notice_event_types);
  const users = useSelector((state) => state.user.users.users);
  const authuser = useSelector((state) => state.auth.user);
  const [hasOwnerPermission, setHasOwnerPermission] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && notice !== undefined) {
      setHasOwnerPermission(hasPermission(authuser, notice.owner));
    } else if (authuser === undefined) {
      setHasOwnerPermission(false);
    } else {
      setHasOwnerPermission(true);
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
        notice_event_types.find((element) => element.id === notice.notice_events[index].notice_event_type).name +
        ")";
    }
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDNotice.delete(notice.id));
      bootstrap.Modal.getInstance(document.getElementById("ModalEvent")).hide();
    }
  };

  const confirmSave = (values) => {
    let removedNoticeEvents = notice.notice_events.filter(filterOnlyInArrayByID(values.notice_events));
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
        notice_event_types.find((element) => element.id === removedNoticeEvents[index].notice_event_type).name +
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
          <OnChange name="imovel">
            {(value, previous) => {
              if (value?.id !== previous?.id) {
                if (value?.cnpj_cpf) {
                  const document = form.getFieldState("document");
                  if (!document?.value) {
                    form.mutators.setValue("document", formatCNPJCPF(value?.cnpj_cpf));
                  }
                }
              }
            }}
          </OnChange>
          <div className="modal-body container">
            <div className="container">
              <div className="row no-gutters form-inline">
                <ToogleFieldSet isDisabled={true}>
                  <SelectFormGroup name="owner" label="AFM:" validate={required} className="mx-1">
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
              </div>
              <AutocompleteImovel
                name="imovel"
                name_string="imovel.name_string"
                label="Imóvel:"
                form={form}
                disabled={!hasOwnerPermission}
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
                      dispatch(getLatest(form.getFieldState("imovel").value.id));
                    }}
                  >
                    Carregar Autos passados deste Imóvel
                  </button>
                )}
              <ToogleFieldSet isDisabled={!hasOwnerPermission}>
                <InputFormGroup
                  name="document"
                  label="CPF/CNPJ:"
                  maxLength="255"
                  parse={(value) => {
                    if (!value) return value;
                    const onlyNumbers = value.replace(/[^\d]/g, "");
                    if (onlyNumbers.length > 11) {
                      return formatString("99.999.999/9999-99", onlyNumbers);
                    } else {
                      return formatString("999.999.999-99", onlyNumbers);
                    }
                  }}
                />
                <InputFormGroup name="description" label="Descrição:" component="textarea" cols="40" rows="3" />
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
                            deadline_working_days: notice_event_type.default_deadline_working_days,
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
              <div className={notice && notice.id === 0 ? "row d-none" : "row"}>
                <div className="col text-left">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm m-1"
                    onClick={() => {
                      dispatch(getnoticereportdocx(notice));
                    }}
                    disabled={notice && notice.imovel ? false : true}
                  >
                    Gerar Relatório de Fiscalização
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm m-1"
                    onClick={() => {
                      dispatch(getVArequestdocx(getFirstVA(notice)));
                    }}
                    disabled={notice && notice.imovel ? (getFirstVA(notice) ? false : true) : true}
                  >
                    Gerar Pedido de VA
                  </button>
                </div>
              </div>
              <ToogleFieldSet isDisabled={!hasOwnerPermission}>
                <div className="container">
                  <FieldArray name="notice_events" validate={requiredArray}>
                    {({ fields, meta: { touched } }) => (
                      <div>
                        {fields.map((name, index) => (
                          <FormNoticeEvent
                            key={name}
                            form={form}
                            fields={fields}
                            name={name}
                            index={index}
                            push={push}
                            hasOwnerPermission={hasOwnerPermission}
                          />
                        ))}
                        {fields.length === 0 && touched ? (
                          <div className="invalid-feedback d-block">É necessario adicionar ao menos um Auto ou VA</div>
                        ) : null}
                      </div>
                    )}
                  </FieldArray>
                </div>
              </ToogleFieldSet>
            </div>
          </div>
          <CommonModalFooter
            isDisabled={!hasOwnerPermission}
            canDelete={notice !== undefined ? (notice.id !== 0 ? true : false) : false}
            canCopy={notice !== undefined ? (notice.id !== 0 ? true : false) : false}
            onDelete={onDelete}
            form={form}
          />
        </form>
      )}
    />
  );
};

export default FormNotice;
