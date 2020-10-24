import React from "react";
import { Field } from "react-final-form";

export const required = (value) => (value ? undefined : "Campo obrigatório");

export const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? (
        <div className="invalid-feedback d-block">{error}</div>
      ) : null
    }
  </Field>
);

export const InputFormGroup = (props) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
  }
  return (
    <div className="form-group mb-0">
      <label htmlFor={"id_" + props.name} className="mb-0">
        {props.label}
      </label>
      <Field
        component="input"
        type="text"
        {...props}
        className={className}
        id={"id_" + props.name}
        name={props.name}
      />
      <Error name={props.name} />
    </div>
  );
};

export const CheckboxFormGroup = (props) => {
  let className = "custom-control-input";
  if (props.className !== undefined) {
    className += " " + props.className;
  }
  return (
    <div className="custom-control custom-checkbox" title={props.tooltip}>
      <Field
        component="input"
        type="checkbox"
        {...props}
        id={"id_" + props.name}
        name={props.name}
        className={className}
      />
      <label className="custom-control-label" htmlFor={"id_" + props.name}>
        {props.label}
      </label>
      <Error name={props.name} />
    </div>
  );
};

export const SelectFormGroup = (props) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
  }
  return (
    <div className="form-group mb-0">
      <label htmlFor={"id_" + props.name} className="mb-0">
        {props.label}
      </label>
      <Field
        component="select"
        {...props}
        className={className}
        id={"id_" + props.name}
        name={props.name}
      />
      <Error name={props.name} />
    </div>
  );
};
