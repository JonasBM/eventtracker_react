import React from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-final-form";
import { FileField } from "../common/Forms";
import {
  downloadFileVARequestDocx,
  uploadFileVARequestDocx,
  downloadFileRFRequestDocx,
  uploadFileRFRequestDocx,
} from "../../actions/actionFiles.js";

const FormVAPadrao = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(uploadFileVARequestDocx(values));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form
          onSubmit={async (event) => {
            await handleSubmit(event);
            form.reset();
          }}
          className="needs-validation"
          noValidate
        >
          <div className="container">
            <div className="row">
              <span>
                Pedido de <strong>VA</strong> (documento padrão):
              </span>
            </div>
            <div className="row mb-1">
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={() => dispatch(downloadFileVARequestDocx())}
              >
                Baixar arquivo atual
              </button>
            </div>
            <div className="row mb-1">
              <FileField
                name="va_padrao"
                id="va_padrao"
                label="Escolha um arquivo"
              />
            </div>
            <div className="row">
              <button
                className="btn btn-primary btn-sm"
                type="submit"
                disabled={submitting || pristine}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};

const FormRFPadrao = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(uploadFileRFRequestDocx(values));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form
          onSubmit={async (event) => {
            await handleSubmit(event);
            form.reset();
          }}
          className="needs-validation"
          noValidate
        >
          <div className="container">
            <div className="row">
              <span>
                Pedido de <strong>RF</strong> (documento padrão):
              </span>
            </div>
            <div className="row mb-1">
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={() => dispatch(downloadFileRFRequestDocx())}
              >
                Baixar arquivo atual
              </button>
            </div>
            <div className="row mb-1">
              <FileField
                name="rf_padrao"
                id="rf_padrao"
                label="Escolha um arquivo"
              />
            </div>
            <div className="row">
              <button
                className="btn btn-primary btn-sm"
                type="submit"
                disabled={submitting || pristine}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default function FormDocument() {
  return (
    <div className="container-fluid">
      <div className="row no-gutters row-cols-1 row-cols-lg-3 justify-content-md-center">
        <div className="col col-12 col-lg-5 mx-2">
          <FormRFPadrao />
        </div>
        <div className="col col-12 col-lg-5 mx-2">
          <FormVAPadrao />
        </div>
      </div>
    </div>
  );
}
