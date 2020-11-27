import React from "react";
import { Field } from "react-final-form";

export const required = (value) => (value ? undefined : "Campo obrigatório");

export const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? (
        <div className="invalid-feedback d-block">{error.toString()}</div>
      ) : null
    }
  </Field>
);

export const InputFormGroup = ({ isHidden = false, ...props }) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
    delete props.className;
  }
  let classNameDiv = "form-group mb-0";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }
  return (
    <div className={isHidden ? "d-none" : classNameDiv}>
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

export const CheckboxFormGroup = ({ isHidden = false, ...props }) => {
  let className = "custom-control-input";
  if (props.className !== undefined) {
    className += " " + props.className;
    delete props.className;
  }
  let classNameDiv = "custom-control custom-checkbox";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }
  return (
    <div className={isHidden ? "d-none" : classNameDiv} title={props.tooltip}>
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

export const SelectFormGroup = ({ isHidden = false, ...props }) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
  }
  let classNameDiv = "form-group mb-0";
  if (props.classNameDiv !== undefined) {
    classNameDiv += " " + props.classNameDiv;
    delete props.classNameDiv;
  }
  return (
    <div className={isHidden ? "d-none" : classNameDiv}>
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

export const ComboboxFormGroup = ({ isHidden = false, ...props }) => {
  let className = "form-control form-control-sm";
  if (props.className !== undefined) {
    className += " " + props.className;
  }
  const { children, ...childprops } = props;
  return (
    <div className={props.isHidden ? "d-none" : "form-group mb-0"}>
      <label htmlFor={"id_" + props.name} className="mb-0">
        {props.label}
      </label>
      <Field
        component="input"
        type="text"
        {...childprops}
        className={className}
        id={"id_" + props.name}
        name={props.name}
        list={"id_" + props.name + "_list"}
      />
      <datalist id={"id_" + props.name + "_list"}>{children}</datalist>
      <Error name={props.name} />
    </div>
  );
};

export const ToogleFieldSet = ({ isDisabled = false, ...props }) => {
  if (isDisabled) {
    return <fieldset disabled>{props.children}</fieldset>;
  } else {
    return <fieldset>{props.children}</fieldset>;
  }
};
