import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCRUDNotice } from "../../../actions/notice/actionNotice";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import moment from "moment";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { getNoticeEventType } from "../utils";
import { InputFormGroup, CheckboxFormGroup } from "../../common/Forms";

const FormNoticeFine = ({ fields, name, index }) => {
  return (
    <div key={name} className="row px-4 py-1 form-inline">
      <InputFormGroup
        name={name + ".identification"}
        label="nº:"
        size="10"
        maxLength="255"
        placeholder="identificação"
        className="mx-1"
      />
      <InputFormGroup
        name={name + ".date"}
        label="data:"
        type="date"
        className="mx-1"
      />
      <button
        className="btn btn-outline-danger border-0 btn-sm"
        onClick={() => fields.remove(index)}
      >
        <i className="fa fa-trash fa-sm"></i>
      </button>
    </div>
  );
};

const FormNoticeEvent = ({ fields, name, index, push }) => {
  return (
    <div>
      <hr className="m-1" />
      <div className="row text-center">
        <span className="col text-uppercase w-100 font-weight-bold text-nowrap">
          {getNoticeEventType(fields.value[index]).name}
        </span>
        <button
          className="btn btn-outline-danger border-0"
          onClick={() => fields.remove(index)}
        >
          <i className="fa fa-trash fa-lg"></i>
        </button>
      </div>
      <div className="row">
        <div className="row pr-1 pb-1 w-100">
          <div className="col form-inline">
            <InputFormGroup
              name={name + ".identification"}
              label="nº:"
              type="text"
              size="15"
              maxLength="255"
              placeholder="identificação"
              className="mx-1"
            />
            {fields.value[index].notice_event_type !== 3 && (
              <CheckboxFormGroup
                name={name + ".end_concluded"}
                label="concluído"
              />
            )}
          </div>
        </div>
        {fields.value[index].notice_event_type !== 3 && (
          <div className="row pr-1 pb-1 w-100">
            <div className="col form-inline">
              <InputFormGroup
                name={name + ".deadline"}
                label="prazo (dias):"
                type="number"
                min="0"
                max="999"
                placeholder="prazo"
                className="mx-1"
              />
              <CheckboxFormGroup
                name={name + ".deadline_working_days"}
                label="apenas dias úteis"
              />
            </div>
          </div>
        )}
        {fields.value[index].notice_event_type === 2 && (
          <Fragment>
            <div className="row text-left m-1">
              <span className="col w-100">Multas:</span>
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
                    />
                  ))
                }
              </FieldArray>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

const FormNotice = ({ notice }) => {
  const dispatch = useDispatch();
  const notice_event_types = useSelector(
    (state) => state.notice.notice_event_types.notice_event_types
  );

  const onSubmit = (values) => {
    dispatch(actionCRUDNotice.update(values));
    bootstrap.Modal.getInstance(document.getElementById("ModalEvent")).hide();
  };

  return (
    <Form
      initialValues={notice}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
        },
      }) => (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="modal-body container">
            <div className="container">
              <InputFormGroup name="date" label="data:" type="date" />
              <InputFormGroup
                name="address"
                label="endereço:"
                maxLength="255"
              />
              <InputFormGroup
                name="description"
                label="descrição:"
                component="textarea"
                cols="40"
                rows="3"
              />
              Adicionar:
              <div className="text-center pt-1">
                {notice_event_types.map((notice_event_type, index) => (
                  <button
                    key={index}
                    type="button"
                    className="btn btn-outline-primary btn-sm mx-1"
                    onClick={() =>
                      push("notice_events", {
                        notice_event_type: notice_event_type.id,
                        deadline: notice_event_type.default_deadline,
                        deadline_working_days:
                          notice_event_type.default_deadline_working_days,
                        end_concluded: notice_event_type.default_end_concluded,
                      })
                    }
                  >
                    {notice_event_type.name}
                  </button>
                ))}
              </div>
              <div className="container">
                <FieldArray name="notice_events">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <FormNoticeEvent
                        key={name}
                        fields={fields}
                        name={name}
                        index={index}
                        push={push}
                      />
                    ))
                  }
                </FieldArray>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="mr-auto btn btn-danger font-weight-bold"
            >
              Deletar
            </button>
            <button
              type="button"
              className="btn btn-secondary font-weight-bold"
              data-dismiss="modal"
            >
              Fechar
            </button>
            <button type="submit" className="btn btn-primary font-weight-bold">
              Salvar
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default FormNotice;
