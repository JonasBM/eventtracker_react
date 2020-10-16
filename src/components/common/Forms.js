import React from "react";
import { Field } from "react-final-form";

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
    </div>
  );
};

export const CheckboxFormGroup = (props) => {
  let className = "custom-control-input";
  if (props.className !== undefined) {
    className += " " + props.className;
  }
  return (
    <div className="custom-control custom-checkbox">
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
    </div>
  );
};
