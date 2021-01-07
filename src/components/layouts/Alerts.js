import React, { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Alerts = (prevProps, props) => {
  const { errors, messages } = useSelector((state) => state);
  const prevErrors = usePrevious(errors);
  const prevMessages = usePrevious(messages);
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    if (errors !== prevErrors) {
      if (errors.msg.username)
        alert.error(`Usuário: ${errors.msg.username.join()}`);
      if (errors.msg.password)
        alert.error(`Senha: ${errors.msg.password.join()}`);
      if (errors.msg.non_field_errors) {
        alert.error(errors.msg.non_field_errors.join());
      }
      if (errors.msg.detail) {
        alert.error(errors.msg.detail);
      }
      if (errors.msg.undefined_error) {
        alert.error(errors.msg.undefined_error.join());
      }
      if (errors.status >= 300) {
        if (!errors.msg) {
          alert.error(errors.status);
        }
      }
    }
    if (messages !== prevMessages) {
      if (messages.CRUDcreate) alert.success(messages.CRUDcreate);
      if (messages.CRUDread) alert.success(messages.CRUDread);
      if (messages.CRUDupdate) alert.success(messages.CRUDupdate);
      if (messages.CRUDdelete) alert.success(messages.CRUDdelete);
      if (messages.ERROR) alert.error(messages.ERROR);
      if (messages.INFO) alert.info(messages.INFO);
      if (messages.SUCCESS) alert.success(messages.SUCCESS);
    }
  }, [errors, prevErrors, messages, prevMessages, alert, history]);

  return <Fragment />;
};

export default Alerts;
