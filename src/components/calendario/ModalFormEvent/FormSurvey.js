import { CheckboxFormGroup, InputFormGroup, SelectFormGroup, ToogleFieldSet, required } from "../../common/Forms";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AutocompleteImovel from "../../common/AutocompleteImovel";
import CommonModalFooter from "../../common/CommonModalFooter";
import { Form } from "react-final-form";
import { actionCRUDSurvey } from "../../../actions/survey/actionSurvey";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import formatString from "format-string-by-pattern";
import { hasPermission } from "../utils";
import moment from "moment";
import { OnChange } from "react-final-form-listeners";
import { formatCNPJCPF } from "../utils";

const FormSurvey = ({ survey, day, isModalOpen }) => {
  const dispatch = useDispatch();
  const survey_event_types = useSelector((state) => state.survey.survey_event_types.survey_event_types);
  const users = useSelector((state) => state.user.users.users);
  const authuser = useSelector((state) => state.auth.user);
  const [hasOwnerPermission, setHasOwnerPermission] = useState(false);

  useEffect(() => {
    if (authuser !== undefined && survey !== undefined) {
      setHasOwnerPermission(hasPermission(authuser, survey.owner));
    } else if (authuser === undefined) {
      setHasOwnerPermission(false);
    } else {
      setHasOwnerPermission(true);
    }
  }, [authuser, survey]);

  const onDelete = () => {
    let newLine = "\r\n";
    let confirm_alert = "Tem certeza que gostaria de deletar esta Vistoria de ";
    confirm_alert += survey_event_types.find((element) => element.id === survey.survey_event_type).name + "?";
    confirm_alert += newLine;
    confirm_alert += "Nº: " + survey.identification;
    confirm_alert += newLine;
    confirm_alert += "Data: " + moment(survey.date).format("DD/MM/YYYY");
    if (window.confirm(confirm_alert)) {
      dispatch(actionCRUDSurvey.delete(survey.id));
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
        dispatch(actionCRUDSurvey.create(values));
        closeModal = true;
      } else {
        if (confirmSave(values)) {
          dispatch(actionCRUDSurvey.update(values));
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
      initialValues={survey}
      onSubmit={onSubmit}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      render={({ handleSubmit, form }) => (
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
              <div className="form-inline">
                <ToogleFieldSet isDisabled={true}>
                  <SelectFormGroup name="owner" label="AFM:" validate={required} className="m-1" classNameDiv="mx-1">
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
              <AutocompleteImovel
                name="imovel"
                name_string="imovel.name_string"
                label="Imóvel:"
                form={form}
                disabled={!hasOwnerPermission}
              />
              <ToogleFieldSet isDisabled={!hasOwnerPermission}>
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
                {/* <InputFormGroup
                  name="address"
                  label="Endereço:"
                  maxLength="255"
                /> */}
                <InputFormGroup name="description" label="Descrição:" component="textarea" cols="40" rows="3" />
                <div className="d-flex flex-row">
                  <div className="form-inline">
                    <InputFormGroup
                      name="identification"
                      label="Identificação:"
                      maxLength="255"
                      className="m-1"
                      classNameDiv="mx-1"
                      validate={required}
                    />
                    <SelectFormGroup
                      name="survey_event_type"
                      label="Tipo:"
                      className="m-1"
                      classNameDiv="mx-1"
                      validate={required}
                    >
                      <option value="">---------</option>
                      {survey_event_types.map((survey_event_type, index) => (
                        <option key={survey_event_type.id} value={survey_event_type.id}>
                          {survey_event_type.order} - {survey_event_type.name}
                        </option>
                      ))}
                    </SelectFormGroup>
                    <CheckboxFormGroup
                      name="concluded"
                      label="Concluído"
                      id="survey_concluded"
                      className="m-1"
                      classNameDiv="mx-1"
                    />
                  </div>
                </div>
              </ToogleFieldSet>
            </div>
          </div>
          <CommonModalFooter
            isDisabled={!hasOwnerPermission}
            canDelete={survey !== undefined ? (survey.id !== 0 ? true : false) : false}
            canCopy={survey !== undefined ? (survey.id !== 0 ? true : false) : false}
            onDelete={onDelete}
            form={form}
          />
        </form>
      )}
    />
  );
};

export default FormSurvey;
